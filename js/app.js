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
    quiz: document.getElementById("screen-quiz"),
    result: document.getElementById("screen-result"),
  };
  const el = {
    categoryList: document.getElementById("category-list"),
    progressLabel: document.getElementById("quiz-progress-label"),
    progressFill: document.getElementById("progress-fill"),
    timer: document.getElementById("quiz-timer"),
    questionText: document.getElementById("question-text"),
    questionCode: document.getElementById("question-code"),
    choices: document.getElementById("choices"),
    feedback: document.getElementById("feedback"),
    feedbackResult: document.getElementById("feedback-result"),
    feedbackExplanation: document.getElementById("feedback-explanation"),
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
      btn.addEventListener("click", () => startQuiz(cat.id));
      el.categoryList.appendChild(btn);
    });
    showScreen("home");
  }

  // ---------------------------------------------
  // クイズ進行
  // ---------------------------------------------
  function startQuiz(categoryId) {
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
      el.reviewList.appendChild(item);
    });

    showScreen("result");
  }

  function quit() {
    if (session.answers.length === 0 || confirm("途中でやめてカテゴリ選択に戻りますか?")) {
      stopTimer();
      session = null;
      renderHome();
    }
  }

  // ---------------------------------------------
  // イベント登録・初期化
  // ---------------------------------------------
  el.btnNext.addEventListener("click", next);
  el.btnQuit.addEventListener("click", quit);
  el.btnRetry.addEventListener("click", () => startQuiz(session.categoryId));
  el.btnHome.addEventListener("click", renderHome);
  el.appTitle.addEventListener("click", () => {
    if (screens.home.classList.contains("hidden") && session === null) renderHome();
  });

  renderHome();
})();
