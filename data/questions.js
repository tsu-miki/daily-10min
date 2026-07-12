// =====================================================
// 問題データ
// 各カテゴリの問題プールから毎回ランダムに10問出題される
// =====================================================
const QUIZ_DATA = {
  categories: [
    {
      id: "design-patterns",
      name: "デザインパターン",
      icon: "🧩",
      description: "GoFデザインパターンの目的や使いどころを問う問題",
    },
    {
      id: "solid",
      name: "SOLID原則",
      icon: "🏛️",
      description: "オブジェクト指向設計5原則の理解を問う問題",
    },
  ],

  questions: {
    // ---------------------------------------------
    // デザインパターン
    // ---------------------------------------------
    "design-patterns": [
      {
        id: "dp-01",
        question: "Singletonパターンの主な目的として最も適切なものはどれ?",
        choices: [
          "クラスのインスタンスが1つだけであることを保証し、グローバルなアクセス手段を提供する",
          "オブジェクトの生成処理をサブクラスに委ねる",
          "複数のオブジェクトを効率よく複製する",
          "インスタンスの状態変化を他のオブジェクトに通知する",
        ],
        answerIndex: 0,
        explanation:
          "Singletonはインスタンスを1つに限定するパターンです。ただしグローバル状態を作りやすく、テストが難しくなる副作用もあるため乱用は禁物です。",
      },
      {
        id: "dp-02",
        question:
          "既存クラスのインターフェースが、利用したい側が期待するインターフェースと合わない。両者の橋渡しをするパターンはどれ?",
        choices: ["Adapter", "Decorator", "Facade", "Bridge"],
        answerIndex: 0,
        explanation:
          "Adapterは互換性のないインターフェース同士を変換して接続するパターンです。「電源プラグの変換アダプタ」のイメージで覚えると分かりやすいです。",
      },
      {
        id: "dp-03",
        question:
          "「あるオブジェクトの状態が変化したら、それに依存する複数のオブジェクトへ自動的に通知したい」。適切なパターンはどれ?",
        choices: ["Observer", "Mediator", "Command", "Memento"],
        answerIndex: 0,
        explanation:
          "Observerは1対多の依存関係を定義し、状態変化を購読者(Observer)へ通知するパターンです。イベントリスナーやPub/Subの基礎になっています。",
      },
      {
        id: "dp-04",
        question:
          "アルゴリズム(例: ソート方法、料金計算方法)を実行時に切り替えられるようにカプセル化するパターンはどれ?",
        choices: ["Strategy", "Template Method", "State", "Visitor"],
        answerIndex: 0,
        explanation:
          "Strategyはアルゴリズム群をそれぞれクラスとしてカプセル化し、交換可能にします。if/switchの分岐をポリモーフィズムに置き換える代表的な手段です。",
      },
      {
        id: "dp-05",
        question:
          "処理の大きな流れ(骨組み)は親クラスで定義し、個々のステップの具体的な実装はサブクラスに任せるパターンはどれ?",
        choices: ["Template Method", "Strategy", "Factory Method", "Builder"],
        answerIndex: 0,
        explanation:
          "Template Methodは処理の枠組みを親クラスのメソッドで固定し、可変部分だけを抽象メソッドとしてサブクラスにオーバーライドさせるパターンです。",
      },
      {
        id: "dp-06",
        question:
          "既存オブジェクトに対して、継承を使わずに機能を動的に追加していけるパターンはどれ?",
        choices: ["Decorator", "Adapter", "Proxy", "Composite"],
        answerIndex: 0,
        explanation:
          "Decoratorは同じインターフェースを持つラッパーで包むことで機能を積み重ねます。Java の BufferedInputStream などが典型例です。",
      },
      {
        id: "dp-07",
        question:
          "複雑なサブシステム群に対して、シンプルな窓口となるインターフェースを1つ用意するパターンはどれ?",
        choices: ["Facade", "Mediator", "Adapter", "Abstract Factory"],
        answerIndex: 0,
        explanation:
          "Facade(ファサード=建物の正面)は、内部の複雑さを隠して簡潔なAPIを提供するパターンです。利用側はサブシステムの詳細を知らずに済みます。",
      },
      {
        id: "dp-08",
        question:
          "次のコードが表しているデザインパターンはどれ?",
        code:
`class Logger {
  static #instance = null;
  static getInstance() {
    if (Logger.#instance === null) {
      Logger.#instance = new Logger();
    }
    return Logger.#instance;
  }
}`,
        choices: ["Singleton", "Factory Method", "Prototype", "Flyweight"],
        answerIndex: 0,
        explanation:
          "インスタンスを静的フィールドに1つだけ保持し、getInstance()経由でのみ取得させる典型的なSingletonの実装(遅延初期化)です。",
      },
      {
        id: "dp-09",
        question:
          "「操作(リクエスト)そのものをオブジェクトとして表現する」ことで、取り消し(Undo)や履歴管理、キューイングを可能にするパターンはどれ?",
        choices: ["Command", "Strategy", "Observer", "Chain of Responsibility"],
        answerIndex: 0,
        explanation:
          "Commandは操作をオブジェクト化するパターンです。実行(execute)と取り消し(undo)をメソッドとして持たせることで、エディタのUndo/Redoなどが実現できます。",
      },
      {
        id: "dp-10",
        question:
          "個々の部品(Leaf)と部品の集まり(Composite)を同じインターフェースで扱い、木構造を表現するパターンはどれ?",
        choices: ["Composite", "Decorator", "Iterator", "Bridge"],
        answerIndex: 0,
        explanation:
          "Compositeはファイルとフォルダのような「個」と「集合」を同一視して再帰的な木構造を扱うパターンです。利用側は両者を区別せずに操作できます。",
      },
      {
        id: "dp-11",
        question:
          "Factory Methodパターンの説明として最も適切なものはどれ?",
        choices: [
          "オブジェクト生成のためのインターフェースを定義し、どのクラスをインスタンス化するかはサブクラスに決めさせる",
          "関連するオブジェクト群をまとめて生成するインターフェースを提供する",
          "既存のインスタンスをコピーして新しいオブジェクトを作る",
          "複雑なオブジェクトの組み立て手順と表現を分離する",
        ],
        answerIndex: 0,
        explanation:
          "Factory Methodは「何を作るか」の決定をサブクラスに委ねるパターンです。選択肢2はAbstract Factory、3はPrototype、4はBuilderの説明です。",
      },
      {
        id: "dp-12",
        question:
          "多数の引数を持つ複雑なオブジェクトを、手順を追って段階的に組み立てられるようにするパターンはどれ?",
        choices: ["Builder", "Abstract Factory", "Prototype", "Singleton"],
        answerIndex: 0,
        explanation:
          "Builderは生成手順と表現を分離し、メソッドチェーンなどで段階的にオブジェクトを構築します。引数が多いコンストラクタ(telescoping constructor)の解消にも有効です。",
      },
      {
        id: "dp-13",
        question:
          "本物のオブジェクトへのアクセスを代理オブジェクトが仲介し、遅延初期化やアクセス制御、キャッシュなどを差し込むパターンはどれ?",
        choices: ["Proxy", "Decorator", "Adapter", "Facade"],
        answerIndex: 0,
        explanation:
          "Proxyは本体と同じインターフェースを持つ「代理人」を立てるパターンです。Decoratorと構造は似ていますが、目的が「機能追加」ではなく「アクセスの制御・仲介」である点が異なります。",
      },
      {
        id: "dp-14",
        question:
          "リクエストを処理できるオブジェクトが見つかるまで、複数のハンドラを鎖のように順番にたどっていくパターンはどれ?",
        choices: ["Chain of Responsibility", "Command", "Mediator", "Iterator"],
        answerIndex: 0,
        explanation:
          "Chain of Responsibilityは「たらい回し」のパターンです。送信者は誰が処理するかを知る必要がなく、Webフレームワークのミドルウェアなどに使われています。",
      },
      {
        id: "dp-15",
        question:
          "次のコードのように、支払い方法の分岐をオブジェクトの差し替えで表現する設計が使っているパターンはどれ?",
        code:
`interface PaymentStrategy {
  pay(amount: number): void;
}
class CreditCard implements PaymentStrategy { /* ... */ }
class PayPay implements PaymentStrategy { /* ... */ }

class Checkout {
  constructor(private strategy: PaymentStrategy) {}
  run(amount: number) { this.strategy.pay(amount); }
}`,
        choices: ["Strategy", "State", "Template Method", "Bridge"],
        answerIndex: 0,
        explanation:
          "アルゴリズム(支払い処理)を共通インターフェースの実装として差し替え可能にしているのでStrategyです。Stateと構造は似ていますが、Stateは「状態遷移に応じて振る舞いが自動的に変わる」点が特徴です。",
      },
      {
        id: "dp-16",
        question:
          "Abstract FactoryとFactory Methodの違いの説明として最も適切なものはどれ?",
        choices: [
          "Abstract Factoryは関連する複数種類のオブジェクト群をまとめて生成し、Factory Methodは1種類の生成をサブクラスに委ねる",
          "Abstract Factoryはインスタンスを1つに限定し、Factory Methodは複数生成できる",
          "Factory Methodはオブジェクトのコピーで生成し、Abstract Factoryはnewで生成する",
          "両者に違いはなく、名前が異なるだけである",
        ],
        answerIndex: 0,
        explanation:
          "Abstract Factoryは「部品ファミリーごと」の生成(例: Windows用/Mac用のUI部品一式)、Factory Methodは「1つの生成メソッド」をサブクラスでオーバーライドする違いがあります。",
      },
    ],

    // ---------------------------------------------
    // SOLID原則
    // ---------------------------------------------
    "solid": [
      {
        id: "so-01",
        question: "SOLID原則の「S」= 単一責任の原則(SRP)の説明として最も適切なものはどれ?",
        choices: [
          "クラスを変更する理由は1つだけであるべき",
          "クラスは1つのメソッドだけを持つべき",
          "クラスは1つのインスタンスだけを持つべき",
          "クラスは1つのクラスからのみ継承すべき",
        ],
        answerIndex: 0,
        explanation:
          "SRP(Single Responsibility Principle)は「変更理由が1つ」= 責務が1つであるべきという原則です。メソッド数やインスタンス数の話ではありません。",
      },
      {
        id: "so-02",
        question:
          "次のクラスが違反している原則はどれ?",
        code:
`class Report {
  calculateTotals() { /* 集計ロジック */ }
  formatAsHtml() { /* HTML整形 */ }
  saveToDatabase() { /* DB保存 */ }
  sendByEmail() { /* メール送信 */ }
}`,
        choices: [
          "単一責任の原則(SRP)",
          "リスコフの置換原則(LSP)",
          "インターフェース分離の原則(ISP)",
          "依存性逆転の原則(DIP)",
        ],
        answerIndex: 0,
        explanation:
          "集計・整形・永続化・通知という複数の責務が1クラスに同居しており、変更理由が複数あるためSRP違反です。それぞれ別のクラスに分割すべきです。",
      },
      {
        id: "so-03",
        question:
          "オープン・クローズドの原則(OCP)の「拡張に対して開いていて、修正に対して閉じている」の意味として最も適切なものはどれ?",
        choices: [
          "既存コードを変更せずに、新しい振る舞いを追加できる設計にする",
          "publicメソッドを増やし、privateメソッドを減らす",
          "クラスは自由に修正してよいが、削除してはいけない",
          "継承は自由だが、インターフェースの実装は制限する",
        ],
        answerIndex: 0,
        explanation:
          "OCPは新機能を「既存コードの修正」ではなく「新しいコードの追加」で実現できるようにする原則です。抽象化(インターフェース+ポリモーフィズム)がその主な手段です。",
      },
      {
        id: "so-04",
        question:
          "図形の種類ごとにswitch文で分岐して面積を計算するコードがあり、新しい図形を追加するたびにこの関数を修正している。OCPに沿った改善策として最も適切なものはどれ?",
        code:
`function area(shape) {
  switch (shape.type) {
    case "circle": return Math.PI * shape.r ** 2;
    case "rect":   return shape.w * shape.h;
    // 図形が増えるたびにcaseを追加...
  }
}`,
        choices: [
          "Shapeインターフェースにarea()を定義し、各図形クラスが自分の面積計算を実装する",
          "switch文をif-else文に書き換える",
          "図形の種類を定数クラスにまとめて管理する",
          "area関数をユーティリティクラスの静的メソッドに移動する",
        ],
        answerIndex: 0,
        explanation:
          "ポリモーフィズムを使えば、新しい図形は「新クラスの追加」だけで対応でき、既存コードの修正が不要になります。これがOCPに沿った典型的なリファクタリングです。",
      },
      {
        id: "so-05",
        question:
          "リスコフの置換原則(LSP)の説明として最も適切なものはどれ?",
        choices: [
          "派生型は、その基底型と置き換えてもプログラムの正しさを損なわないようにすべき",
          "サブクラスは親クラスのすべてのメソッドをオーバーライドすべき",
          "クラスの継承階層は3階層以内に収めるべき",
          "基底クラスは必ず抽象クラスにすべき",
        ],
        answerIndex: 0,
        explanation:
          "LSPは「親クラスを使っている場所に子クラスを渡しても、期待される振る舞いが壊れない」ことを求める原則です。継承の正しい使い方の指針になります。",
      },
      {
        id: "so-06",
        question:
          "正方形(Square)を長方形(Rectangle)のサブクラスにすると問題になる、という有名な例が示している原則違反はどれ?",
        code:
`const r: Rectangle = new Square();
r.setWidth(4);
r.setHeight(5);
// 長方形なら面積20のはずだが、
// Squareは幅と高さが連動するため25になる`,
        choices: [
          "リスコフの置換原則(LSP)",
          "単一責任の原則(SRP)",
          "依存性逆転の原則(DIP)",
          "オープン・クローズドの原則(OCP)",
        ],
        answerIndex: 0,
        explanation:
          "Rectangleとして使ったときの期待(幅と高さを独立に設定できる)をSquareが破ってしまうため、置換すると正しさが壊れます。「is-aに見えても振る舞いの契約を守れなければ継承すべきでない」という教訓です。",
      },
      {
        id: "so-07",
        question:
          "インターフェース分離の原則(ISP)の説明として最も適切なものはどれ?",
        choices: [
          "クライアントに、利用しないメソッドへの依存を強制してはならない",
          "インターフェースと実装クラスは別ファイルに分けるべき",
          "1つのクラスが実装するインターフェースは1つに限るべき",
          "インターフェースにはメソッドを1つだけ定義すべき",
        ],
        answerIndex: 0,
        explanation:
          "ISPは「太った(fat)インターフェース」を避け、クライアントごとに必要最小限のインターフェースへ分割する原則です。ファイル分割やメソッド数の話ではありません。",
      },
      {
        id: "so-08",
        question:
          "次のコードが抱える問題に最も関係が深い原則はどれ?",
        code:
`interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}
// ロボットは食事も睡眠も不要なのに
// 実装を強制され、例外を投げている
class Robot implements Worker {
  work() { /* OK */ }
  eat() { throw new Error("not supported"); }
  sleep() { throw new Error("not supported"); }
}`,
        choices: [
          "インターフェース分離の原則(ISP)",
          "単一責任の原則(SRP)",
          "オープン・クローズドの原則(OCP)",
          "依存性逆転の原則(DIP)",
        ],
        answerIndex: 0,
        explanation:
          "Robotが使わないメソッド(eat/sleep)の実装を強制されているのはISP違反の典型です。Workable / Eatable のようにインターフェースを分割して解決します。なお「実装できずに例外を投げる」点はLSP違反にもつながります。",
      },
      {
        id: "so-09",
        question:
          "依存性逆転の原則(DIP)の説明として最も適切なものはどれ?",
        choices: [
          "上位モジュールも下位モジュールも、具象ではなく抽象に依存すべき",
          "依存関係は必ずDIコンテナで管理すべき",
          "下位モジュールが上位モジュールを呼び出すように設計すべき",
          "循環依存は2つまでなら許容される",
        ],
        answerIndex: 0,
        explanation:
          "DIPの核心は「抽象への依存」です。DI(依存性注入)やDIコンテナはDIPを実現する手段の1つであって、原則そのものではありません。",
      },
      {
        id: "so-10",
        question:
          "次のコードをDIPに沿って改善する方法として最も適切なものはどれ?",
        code:
`class OrderService {
  private repo = new MySqlOrderRepository(); // 具象クラスを直接生成
  save(order: Order) { this.repo.insert(order); }
}`,
        choices: [
          "OrderRepositoryインターフェースを定義し、コンストラクタで実装を注入する",
          "MySqlOrderRepositoryをSingletonにして共有する",
          "OrderServiceがMySqlOrderRepositoryを継承する",
          "repoフィールドをpublicにして外部から直接触れるようにする",
        ],
        answerIndex: 0,
        explanation:
          "抽象(インターフェース)を定義して外から実装を注入すれば、OrderServiceはDBの種類を知らずに済み、テスト時もモックに差し替えられます。これがDIP+DI(依存性注入)の基本形です。",
      },
      {
        id: "so-11",
        question:
          "親クラスのメソッドをサブクラスでオーバーライドし、中身を「throw new NotImplementedException()」にした。この設計が主に違反している原則はどれ?",
        choices: [
          "リスコフの置換原則(LSP)",
          "オープン・クローズドの原則(OCP)",
          "単一責任の原則(SRP)",
          "依存性逆転の原則(DIP)",
        ],
        answerIndex: 0,
        explanation:
          "親クラスとして扱ったときに動くはずのメソッドが例外を投げるのは、基底型の契約を破る典型的なLSP違反です。継承関係そのものを見直すサインです。",
      },
      {
        id: "so-12",
        question: "SOLID原則を守ることで得られる主な効果として最も適切なものはどれ?",
        choices: [
          "変更に強く、テストしやすく、理解しやすい設計になる",
          "プログラムの実行速度が大幅に向上する",
          "コード行数が必ず半分以下になる",
          "バグが原理的に発生しなくなる",
        ],
        answerIndex: 0,
        explanation:
          "SOLIDは保守性・拡張性・テスト容易性のための原則です。性能改善やバグの根絶を保証するものではなく、むしろ小規模なコードでは抽象化がやり過ぎになる場合もあります。",
      },
      {
        id: "so-13",
        question:
          "「通知方法(メール/Slack/SMS)が増えるたびにNotificationServiceのif文を修正している」。この問題の解決に最も直接的に関係する原則の組み合わせはどれ?",
        choices: [
          "OCPとDIP(通知インターフェースを定義し、実装を追加・注入する)",
          "SRPとLSP(クラスを分割し、継承階層を深くする)",
          "ISPとSRP(インターフェースを細かく分割する)",
          "LSPとDIP(サブクラスをすべて削除する)",
        ],
        answerIndex: 0,
        explanation:
          "Notifierインターフェースへの依存(DIP)に変えれば、新しい通知方法は実装クラスの追加だけで済み、既存コードを修正せずに拡張できます(OCP)。両原則は組み合わせて働くことが多いです。",
      },
      {
        id: "so-14",
        question:
          "単一責任の原則(SRP)における「責任(責務)」の単位として、提唱者Robert C. Martinの説明に最も近いものはどれ?",
        choices: [
          "変更を要求してくるアクター(利害関係者・役割)ごとのまとまり",
          "メソッド1つひとつ",
          "ソースファイル1つひとつ",
          "データベースのテーブル1つひとつ",
        ],
        answerIndex: 0,
        explanation:
          "Martinは後年、SRPを「モジュールはただ1つのアクターに対して責務を負うべき」と説明しています。経理部門の要求と人事部門の要求が同じクラスに影響するなら、分割を検討すべきというサインです。",
      },
      {
        id: "so-15",
        question:
          "レイヤードアーキテクチャで「ビジネスロジック層がインターフェースを定義し、インフラ層(DB実装)がそれを実装する」構成にする狙いとして最も適切なものはどれ?",
        choices: [
          "依存の向きを逆転させ、重要なビジネスロジックをDBなどの詳細から独立させる(DIP)",
          "インフラ層のコード量を削減する(SRP)",
          "ビジネスロジック層のインスタンスを1つに限定する",
          "インターフェースの数を減らして設計を単純化する(ISP)",
        ],
        answerIndex: 0,
        explanation:
          "本来「上位→下位」だった依存を、抽象の所有権を上位層に置くことで逆転させるのがDIPの実践です。クリーンアーキテクチャやヘキサゴナルアーキテクチャの土台になっています。",
      },
      {
        id: "so-16",
        question:
          "次のうち、SOLID原則の頭文字と原則名の組み合わせが正しいものはどれ?",
        choices: [
          "L = リスコフの置換原則(Liskov Substitution Principle)",
          "S = 安定依存の原則(Stable Dependencies Principle)",
          "I = 実装分離の原則(Implementation Separation Principle)",
          "D = 分割統治の原則(Divide and Conquer Principle)",
        ],
        answerIndex: 0,
        explanation:
          "SOLIDは S=単一責任(SRP)、O=オープン・クローズド(OCP)、L=リスコフの置換(LSP)、I=インターフェース分離(ISP)、D=依存性逆転(DIP)の5原則です。",
      },
    ],
  },
};
