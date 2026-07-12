// =====================================================
// Daily 10min Quiz — アプリ本体
// =====================================================
(() => {
  "use strict";

  const QUESTIONS_PER_SESSION = 10; // 1問あたり約1分 × 10問 = 約10分
  const TARGET_SECONDS = 10 * 60;

  // ---- 画面要素 ----
  const screens = {
    home: document.getElementById("screen-home"),
    mode: document.getElementById("screen-mode"),
    learn: document.getElementById("screen-learn"),
    quiz: document.getElementById("screen-quiz"),
    result: document.getElementById("screen-result"),
  };
  const el = {
    categoryList: document.getElementById("category-list"),
    modeCategoryName: document.getElementById("mode-category-name"),
    modeQuizMeta: document.getElementById("mode-quiz-meta"),
    modeLearnMeta: document.getElementById("mode-learn-meta"),
    btnModeBack: document.getElementById("btn-mode-back"),
    btnModeQuiz: document.getElementById("btn-mode-quiz"),
    btnModeLearn: document.getElementById("btn-mode-learn"),
    learnTitle: document.getElementById("learn-title"),
    learnIntro: document.getElementById("learn-intro"),
    learnContent: document.getElementById("learn-content"),
    btnLearnBack: document.getElementById("btn-learn-back"),
    btnLearnQuiz: document.getElementById("btn-learn-quiz"),
    progressLabel: document.getElementById("quiz-progress-label"),
    progressFill: document.getElementById("progress-fill"),
    timer: document.getElementById("quiz-timer"),
    questionText: document.getElementById("question-text"),
    questionCode: document.getElementById("question-code"),
    choices: document.getElementById("choices"),
    feedback: document.getElementById("feedback"),
    feedbackResult: document.getElementById("feedback-result"),
    feedbackExplanation: document.getElementById("feedback-explanation"),
    feedbackDetails: document.getElementById("feedback-details"),
    btnNext: document.getElementById("btn-next"),
    btnQuit: document.getElementById("btn-quit"),
    resultEmoji: document.getElementById("result-emoji"),
    resultScore: document.getElementById("result-score"),
    resultDetail: document.getElementById("result-detail"),
    reviewList: document.getElementById("review-list"),
    btnRetry: document.getElementById("btn-retry"),
    btnHome: document.getElementById("btn-home"),
    appTitle: document.getElementById("app-title"),
  };

  // ---- セッション状態 ----
  let session = null;
  let timerId = null;
  let currentCategoryId = null;

  function shuffle(array) {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function showScreen(name) {
    Object.entries(screens).forEach(([key, node]) => {
      node.classList.toggle("hidden", key !== name);
    });
    window.scrollTo(0, 0);
  }

  // ---------------------------------------------
  // カテゴリ選択画面
  // ---------------------------------------------
  function renderHome() {
    el.categoryList.innerHTML = "";
    QUIZ_DATA.categories.forEach((cat) => {
      const pool = QUIZ_DATA.questions[cat.id] || [];
      const count = Math.min(QUESTIONS_PER_SESSION, pool.length);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "category-card";
      btn.innerHTML = `
        <span class="cat-icon">${cat.icon}</span><span class="cat-name">${cat.name}</span>
        <p class="cat-desc">${cat.description}</p>
        <span class="cat-meta">全${count}問・約10分</span>
      `;
      btn.addEventListener("click", () => renderModeSelect(cat.id));
      el.categoryList.appendChild(btn);
    });
    showScreen("home");
  }

  // ---------------------------------------------
  // モード選択画面(クイズ or 概要)
  // ---------------------------------------------
  function renderModeSelect(categoryId) {
    currentCategoryId = categoryId;
    const cat = QUIZ_DATA.categories.find((c) => c.id === categoryId);
    const pool = QUIZ_DATA.questions[categoryId] || [];
    const conceptCount = (QUIZ_CONCEPT_GROUPS[categoryId]?.groups || [])
      .reduce((sum, g) => sum + g.concepts.length, 0);

    el.modeCategoryName.textContent = `${cat.icon} ${cat.name}`;
    el.modeQuizMeta.textContent =
      `全${Math.min(QUESTIONS_PER_SESSION, pool.length)}問・約10分`;
    el.modeLearnMeta.textContent = `全${conceptCount}項目`;
    showScreen("mode");
  }

  // ---------------------------------------------
  // 概要(学習)画面
  // ---------------------------------------------
  function renderLearn(categoryId) {
    currentCategoryId = categoryId;
    const cat = QUIZ_DATA.categories.find((c) => c.id === categoryId);
    const toc = QUIZ_CONCEPT_GROUPS[categoryId];

    el.learnTitle.textContent = `${cat.icon} ${cat.name}の概要`;
    el.learnIntro.textContent = toc?.intro ?? "";
    el.learnContent.innerHTML = "";

    (toc?.groups || []).forEach((group) => {
      const heading = document.createElement("h2");
      heading.className = "learn-group-title";
      heading.textContent = group.name;
      el.learnContent.appendChild(heading);

      if (group.description) {
        const desc = document.createElement("p");
        desc.className = "learn-group-desc";
        desc.textContent = group.description;
        el.learnContent.appendChild(desc);
      }

      group.concepts.forEach((conceptId) => {
        const c = QUIZ_CONCEPTS[conceptId];
        if (!c) return;
        const details = document.createElement("details");
        details.className = "concept-details learn-item";
        const summary = document.createElement("summary");
        summary.textContent = c.title;
        details.appendChild(summary);
        details.appendChild(buildConceptBody(c));
        el.learnContent.appendChild(details);
      });
    });

    showScreen("learn");
  }

  // ---------------------------------------------
  // 詳しい解説(コンセプト解説)の描画
  // ---------------------------------------------
  function detailSection(heading, text) {
    const sec = document.createElement("div");
    sec.className = "detail-section";
    const h = document.createElement("h4");
    h.className = "detail-heading";
    h.textContent = heading;
    sec.appendChild(h);
    if (text) {
      const p = document.createElement("p");
      p.className = "detail-text";
      p.textContent = text;
      sec.appendChild(p);
    }
    return sec;
  }

  function detailCodeBlock(code) {
    const pre = document.createElement("pre");
    pre.className = "detail-code";
    const codeEl = document.createElement("code");
    codeEl.textContent = code;
    pre.appendChild(codeEl);
    return pre;
  }

  function buildLangTabs(examples) {
    const sec = detailSection("🌐 言語別の実装例", "");
    const tabBar = document.createElement("div");
    tabBar.className = "lang-tabs";
    const codeBlock = detailCodeBlock(examples[0].code);

    examples.forEach((ex, i) => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = `lang-tab${i === 0 ? " active" : ""}`;
      tab.textContent = ex.lang;
      tab.addEventListener("click", () => {
        tabBar.querySelectorAll(".lang-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        codeBlock.querySelector("code").textContent = ex.code;
      });
      tabBar.appendChild(tab);
    });

    sec.appendChild(tabBar);
    sec.appendChild(codeBlock);
    return sec;
  }

  function buildConceptBody(c) {
    const body = document.createElement("div");
    body.className = "concept-body";

    body.appendChild(detailSection(`💡 ${c.title}とは`, c.what));

    const applySec = detailSection("🛠 適用するとこうなる", c.apply.text);
    applySec.appendChild(detailCodeBlock(c.apply.code));
    body.appendChild(applySec);

    body.appendChild(detailSection("✨ 何が嬉しいのか", c.benefits));
    body.appendChild(buildLangTabs(c.langExamples));

    const domainSec = detailSection("🏢 経済情報ドメインでの例(企業と従業員)", c.domain.text);
    domainSec.appendChild(detailCodeBlock(c.domain.code));
    body.appendChild(domainSec);

    return body;
  }

  function buildConceptDetails(conceptId) {
    const c = QUIZ_CONCEPTS[conceptId];
    if (!c) return null;

    const details = document.createElement("details");
    details.className = "concept-details";

    const summary = document.createElement("summary");
    summary.textContent = `📖 詳しい解説:${c.title}`;
    details.appendChild(summary);
    details.appendChild(buildConceptBody(c));
    return details;
  }

  // ---------------------------------------------
  // クイズ進行
  // ---------------------------------------------
  function startQuiz(categoryId) {
    currentCategoryId = categoryId;
    const pool = QUIZ_DATA.questions[categoryId] || [];
    const picked = shuffle(pool).slice(0, QUESTIONS_PER_SESSION);

    // 選択肢の並びも毎回シャッフルする
    const questions = picked.map((q) => {
      const order = shuffle(q.choices.map((_, i) => i));
      return {
        ...q,
        shuffledChoices: order.map((i) => q.choices[i]),
        correctIndex: order.indexOf(q.answerIndex),
      };
    });

    session = {
      categoryId,
      questions,
      current: 0,
      answers: [], // { question, selectedIndex, correct }
      startedAt: Date.now(),
    };

    startTimer();
    renderQuestion();
    showScreen("quiz");
  }

  function startTimer() {
    stopTimer();
    updateTimer();
    timerId = setInterval(updateTimer, 1000);
  }

  function stopTimer() {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function elapsedSeconds() {
    return Math.floor((Date.now() - session.startedAt) / 1000);
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function updateTimer() {
    if (!session) return;
    const sec = elapsedSeconds();
    el.timer.textContent = formatTime(sec);
    el.timer.classList.toggle("over", sec > TARGET_SECONDS);
  }

  function renderQuestion() {
    const q = session.questions[session.current];
    const total = session.questions.length;

    el.progressLabel.textContent = `問 ${session.current + 1} / ${total}`;
    el.progressFill.style.width = `${(session.current / total) * 100}%`;

    el.questionText.textContent = q.question;
    if (q.code) {
      el.questionCode.querySelector("code").textContent = q.code;
      el.questionCode.classList.remove("hidden");
    } else {
      el.questionCode.classList.add("hidden");
    }

    el.choices.innerHTML = "";
    const markers = ["A", "B", "C", "D"];
    q.shuffledChoices.forEach((choice, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn";
      btn.dataset.index = String(i);
      btn.innerHTML = `<span class="choice-marker">${markers[i]}</span><span></span>`;
      btn.querySelector("span:last-child").textContent = choice;
      btn.addEventListener("click", () => answer(i));
      el.choices.appendChild(btn);
    });

    el.feedback.classList.add("hidden");
  }

  function answer(selectedIndex) {
    const q = session.questions[session.current];
    const correct = selectedIndex === q.correctIndex;

    session.answers.push({ question: q, selectedIndex, correct });

    // 選択肢をロックして正誤を色分け表示
    el.choices.querySelectorAll(".choice-btn").forEach((btn) => {
      const i = Number(btn.dataset.index);
      btn.disabled = true;
      if (i === q.correctIndex) btn.classList.add("correct");
      else if (i === selectedIndex) btn.classList.add("wrong");
    });

    el.feedbackResult.textContent = correct ? "⭕ 正解!" : "❌ 不正解…";
    el.feedbackResult.className = `feedback-result ${correct ? "ok" : "ng"}`;
    el.feedbackExplanation.textContent = q.explanation;

    el.feedbackDetails.innerHTML = "";
    const conceptDetails = buildConceptDetails(q.conceptId);
    if (conceptDetails) el.feedbackDetails.appendChild(conceptDetails);
    el.btnNext.textContent =
      session.current + 1 < session.questions.length ? "次の問題へ" : "結果を見る";
    el.feedback.classList.remove("hidden");
    el.feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function next() {
    if (session.current + 1 < session.questions.length) {
      session.current += 1;
      renderQuestion();
      window.scrollTo(0, 0);
    } else {
      finishQuiz();
    }
  }

  // ---------------------------------------------
  // 結果画面
  // ---------------------------------------------
  function finishQuiz() {
    stopTimer();
    const total = session.questions.length;
    const correctCount = session.answers.filter((a) => a.correct).length;
    const sec = elapsedSeconds();
    const rate = correctCount / total;

    el.resultEmoji.textContent =
      rate === 1 ? "🎉" : rate >= 0.8 ? "🌟" : rate >= 0.5 ? "👍" : "📚";
    el.resultScore.innerHTML = `${correctCount} <small>/ ${total} 問正解</small>`;

    const catName =
      QUIZ_DATA.categories.find((c) => c.id === session.categoryId)?.name ?? "";
    el.resultDetail.textContent = `${catName} ・ 所要時間 ${formatTime(sec)}`;

    el.reviewList.innerHTML = "";
    session.answers.forEach((a, i) => {
      const item = document.createElement("div");
      item.className = `review-item ${a.correct ? "" : "wrong"}`;
      const qEl = document.createElement("p");
      qEl.className = "review-q";
      qEl.textContent = `${a.correct ? "⭕" : "❌"} 問${i + 1}. ${a.question.question}`;
      const ansEl = document.createElement("p");
      ansEl.className = "review-a";
      ansEl.textContent = `正解: ${a.question.shuffledChoices[a.question.correctIndex]}`;
      item.append(qEl, ansEl);
      const conceptDetails = buildConceptDetails(a.question.conceptId);
      if (conceptDetails) item.appendChild(conceptDetails);
      el.reviewList.appendChild(item);
    });

    showScreen("result");
  }

  function quit() {
    if (session.answers.length === 0 || confirm("クイズを途中でやめますか?")) {
      stopTimer();
      session = null;
      renderModeSelect(currentCategoryId);
    }
  }

  // ---------------------------------------------
  // イベント登録・初期化
  // ---------------------------------------------
  el.btnModeBack.addEventListener("click", renderHome);
  el.btnModeQuiz.addEventListener("click", () => startQuiz(currentCategoryId));
  el.btnModeLearn.addEventListener("click", () => renderLearn(currentCategoryId));
  el.btnLearnBack.addEventListener("click", () => renderModeSelect(currentCategoryId));
  el.btnLearnQuiz.addEventListener("click", () => startQuiz(currentCategoryId));
  el.btnNext.addEventListener("click", next);
  el.btnQuit.addEventListener("click", quit);
  el.btnRetry.addEventListener("click", () => startQuiz(session.categoryId));
  el.btnHome.addEventListener("click", renderHome);
  el.appTitle.addEventListener("click", () => {
    if (screens.home.classList.contains("hidden") && session === null) renderHome();
  });

  renderHome();
})();
