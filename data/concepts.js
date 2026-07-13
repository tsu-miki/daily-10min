// =====================================================
// コンセプト別の詳しい解説データ
// 各問題の conceptId から参照される
// 構成: とは何か / 適用するとこうなる / 何が嬉しいのか /
//       言語別実装例(Rust, F#, Kotlin, TypeScript) /
//       経済情報ドメイン(企業・従業員)での実装例
// =====================================================
// 概要ページの目次: カテゴリごとに、どのコンセプトをどの順・
// どのグループで見せるかを定義する
const QUIZ_CONCEPT_GROUPS = {
  "oop": {
    intro:
      "オブジェクト指向プログラミング(OOP)の基礎を収録しています。まず全体像をつかみ、「4つの柱」と呼ばれる基本概念、そして実務で重要な設計指針の順で確認できます。SOLID原則やデザインパターンの土台になる内容です。",
    groups: [
      {
        name: "全体像",
        description: "オブジェクト指向とは何か、クラスとインスタンスの関係",
        concepts: ["oop-overview"],
      },
      {
        name: "4つの柱",
        description: "OOPを支える基本概念",
        concepts: ["encapsulation", "abstraction", "inheritance", "polymorphism"],
      },
      {
        name: "設計の指針",
        description: "継承と合成の使い分け",
        concepts: ["composition-over-inheritance"],
      },
    ],
  },
  "design-patterns": {
    intro:
      "GoF(Gang of Four)の23パターンのうち、実務で登場頻度の高い14パターンを収録しています。「生成」「構造」「振る舞い」の3分類ごとに、目的・コード例・使いどころを確認できます。",
    groups: [
      {
        name: "生成に関するパターン",
        description: "オブジェクトを「どう作るか」を柔軟にするパターン群",
        concepts: ["singleton", "factory-method", "abstract-factory", "builder"],
      },
      {
        name: "構造に関するパターン",
        description: "クラスやオブジェクトを「どう組み合わせるか」のパターン群",
        concepts: ["adapter", "decorator", "facade", "proxy", "composite"],
      },
      {
        name: "振る舞いに関するパターン",
        description: "オブジェクト間の「責任分担とやり取り」のパターン群",
        concepts: [
          "strategy",
          "template-method",
          "observer",
          "command",
          "chain-of-responsibility",
        ],
      },
    ],
  },
  "solid": {
    intro:
      "SOLIDは、変更に強く・テストしやすく・理解しやすいオブジェクト指向設計のための5原則です。まず全体像をつかんでから、各原則を順に確認するのがおすすめです。",
    groups: [
      {
        name: "全体像",
        description: "5原則のつながりと、守ることで得られる効果",
        concepts: ["solid-overview"],
      },
      {
        name: "5つの原則",
        description: "S・O・L・I・D それぞれの意味と実践方法",
        concepts: ["srp", "ocp", "lsp", "isp", "dip"],
      },
    ],
  },
  "clean-architecture": {
    intro:
      "クリーンアーキテクチャは、ビジネスルールをフレームワーク・DB・UIなどの「詳細」から独立させるためのアーキテクチャ指針です。同心円のレイヤー構成と、たった1つの絶対ルール「依存は内側へ」を軸に理解していきます。SOLID原則(特にDIP)が土台になっています。",
    groups: [
      {
        name: "全体像とルール",
        description: "同心円の構成と、唯一の絶対ルール",
        concepts: ["clean-arch-overview", "dependency-rule"],
      },
      {
        name: "内側のレイヤー",
        description: "アーキテクチャの主役となるビジネスルールの層",
        concepts: ["entities", "usecases"],
      },
      {
        name: "外側のレイヤー",
        description: "変換係と、交換可能な「詳細」",
        concepts: ["interface-adapters", "details-outside"],
      },
    ],
  },
  "vibe-coding": {
    intro:
      "バイブコーディングは、自然言語でAIに指示してコードを書かせる開発スタイルです。うまく使えば開発速度が劇的に上がる一方、検証・セキュリティ・責任といった新しい注意点もあります。「速く作る技術」と「安全に取り込む技術」をセットで学びます。",
    groups: [
      {
        name: "全体像",
        description: "バイブコーディングとは何か、どこで使うべきか",
        concepts: ["vibe-coding-overview"],
      },
      {
        name: "実践テクニック",
        description: "AIへの指示の出し方と、反復のリズム",
        concepts: ["prompting", "iteration"],
      },
      {
        name: "品質と責任",
        description: "生成コードの検証、セキュリティ、人間とAIの分担",
        concepts: ["review-verification", "security-quality", "ai-collaboration"],
      },
    ],
  },
};

const QUIZ_CONCEPTS = {
  // ===================================================
  // オブジェクト指向
  // ===================================================
  "oop-overview": {
    title: "オブジェクト指向(全体像)",
    what: "オブジェクト指向プログラミング(OOP: Object-Oriented Programming)は、状態(データ)と振る舞い(メソッド)を「オブジェクト」としてひとまとめにし、オブジェクト同士の協調としてプログラムを組み立てる考え方です。クラスは設計図、インスタンスはそこから作られた実体です。OOPを支える「4つの柱」は、カプセル化・抽象化・継承・ポリモーフィズムです。",
    apply: {
      text: "データと関数がバラバラな手続き的コードを、データと振る舞いをまとめたクラスに整理します。",
      code: `// ❌ Before: データと関数がバラバラで、どこからでも書き換えられる
let employeeName = "佐藤";
let employeeSalary = 5000000;
function raiseSalary(amount) { employeeSalary += amount; }

// ✅ After: 状態と振る舞いをオブジェクトにまとめる
class Employee {
  constructor(
    private name: string,
    private salary: number,
  ) {}

  raise(amount: number) {
    if (amount <= 0) throw new Error("昇給額が不正");
    this.salary += amount;
  }
  profile(): string {
    return this.name + "(年収" + this.salary + "円)";
  }
}

// クラス(設計図)から独立した状態を持つインスタンス(実体)を作る
const sato = new Employee("佐藤", 5_000_000);
const suzuki = new Employee("鈴木", 6_000_000);
sato.raise(300_000); // 佐藤だけが昇給する`,
    },
    benefits: "・現実の概念(企業、従業員、注文…)をそのままコードにモデリングできる\n・データとそれを扱うロジックが同じ場所にあり、影響範囲を追いやすい\n・カプセル化・抽象化・継承・ポリモーフィズムを組み合わせて、変更に強い設計ができる\n・クラス単位で分業・再利用・テストがしやすい",
    langExamples: [
      {
        lang: "Rust",
        code: `// Rustはstruct(データ)+impl(振る舞い)で表現する
struct Employee {
    name: String,
    salary: u64,
}

impl Employee {
    fn new(name: &str, salary: u64) -> Self {
        Self { name: name.into(), salary }
    }

    fn raise(&mut self, amount: u64) {
        self.salary += amount;
    }

    fn profile(&self) -> String {
        format!("{}(年収{}円)", self.name, self.salary)
    }
}

let mut sato = Employee::new("佐藤", 5_000_000);
sato.raise(300_000);`,
      },
      {
        lang: "F#",
        code: `// F#ではクラスも、レコード+関数のスタイルも選べる
type Employee(name: string, salary: int64) =
    let mutable salary = salary

    member _.Raise amount =
        salary <- salary + amount

    member _.Profile =
        $"{name}(年収{salary}円)"

let sato = Employee("佐藤", 5_000_000L)
sato.Raise 300_000L
printfn $"{sato.Profile}"`,
      },
      {
        lang: "Kotlin",
        code: `class Employee(
    private val name: String,
    private var salary: Long,
) {
    fun raise(amount: Long) {
        require(amount > 0) { "昇給額が不正" }
        salary += amount
    }

    fun profile() = "$name(年収${"$"}{salary}円)"
}

val sato = Employee("佐藤", 5_000_000)
sato.raise(300_000)  // 佐藤のインスタンスだけが変わる`,
      },
      {
        lang: "TypeScript",
        code: `class Employee {
  constructor(
    private name: string,
    private salary: number,
  ) {}

  raise(amount: number) {
    if (amount <= 0) throw new Error("昇給額が不正");
    this.salary += amount;
  }

  profile(): string {
    return this.name + "(年収" + this.salary + "円)";
  }
}

const sato = new Employee("佐藤", 5_000_000);
sato.raise(300_000);`,
      },
    ],
    domain: {
      text: "経済情報ドメインを「企業」「従業員」というオブジェクトの協調でモデリングした例です。それぞれが自分の状態と振る舞いを持ち、メソッド呼び出しで協力し合います。",
      code: `class Employee {
  constructor(public name: string, private salary: number) {}
  annualCost(): number { return this.salary * 1.15; } // 社会保険料込み
}

class Company {
  private employees: Employee[] = [];
  constructor(public name: string, private revenue: number) {}

  hire(e: Employee) { this.employees.push(e); }

  // 企業が自分の従業員たちと協調して人件費率を計算する
  laborCostRatio(): number {
    const total = this.employees.reduce(
      (sum, e) => sum + e.annualCost(), 0);
    return total / this.revenue;
  }
}

const acme = new Company("アクメ商事", 1_000_000_000);
acme.hire(new Employee("佐藤", 5_000_000));
acme.hire(new Employee("鈴木", 6_000_000));
acme.laborCostRatio(); // 企業・従業員それぞれの知識が適切な場所にある`,
    },
  },

  "encapsulation": {
    title: "カプセル化",
    what: "カプセル化(Encapsulation)は、データ(状態)とそれを操作するメソッドをひとまとめにし、内部の詳細を外部から隠すことです。外部には公開インターフェース(publicなメソッド)だけを見せ、内部表現(privateなフィールド)には直接触れさせません。これにより「残高がマイナスにならない」といった不変条件をクラス自身が守れます。",
    apply: {
      text: "誰でも書き換えられる公開フィールドを、検証つきメソッド経由でのみ操作できる形に変えます。",
      code: `// ❌ Before: 外部から残高を直接いじれるので、不正な状態を防げない
class BankAccount {
  balance = 0;
}
const acc = new BankAccount();
acc.balance = -99999; // 誰でも壊せる

// ✅ After: 内部を隠し、検証つきの操作だけを公開する
class BankAccount {
  #balance = 0;               // 外部から直接触れない

  deposit(amount: number) {
    if (amount <= 0) throw new Error("不正な金額");
    this.#balance += amount;
  }
  withdraw(amount: number) {
    if (amount > this.#balance) throw new Error("残高不足");
    this.#balance -= amount;
  }
  get balance() { return this.#balance; } // 読み取りだけ公開
}`,
    },
    benefits: "・不変条件(残高≧0など)をクラス自身が保証でき、壊れた状態が存在できなくなる\n・内部実装(データ構造や計算方法)を、利用側に影響を与えずに変更できる\n・「触ってよい範囲」が型で明示され、誤用やバグの混入経路が減る\n・変更の影響範囲がクラス内部に閉じ、デバッグ・レビューが楽になる",
    langExamples: [
      {
        lang: "Rust",
        code: `// Rustはフィールドがデフォルトで非公開(モジュール外から不可視)
pub struct BankAccount {
    balance: u64, // pubを付けない限り外部から触れない
}

impl BankAccount {
    pub fn new() -> Self {
        Self { balance: 0 }
    }

    pub fn deposit(&mut self, amount: u64) {
        assert!(amount > 0, "不正な金額");
        self.balance += amount;
    }

    pub fn balance(&self) -> u64 {
        self.balance
    }
}`,
      },
      {
        lang: "F#",
        code: `type BankAccount() =
    // letで束縛した値はクラスの外から見えない
    let mutable balance = 0L

    member _.Deposit amount =
        if amount <= 0L then invalidArg "amount" "不正な金額"
        balance <- balance + amount

    member _.Balance = balance  // 読み取りだけ公開

let acc = BankAccount()
acc.Deposit 1000L
// acc.balance <- -1L はコンパイルエラー(触れない)`,
      },
      {
        lang: "Kotlin",
        code: `class BankAccount {
    // privateなプロパティは外部から触れない
    private var _balance: Long = 0

    fun deposit(amount: Long) {
        require(amount > 0) { "不正な金額" }
        _balance += amount
    }

    // 読み取り専用プロパティとして公開
    val balance: Long
        get() = _balance
}

val acc = BankAccount()
acc.deposit(1000)
// acc.balance = -1 はコンパイルエラー`,
      },
      {
        lang: "TypeScript",
        code: `class BankAccount {
  #balance = 0;   // ECMAScriptのプライベートフィールド

  deposit(amount: number) {
    if (amount <= 0) throw new Error("不正な金額");
    this.#balance += amount;
  }

  get balance() { return this.#balance; }
}

const acc = new BankAccount();
acc.deposit(1000);
// acc.#balance = -1 は構文エラー(外部から触れない)`,
      },
    ],
    domain: {
      text: "従業員の給与を公開フィールドにすると、昇給ルール(上限や承認)を無視した書き換えができてしまいます。給与を隠し、ルールを内蔵した操作だけを公開します。",
      code: `class Employee {
  #salary: number;              // 給与は外部から直接触れない

  constructor(public name: string, initialSalary: number) {
    this.#salary = initialSalary;
  }

  // 昇給ルール(1回20%まで)をクラス自身が守る
  raise(rate: number) {
    if (rate <= 0 || rate > 0.2) {
      throw new Error("昇給率は0〜20%の範囲で指定してください");
    }
    this.#salary = Math.round(this.#salary * (1 + rate));
  }

  // 給与そのものは見せず、必要な情報だけ公開する
  payrollCost(): number { return this.#salary * 1.15; }
}

class Company {
  private employees: Employee[] = [];
  hire(e: Employee) { this.employees.push(e); }
  totalPayroll(): number {
    return this.employees.reduce((s, e) => s + e.payrollCost(), 0);
  }
}
// e.salary = 99999999 のような不正な書き換えは型レベルで不可能`,
    },
  },

  "abstraction": {
    title: "抽象化",
    what: "抽象化(Abstraction)は、対象の本質的な特徴(何ができるか)だけを取り出し、それ以外の詳細(どうやるか)を隠して扱えるようにすることです。道具としてはインターフェースや抽象クラスを使います。利用側は「契約」だけを知ってプログラミングできるため、実装の差し替えや追加が自由になります。SOLIDのDIP・OCPの土台となる考え方です。",
    apply: {
      text: "「通知できる」という本質だけをインターフェースに取り出し、メール・Slackなどの詳細を利用側から隠します。",
      code: `// 本質(何ができるか)だけを契約として定義する
interface Notifier {
  notify(message: string): void;
}

// 詳細(どうやるか)は実装クラスに隠れる
class EmailNotifier implements Notifier {
  notify(message: string) { /* SMTP接続、認証、送信… */ }
}
class SlackNotifier implements Notifier {
  notify(message: string) { /* Webhook呼び出し… */ }
}

// 利用側は「通知できる」ことしか知らない
function alertAll(notifiers: Notifier[], message: string) {
  notifiers.forEach(n => n.notify(message));
}`,
    },
    benefits: "・利用側が詳細を知らずに済み、考えることが減る(複雑さの管理)\n・実装の差し替え・追加が利用側の修正なしでできる(OCP・DIPの土台)\n・テスト時は本物の代わりにモック実装を渡せる\n・「何ができるか」が型で表現され、設計の意図が伝わる",
    langExamples: [
      {
        lang: "Rust",
        code: `// トレイトが「何ができるか」の契約を表す
trait Notifier {
    fn notify(&self, message: &str);
}

struct EmailNotifier;
impl Notifier for EmailNotifier {
    fn notify(&self, message: &str) {
        /* SMTP接続、認証、送信… */
    }
}

struct SlackNotifier;
impl Notifier for SlackNotifier {
    fn notify(&self, message: &str) {
        /* Webhook呼び出し… */
    }
}

fn alert_all(notifiers: &[Box<dyn Notifier>], message: &str) {
    for n in notifiers {
        n.notify(message);
    }
}`,
      },
      {
        lang: "F#",
        code: `type INotifier =
    abstract Notify: message: string -> unit

type EmailNotifier() =
    interface INotifier with
        member _.Notify message = () // SMTP接続、認証、送信…

type SlackNotifier() =
    interface INotifier with
        member _.Notify message = () // Webhook呼び出し…

let alertAll (notifiers: INotifier list) message =
    notifiers |> List.iter (fun n -> n.Notify message)

// さらに関数型では「string -> unit という関数型」自体が
// 最小の抽象化として機能する`,
      },
      {
        lang: "Kotlin",
        code: `interface Notifier {
    fun notify(message: String)
}

class EmailNotifier : Notifier {
    override fun notify(message: String) {
        /* SMTP接続、認証、送信… */
    }
}

class SlackNotifier : Notifier {
    override fun notify(message: String) {
        /* Webhook呼び出し… */
    }
}

fun alertAll(notifiers: List<Notifier>, message: String) {
    notifiers.forEach { it.notify(message) }
}`,
      },
      {
        lang: "TypeScript",
        code: `interface Notifier {
  notify(message: string): void;
}

class EmailNotifier implements Notifier {
  notify(message: string) { /* SMTP接続、認証、送信… */ }
}

class SlackNotifier implements Notifier {
  notify(message: string) { /* Webhook呼び出し… */ }
}

function alertAll(notifiers: Notifier[], message: string) {
  notifiers.forEach(n => n.notify(message));
}`,
      },
    ],
    domain: {
      text: "「企業の株価を取得できる」という本質だけを抽象化すれば、裏側がリアルタイムAPIでも、日次CSVでも、テスト用の固定値でも、画面側のコードは1行も変わりません。",
      code: `// 本質: 「企業コードを渡すと株価が返る」という契約
interface StockPriceProvider {
  getPrice(company: Company): number;
}

// 詳細はそれぞれの実装に隠れる
class RealtimeApiProvider implements StockPriceProvider {
  getPrice(company: Company) { /* 取引所APIへ接続… */ return 0; }
}
class DailyCsvProvider implements StockPriceProvider {
  getPrice(company: Company) { /* 日次CSVから読む… */ return 0; }
}
class FixtureProvider implements StockPriceProvider {
  getPrice(company: Company) { return 1000; } // テスト用固定値
}

// 従業員(アナリスト)向けのウォッチ画面は契約だけに依存する
class WatchListScreen {
  constructor(
    private provider: StockPriceProvider,
    private analyst: Employee,
  ) {}
  render(companies: Company[]) {
    companies.forEach(c =>
      console.log(c.name + ": " + this.provider.getPrice(c)));
  }
}`,
    },
  },

  "inheritance": {
    title: "継承",
    what: "継承(Inheritance)は、既存クラス(親・スーパークラス)の状態や振る舞いを引き継いだ新しいクラス(子・サブクラス)を定義し、差分だけを追加・変更(オーバーライド)する仕組みです。「〜は〜の一種(is-a)」という関係を表します。強力ですが親子の結合が強いため、振る舞いの契約を守れる真のis-a関係(リスコフの置換原則)に限定して使うのが目安です。",
    apply: {
      text: "従業員クラスの共通部分を引き継ぎ、マネージャー固有の差分だけをサブクラスに書きます。",
      code: `class Employee {
  constructor(public name: string, protected salary: number) {}

  monthlyPay(): number { return this.salary / 12; }
  profile(): string { return this.name + "(" + this.role() + ")"; }
  role(): string { return "一般社員"; }
}

// Employeeの性質を引き継ぎ、差分だけを定義する
class Manager extends Employee {
  constructor(name: string, salary: number, private teamSize: number) {
    super(name, salary);
  }

  // オーバーライド: 役職名を上書き
  role(): string { return "マネージャー"; }

  // 追加: マネージャー固有の振る舞い
  monthlyPay(): number {
    return super.monthlyPay() + this.teamSize * 10_000; // 管理手当
  }
}`,
    },
    benefits: "・共通のコードを1箇所(親クラス)にまとめ、重複を排除できる\n・差分プログラミング: 変わる部分だけを書けばよい\n・親クラス型として一括で扱え、ポリモーフィズムの土台になる\n・注意: 親の変更が全サブクラスに波及する強い結合なので、is-a関係が成立しない再利用には合成を使う",
    langExamples: [
      {
        lang: "Rust",
        code: `// Rustには実装継承がない。共通の振る舞いは
// トレイトのデフォルト実装で共有する
trait Employee {
    fn name(&self) -> &str;
    fn salary(&self) -> u64;

    // デフォルト実装(共通部分)
    fn monthly_pay(&self) -> u64 {
        self.salary() / 12
    }
    fn role(&self) -> &str {
        "一般社員"
    }
}

struct Manager {
    name: String,
    salary: u64,
    team_size: u64,
}
impl Employee for Manager {
    fn name(&self) -> &str { &self.name }
    fn salary(&self) -> u64 { self.salary }
    // 差分だけをオーバーライド
    fn role(&self) -> &str { "マネージャー" }
    fn monthly_pay(&self) -> u64 {
        self.salary / 12 + self.team_size * 10_000
    }
}`,
      },
      {
        lang: "F#",
        code: `type Employee(name: string, salary: int64) =
    member _.Name = name
    member _.Salary = salary
    abstract MonthlyPay: int64
    default _.MonthlyPay = salary / 12L
    abstract Role: string
    default _.Role = "一般社員"

// inheritで親クラスの性質を引き継ぐ
type Manager(name, salary, teamSize: int64) =
    inherit Employee(name, salary)

    override _.Role = "マネージャー"
    override this.MonthlyPay =
        base.MonthlyPay + teamSize * 10_000L`,
      },
      {
        lang: "Kotlin",
        code: `// Kotlinのクラスはデフォルトでfinal。
// 継承させるには明示的にopenを付ける
open class Employee(val name: String, protected val salary: Long) {
    open fun monthlyPay(): Long = salary / 12
    open fun role(): String = "一般社員"
}

class Manager(
    name: String,
    salary: Long,
    private val teamSize: Int,
) : Employee(name, salary) {
    override fun role() = "マネージャー"
    override fun monthlyPay() =
        super.monthlyPay() + teamSize * 10_000L
}`,
      },
      {
        lang: "TypeScript",
        code: `class Employee {
  constructor(public name: string, protected salary: number) {}
  monthlyPay(): number { return this.salary / 12; }
  role(): string { return "一般社員"; }
}

class Manager extends Employee {
  constructor(name: string, salary: number, private teamSize: number) {
    super(name, salary);
  }
  role(): string { return "マネージャー"; }
  monthlyPay(): number {
    return super.monthlyPay() + this.teamSize * 10_000;
  }
}`,
      },
    ],
    domain: {
      text: "「上場企業は企業の一種」という真のis-a関係を継承で表した例です。共通の振る舞いはCompanyに置き、上場企業固有の情報だけをListedCompanyが追加します(is-aが崩れる場合の注意はLSPの解説も参照)。",
      code: `class Company {
  constructor(
    public name: string,
    public industry: string,
    protected employees: Employee[],
  ) {}

  headcount(): number { return this.employees.length; }
  summary(): string {
    return this.name + "(" + this.industry + "・"
      + this.headcount() + "名)";
  }
}

// 上場企業 is-a 企業: 共通部分を引き継ぎ、差分を追加
class ListedCompany extends Company {
  constructor(
    name: string,
    industry: string,
    employees: Employee[],
    public tickerCode: string,   // 証券コード(上場企業固有)
  ) {
    super(name, industry, employees);
  }

  // オーバーライド: 証券コードつきの表示に上書き
  summary(): string {
    return "[" + this.tickerCode + "] " + super.summary();
  }
}

const acme = new ListedCompany("アクメ商事", "卸売", staff, "8001");
acme.summary(); // "[8001] アクメ商事(卸売・120名)"`,
    },
  },

  "polymorphism": {
    title: "ポリモーフィズム",
    what: "ポリモーフィズム(Polymorphism=多態性)は、同じメソッド呼び出しが、実際のオブジェクトの型に応じて異なる振る舞いをすることです。呼び出し側は相手の具体的な型を知る必要がなく、型による分岐(if/switch)をオブジェクトの差し替えに置き換えられます。代表はサブタイプ多相(オーバーライド+動的ディスパッチ)で、他にジェネリクス(パラメトリック多相)やオーバーロードもあります。",
    apply: {
      text: "型で分岐するコードを、共通インターフェース+それぞれの実装に置き換えます。呼び出し側は1つの書き方で済みます。",
      code: `// ❌ Before: 型を調べて分岐する(型が増えるたびに修正)
function monthlyPay(worker) {
  if (worker.type === "fulltime") return worker.salary / 12;
  if (worker.type === "contract") return worker.hourlyRate * 160;
  if (worker.type === "executive") return worker.annualComp / 12;
}

// ✅ After: 同じ呼び出しで、型に応じた実装が動く
interface Worker {
  monthlyPay(): number;
}
class FullTimeEmployee implements Worker {
  monthlyPay() { return this.salary / 12; }
}
class ContractWorker implements Worker {
  monthlyPay() { return this.hourlyRate * 160; }
}

// 呼び出し側は相手が誰でも同じ1行
function printPayroll(workers: Worker[]) {
  workers.forEach(w => console.log(w.monthlyPay()));
}`,
    },
    benefits: "・型による分岐(if/switch)が消え、コードが単純になる\n・新しい型の追加が「クラスの追加」だけで済む(OCP)\n・呼び出し側が具体的な型を知らないため、疎結合になる\n・StrategyやTemplate Methodなど多くのデザインパターンの動力源になる",
    langExamples: [
      {
        lang: "Rust",
        code: `trait Worker {
    fn monthly_pay(&self) -> u64;
}

struct FullTime { salary: u64 }
impl Worker for FullTime {
    fn monthly_pay(&self) -> u64 { self.salary / 12 }
}

struct Contract { hourly_rate: u64 }
impl Worker for Contract {
    fn monthly_pay(&self) -> u64 { self.hourly_rate * 160 }
}

// dyn Traitによる動的ディスパッチ
fn print_payroll(workers: &[Box<dyn Worker>]) {
    for w in workers {
        println!("{}", w.monthly_pay());
    }
}`,
      },
      {
        lang: "F#",
        code: `type IWorker =
    abstract MonthlyPay: int64

type FullTime(salary: int64) =
    interface IWorker with
        member _.MonthlyPay = salary / 12L

type Contract(hourlyRate: int64) =
    interface IWorker with
        member _.MonthlyPay = hourlyRate * 160L

let printPayroll (workers: IWorker list) =
    workers |> List.iter (fun w -> printfn $"{w.MonthlyPay}")

printPayroll [ FullTime 6_000_000L; Contract 3_000L ]
// 同じ呼び出しで、型ごとに違う計算が動く`,
      },
      {
        lang: "Kotlin",
        code: `interface Worker {
    fun monthlyPay(): Long
}

class FullTime(private val salary: Long) : Worker {
    override fun monthlyPay() = salary / 12
}

class Contract(private val hourlyRate: Long) : Worker {
    override fun monthlyPay() = hourlyRate * 160
}

fun printPayroll(workers: List<Worker>) {
    workers.forEach { println(it.monthlyPay()) }
}

printPayroll(listOf(FullTime(6_000_000), Contract(3_000)))`,
      },
      {
        lang: "TypeScript",
        code: `interface Worker {
  monthlyPay(): number;
}

class FullTime implements Worker {
  constructor(private salary: number) {}
  monthlyPay() { return this.salary / 12; }
}

class Contract implements Worker {
  constructor(private hourlyRate: number) {}
  monthlyPay() { return this.hourlyRate * 160; }
}

function printPayroll(workers: Worker[]) {
  workers.forEach(w => console.log(w.monthlyPay()));
}

printPayroll([new FullTime(6_000_000), new Contract(3_000)]);`,
      },
    ],
    domain: {
      text: "企業への出資形態(株式・債券・融資)は、評価額の計算方法がまったく違います。共通のInvestmentインターフェースにすれば、ポートフォリオ集計は出資形態を知らずに合計できます。",
      code: `interface Investment {
  currentValue(): number;   // 同じ問いかけ、違う計算
}

class StockHolding implements Investment {
  constructor(private company: Company, private shares: number) {}
  currentValue() { return this.company.stockPrice * this.shares; }
}
class Bond implements Investment {
  constructor(private faceValue: number, private marketRate: number) {}
  currentValue() { return this.faceValue / (1 + this.marketRate); }
}
class Loan implements Investment {
  constructor(private principal: number, private repaid: number) {}
  currentValue() { return this.principal - this.repaid; }
}

// ポートフォリオ担当の従業員は、出資形態ごとの計算式を知らなくてよい
class Portfolio {
  constructor(private manager: Employee, private assets: Investment[]) {}
  totalValue(): number {
    return this.assets.reduce((sum, a) => sum + a.currentValue(), 0);
  }
}
// 新しい出資形態(転換社債など)もクラス追加だけで集計に加わる`,
    },
  },

  "composition-over-inheritance": {
    title: "継承より合成",
    what: "「継承より合成(Composition over Inheritance)」は、機能の再利用を安易な継承ではなく、他のオブジェクトをフィールドとして持ち、処理を委譲する「合成」で実現しようという設計指針です。判断の目安は関係性です。「AはBの一種(is-a)」で振る舞いの契約も守れるなら継承、「AはBを持つ/使う(has-a)」なら合成。継承は親子の結合が強く、階層は後から組み替えにくいため、迷ったら合成が安全です。",
    apply: {
      text: "「機能が欲しいだけ」の継承をやめ、必要な部品を持って委譲する形に変えます。",
      code: `// ❌ Before: ログ機能が欲しいだけなのに継承してしまう
// (ReportServiceはLoggerの一種、ではない)
class ReportService extends Logger {
  generate() {
    this.log("生成開始"); // 継承で手に入れたメソッド
    /* … */
  }
}

// ✅ After: Loggerを「持って」委譲する(has-a)
class ReportService {
  constructor(private logger: Logger) {}  // 合成

  generate() {
    this.logger.log("生成開始");  // 委譲
    /* … */
  }
}
// テスト時はダミーのLoggerに差し替えられ、
// ログの実装を変えてもReportServiceの階層は影響を受けない`,
    },
    benefits: "・部品の組み合わせを実行時に自由に変えられる(継承階層はコンパイル時に固定)\n・複数の機能を組み合わせても、多重継承の複雑さが生じない\n・親クラスの内部実装への依存(脆い基底クラス問題)を避けられる\n・StrategyやDecoratorなど、合成を活かしたパターンにつながる",
    langExamples: [
      {
        lang: "Rust",
        code: `// Rustは実装継承がなく、合成が基本スタイル
struct Logger;
impl Logger {
    fn log(&self, msg: &str) {
        println!("[LOG] {msg}");
    }
}

struct ReportService {
    logger: Logger, // has-a: 部品として持つ
}

impl ReportService {
    fn generate(&self) {
        self.logger.log("生成開始"); // 委譲
        /* … */
    }
}`,
      },
      {
        lang: "F#",
        code: `type Logger() =
    member _.Log msg = printfn $"[LOG] {msg}"

// 部品を受け取って保持する(has-a)
type ReportService(logger: Logger) =
    member _.Generate() =
        logger.Log "生成開始"  // 委譲
        // …

// 関数型スタイルなら「関数を部品として持つ」だけでよい
let makeGenerate (log: string -> unit) =
    fun () ->
        log "生成開始"
        // …`,
      },
      {
        lang: "Kotlin",
        code: `interface Logger {
    fun log(msg: String)
}

class ConsoleLogger : Logger {
    override fun log(msg: String) = println("[LOG] $msg")
}

// 合成: Loggerを持って委譲する
class ReportService(private val logger: Logger) {
    fun generate() {
        logger.log("生成開始")
        /* … */
    }
}

// Kotlinには委譲の言語サポート(by)もある:
// class Service(logger: Logger) : Logger by logger`,
      },
      {
        lang: "TypeScript",
        code: `interface Logger {
  log(msg: string): void;
}

class ConsoleLogger implements Logger {
  log(msg: string) { console.log("[LOG]", msg); }
}

// 合成: Loggerを持って委譲する
class ReportService {
  constructor(private logger: Logger) {}

  generate() {
    this.logger.log("生成開始");
    /* … */
  }
}

const service = new ReportService(new ConsoleLogger());`,
      },
    ],
    domain: {
      text: "従業員の「役割」を継承階層(Manager extends Engineer extends…)で表すと、兼務や異動のたびに階層が破綻します。役割や給与計算ポリシーを「持ち物」として合成すれば、組み合わせ・入れ替えが自由です。",
      code: `// ❌ 継承で役割を表すと、兼務(エンジニア兼マネージャー)や
//    異動(役割の変更)に対応できない
class EngineerManager extends Engineer /* かつManagerでもある…? */ {}

// ✅ 役割を「持ち物」として合成する
interface Role {
  title: string;
  allowance(): number;  // 役割手当
}
class EngineerRole implements Role {
  title = "エンジニア";
  allowance() { return 30_000; }
}
class ManagerRole implements Role {
  title = "マネージャー";
  allowance() { return 50_000; }
}

class Employee {
  private roles: Role[] = [];   // has-a: 複数の役割を持てる(兼務)
  constructor(public name: string, private baseSalary: number) {}

  assign(role: Role) { this.roles.push(role); }        // 異動も自由
  monthlyPay(): number {
    const allowances = this.roles.reduce(
      (s, r) => s + r.allowance(), 0);
    return this.baseSalary / 12 + allowances;
  }
}

const sato = new Employee("佐藤", 6_000_000);
sato.assign(new EngineerRole());
sato.assign(new ManagerRole()); // 兼務も階層の破綻なく表現できる`,
    },
  },

  // ===================================================
  // SOLID原則
  // ===================================================
  "srp": {
    title: "単一責任の原則(SRP)",
    what: "SRPは Single Responsibility Principle の略です。クラス(モジュール)を変更する理由は1つだけであるべき、という原則です。提唱者のRobert C. Martinは「モジュールはただ1つのアクター(変更を要求してくる役割・部門)に対して責務を負うべき」と説明しています。1つのクラスに複数の関心事が同居していると、ある目的の修正が別の目的の機能を壊すリスクが生まれます。",
    apply: {
      text: "「集計」「整形」「保存」という3つの変更理由を持つクラスを、責務ごとに分割します。",
      code: `// ❌ Before: 変更理由が3つある
class Report {
  aggregate()  { /* 集計ロジック */ }
  toHtml()     { /* HTML整形 */ }
  saveToDb()   { /* DB保存 */ }
}

// ✅ After: 1クラス1責務に分割
class ReportAggregator { aggregate(data) { /* 集計だけ */ } }
class ReportFormatter  { toHtml(report)  { /* 整形だけ */ } }
class ReportRepository { save(report)    { /* 保存だけ */ } }`,
    },
    benefits: "・修正の影響範囲が狭くなり、「整形を直したら保存が壊れた」が起きない\n・クラスが小さくなり、名前から役割が分かるので読みやすい\n・責務単位でテストでき、テストコードもシンプルになる\n・チームで担当を分けやすくなる(整形担当と保存担当が同じファイルを取り合わない)",
    langExamples: [
      {
        lang: "Rust",
        code: `struct Report { title: String, body: String }

// 整形の責務だけを持つ
struct ReportFormatter;
impl ReportFormatter {
    fn to_html(&self, r: &Report) -> String {
        format!("<h1>{}</h1><p>{}</p>", r.title, r.body)
    }
}

// 保存の責務だけを持つ
struct ReportRepository;
impl ReportRepository {
    fn save(&self, _r: &Report) { /* DBに保存 */ }
}`,
      },
      {
        lang: "F#",
        code: `type Report = { Title: string; Body: string }

// F#ではモジュール単位で責務を分ける
module ReportFormatter =
    let toHtml r = $"<h1>{r.Title}</h1><p>{r.Body}</p>"

module ReportRepository =
    let save (r: Report) = () // DBに保存`,
      },
      {
        lang: "Kotlin",
        code: `data class Report(val title: String, val body: String)

class ReportFormatter {
    fun toHtml(r: Report) = "<h1>" + r.title + "</h1><p>" + r.body + "</p>"
}

class ReportRepository {
    fun save(r: Report) { /* DBに保存 */ }
}`,
      },
      {
        lang: "TypeScript",
        code: `class Report {
  constructor(public title: string, public body: string) {}
}

class ReportFormatter {
  toHtml(r: Report): string {
    return "<h1>" + r.title + "</h1><p>" + r.body + "</p>";
  }
}

class ReportRepository {
  save(r: Report): void { /* DBに保存 */ }
}`,
      },
    ],
    domain: {
      text: "企業(Company)クラスに「財務指標の計算(経理部門の関心)」「開示資料の整形(IR部門の関心)」「従業員の入社処理(人事部門の関心)」が同居していると、3部門それぞれの要求変更が1クラスに集中します。アクターごとにクラスを分けます。",
      code: `// ❌ 経理・IR・人事、3部門の変更理由が1クラスに集まる
class Company {
  calcOperatingMargin() { /* 経理向け: 営業利益率の計算 */ }
  formatDisclosure()    { /* IR向け: 開示資料の整形 */ }
  hireEmployee(e)       { /* 人事向け: 入社処理 */ }
}

// ✅ アクター(変更を求める部門)ごとに分割
class Company {
  constructor(
    public name: string,
    public financials: Financials,
    public employees: Employee[],
  ) {}
}
class FinancialCalculator {  // 経理部門のための責務
  calcOperatingMargin(c: Company): number {
    return c.financials.operatingIncome / c.financials.revenue;
  }
}
class DisclosureFormatter {  // IR部門のための責務
  format(c: Company): string { /* 開示資料を整形 */ return ""; }
}
class EmploymentService {    // 人事部門のための責務
  hire(c: Company, e: Employee) { c.employees.push(e); }
}`,
    },
  },

  "ocp": {
    title: "オープン・クローズドの原則(OCP)",
    what: "OCPは Open-Closed Principle の略です。ソフトウェアの構成要素は「拡張に対して開いていて(Open)、修正に対して閉じている(Closed)」べきという原則です。つまり、新しい振る舞いの追加は「既存コードの修正」ではなく「新しいコードの追加」で実現できるように設計します。主な手段は抽象化(インターフェース+ポリモーフィズム)です。",
    apply: {
      text: "型で分岐するswitch文を、インターフェースの実装追加に置き換えます。新しい図形が増えても既存コードは1行も変わりません。",
      code: `// ❌ Before: 図形が増えるたびにこの関数を修正する
function area(shape) {
  switch (shape.type) {
    case "circle": return Math.PI * shape.r ** 2;
    case "rect":   return shape.w * shape.h;
    // 新しい図形のcaseを追加し続ける…
  }
}

// ✅ After: 新しい図形は「クラスの追加」だけ
interface Shape { area(): number; }
class Circle implements Shape {
  constructor(private r: number) {}
  area() { return Math.PI * this.r ** 2; }
}
class Rect implements Shape {
  constructor(private w: number, private h: number) {}
  area() { return this.w * this.h; }
}
// Triangleを追加しても area() の利用側は無修正`,
    },
    benefits: "・既存コードを触らないので、動いている機能を壊すリスク(デグレ)が減る\n・追加した部分だけをレビュー・テストすればよくなる\n・分岐の抜け漏れ(caseの追加忘れ)がコンパイルエラーや設計で防げる\n・プラグイン的な拡張がしやすいアーキテクチャになる",
    langExamples: [
      {
        lang: "Rust",
        code: `trait Shape {
    fn area(&self) -> f64;
}

struct Circle { r: f64 }
impl Shape for Circle {
    fn area(&self) -> f64 { std::f64::consts::PI * self.r * self.r }
}

struct Rect { w: f64, h: f64 }
impl Shape for Rect {
    fn area(&self) -> f64 { self.w * self.h }
}

// 新しい図形は impl Shape の追加だけ。この関数は無修正
fn total_area(shapes: &[Box<dyn Shape>]) -> f64 {
    shapes.iter().map(|s| s.area()).sum()
}`,
      },
      {
        lang: "F#",
        code: `type IShape =
    abstract Area: float

type Circle(r: float) =
    interface IShape with
        member _.Area = System.Math.PI * r * r

type Rect(w: float, h: float) =
    interface IShape with
        member _.Area = w * h

// 新しい図形を追加してもこの関数は無修正
let totalArea (shapes: IShape list) =
    shapes |> List.sumBy (fun s -> s.Area)`,
      },
      {
        lang: "Kotlin",
        code: `interface Shape { fun area(): Double }

class Circle(private val r: Double) : Shape {
    override fun area() = Math.PI * r * r
}

class Rect(private val w: Double, private val h: Double) : Shape {
    override fun area() = w * h
}

// 新しい図形を追加してもこの関数は無修正
fun totalArea(shapes: List<Shape>) = shapes.sumOf { it.area() }`,
      },
      {
        lang: "TypeScript",
        code: `interface Shape { area(): number; }

class Circle implements Shape {
  constructor(private r: number) {}
  area() { return Math.PI * this.r ** 2; }
}

class Rect implements Shape {
  constructor(private w: number, private h: number) {}
  area() { return this.w * this.h; }
}

// 新しい図形を追加してもこの関数は無修正
const totalArea = (shapes: Shape[]) =>
  shapes.reduce((sum, s) => sum + s.area(), 0);`,
      },
    ],
    domain: {
      text: "企業のスコアリング(投資判断のための評価指標)を考えます。指標の種類でswitchしていると、新しい指標のたびに既存関数を修正することになります。ScoringRuleインターフェースにすれば「クラスの追加」だけで拡張できます。",
      code: `// ❌ 指標が増えるたびにこの関数を修正する
function score(c: Company, type: string): number {
  switch (type) {
    case "per":      return c.marketCap / c.netIncome;
    case "dividend": return c.dividendPerShare / c.stockPrice;
    // 指標が増えるたびにcaseを追加…
  }
}

// ✅ 新しい指標は「クラスの追加」だけで済む
interface ScoringRule {
  name: string;
  score(c: Company): number;
}
class PerRule implements ScoringRule {
  name = "PER";
  score(c: Company) { return c.marketCap / c.netIncome; }
}
class DividendYieldRule implements ScoringRule {
  name = "配当利回り";
  score(c: Company) { return c.dividendPerShare / c.stockPrice; }
}
// 「従業員数の伸び率」という新指標も、追加だけで対応できる
class EmployeeGrowthRule implements ScoringRule {
  name = "従業員増加率";
  score(c: Company) {
    return c.employees.length / c.employeeCountLastYear;
  }
}`,
    },
  },

  "lsp": {
    title: "リスコフの置換原則(LSP)",
    what: "LSPは Liskov Substitution Principle の略です(計算機科学者 Barbara Liskov の名前に由来)。派生型(サブクラス)は、その基底型(親クラス)と置き換えて(Substitution)もプログラムの正しさを損なわないようにすべき、という原則です。「is-a(〜は〜の一種)に見えるか」ではなく「基底型の契約(呼び出し側の期待)を守れるか」で継承の妥当性を判断します。契約を守れないなら、継承ではなく別の設計を選びます。",
    apply: {
      text: "有名なRectangle/Square問題です。「正方形は長方形の一種」でも、幅と高さを独立に設定できるという契約を破るため、継承関係にせず対等な実装として扱います。",
      code: `// ❌ Before: Squareは「幅と高さを独立に設定できる」契約を破る
class Rectangle {
  setWidth(w)  { this.w = w; }
  setHeight(h) { this.h = h; }
}
class Square extends Rectangle {
  setWidth(w)  { this.w = w; this.h = w; }  // 高さも変わってしまう
  setHeight(h) { this.w = h; this.h = h; }
}
const r: Rectangle = new Square();
r.setWidth(4); r.setHeight(5);
// 呼び出し側は面積20を期待するが、実際は25になる

// ✅ After: 継承をやめて、共通の抽象の対等な実装にする
interface Shape { area(): number; }
class Rectangle implements Shape {
  constructor(public w: number, public h: number) {}
  area() { return this.w * this.h; }
}
class Square implements Shape {
  constructor(public side: number) {}
  area() { return this.side ** 2; }
}`,
    },
    benefits: "・「親クラスとして使ったら壊れた」という発見しにくいバグを防げる\n・instanceof での型チェックや、サブクラスごとの特別扱いが不要になる\n・ポリモーフィズムを安心して使えるようになり、OCPも活きてくる\n・「継承すべきか、委譲やインターフェースにすべきか」の判断基準になる",
    langExamples: [
      {
        lang: "Rust",
        code: `// Rustには実装継承がなく、トレイトの対等な実装として
// 表現するため、LSP違反の継承がそもそも起きにくい
trait Shape {
    fn area(&self) -> f64;
}

struct Rectangle { w: f64, h: f64 }
impl Shape for Rectangle {
    fn area(&self) -> f64 { self.w * self.h }
}

struct Square { side: f64 }
impl Shape for Square {
    fn area(&self) -> f64 { self.side * self.side }
}`,
      },
      {
        lang: "F#",
        code: `// 判別共用体で「別の形」として対等にモデリングする
type Shape =
    | Rectangle of w: float * h: float
    | Square of side: float

let area = function
    | Rectangle (w, h) -> w * h
    | Square s -> s * s

// どのケースでも呼び出し側の期待(正しい面積)を裏切らない`,
      },
      {
        lang: "Kotlin",
        code: `interface Shape { fun area(): Double }

class Rectangle(var w: Double, var h: Double) : Shape {
    override fun area() = w * h
}

// RectangleのサブクラスにせずShapeの実装として対等に定義
class Square(var side: Double) : Shape {
    override fun area() = side * side
}`,
      },
      {
        lang: "TypeScript",
        code: `interface Shape { area(): number; }

class Rectangle implements Shape {
  constructor(public w: number, public h: number) {}
  area() { return this.w * this.h; }
}

// RectangleのサブクラスにせずShapeの実装として対等に定義
class Square implements Shape {
  constructor(public side: number) {}
  area() { return this.side ** 2; }
}`,
      },
    ],
    domain: {
      text: "「上場企業は企業の一種」だからと、株価取得メソッドを持つCompanyを親に非上場企業を継承させると、非上場企業で例外が飛び、Companyとして扱うコードが壊れます。「株価を持つ」という能力を別インターフェースに切り出します。",
      code: `// ❌ すべての企業が株価を持つわけではない
class Company {
  getStockPrice(): number { /* 取引所から取得 */ return 0; }
}
class PrivateCompany extends Company {
  getStockPrice(): number {
    throw new Error("非上場企業に株価はない"); // LSP違反
  }
}

// ✅ 「上場している」能力を別インターフェースに切り出す
class Company {
  constructor(public name: string, public employees: Employee[]) {}
}
interface Listed {
  getStockPrice(): number;
}
class ListedCompany extends Company implements Listed {
  getStockPrice(): number { /* 取引所から取得 */ return 0; }
}
class PrivateCompany extends Company {} // 株価メソッド自体を持たない

// 株価一覧画面はListedだけを受け取るので、例外は起こりえない
function showPriceBoard(companies: Listed[]) {
  companies.forEach(c => console.log(c.getStockPrice()));
}`,
    },
  },

  "isp": {
    title: "インターフェース分離の原則(ISP)",
    what: "ISPは Interface Segregation Principle の略です(segregation=分離)。クライアント(利用側)に、利用しないメソッドへの依存を強制してはならない、という原則です。多くの役割を詰め込んだ「太った(fat)インターフェース」を、クライアントごとに必要最小限のインターフェースへ分割します。「実装できないので例外を投げる」「空実装で誤魔化す」メソッドが現れたら、分割のサインです。",
    apply: {
      text: "Worker(work/eat/sleep)を強制されたRobotが例外を投げる例を、能力ごとの小さなインターフェースに分割します。",
      code: `// ❌ Before: Robotは使わないメソッドの実装を強制される
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}
class Robot implements Worker {
  work()  { /* OK */ }
  eat()   { throw new Error("not supported"); }
  sleep() { throw new Error("not supported"); }
}

// ✅ After: 能力ごとにインターフェースを分離する
interface Workable { work(): void; }
interface Eatable  { eat(): void; }
interface Sleepable { sleep(): void; }

class Human implements Workable, Eatable, Sleepable {
  work() {} eat() {} sleep() {}
}
class Robot implements Workable {  // 必要なものだけ実装
  work() {}
}
// 利用側も必要な能力だけに依存する
function startShift(worker: Workable) { worker.work(); }`,
    },
    benefits: "・「実装できないので例外/空実装」というダミーコードが消える(LSP違反の予防にもなる)\n・クライアントは使うメソッドだけに依存するので、無関係な変更の影響を受けない\n・インターフェースが小さいので、テスト用のモックが簡単に書ける\n・「このクラスは何ができるか」が型で正確に表現される",
    langExamples: [
      {
        lang: "Rust",
        code: `// Rustのトレイトは小さく分けて組み合わせるのが基本
trait Workable { fn work(&self); }
trait Eatable  { fn eat(&self); }

struct Human;
impl Workable for Human { fn work(&self) { println!("働く"); } }
impl Eatable  for Human { fn eat(&self)  { println!("食べる"); } }

struct Robot;
impl Workable for Robot { fn work(&self) { println!("働く"); } }
// RobotはEatableを実装しなくてよい

fn start_shift(worker: &impl Workable) {
    worker.work();
}`,
      },
      {
        lang: "F#",
        code: `type IWorkable = abstract Work: unit -> unit
type IEatable  = abstract Eat: unit -> unit

type Human() =
    interface IWorkable with member _.Work() = printfn "働く"
    interface IEatable  with member _.Eat()  = printfn "食べる"

type Robot() =
    interface IWorkable with member _.Work() = printfn "働く"
    // IEatableの実装は不要

let startShift (worker: IWorkable) = worker.Work()`,
      },
      {
        lang: "Kotlin",
        code: `interface Workable { fun work() }
interface Eatable  { fun eat() }

class Human : Workable, Eatable {
    override fun work() = println("働く")
    override fun eat()  = println("食べる")
}

class Robot : Workable {  // Eatableは実装しない
    override fun work() = println("働く")
}

fun startShift(worker: Workable) = worker.work()`,
      },
      {
        lang: "TypeScript",
        code: `interface Workable { work(): void; }
interface Eatable  { eat(): void; }

class Human implements Workable, Eatable {
  work() { console.log("働く"); }
  eat()  { console.log("食べる"); }
}

class Robot implements Workable {  // Eatableは実装しない
  work() { console.log("働く"); }
}

const startShift = (worker: Workable) => worker.work();`,
      },
    ],
    domain: {
      text: "企業の全データ(財務・株価・ニュース・従業員)を1つのProviderにまとめると、株価チャート画面のような「株価しか使わない」クライアントまで、ニュースAPIの変更やモック作成の負担を背負わされます。クライアントごとに分割します。",
      code: `// ❌ 太ったインターフェース: 全画面が全データ源に依存させられる
interface CompanyDataProvider {
  getFinancials(code: string): Financials;  // 財務諸表
  getStockPrice(code: string): StockPrice;  // 株価
  getNews(code: string): News[];            // ニュース
  getEmployees(code: string): Employee[];   // 所属する従業員
}

// ✅ クライアント(画面)ごとに必要な能力だけへ分離
interface FinancialsProvider {
  getFinancials(code: string): Financials;
}
interface StockPriceProvider {
  getStockPrice(code: string): StockPrice;
}
interface EmployeeDirectory {
  getEmployees(code: string): Employee[];
}

// 株価チャート画面は株価だけに依存する
class StockChartScreen {
  constructor(private prices: StockPriceProvider) {}
}
// 役員一覧画面は従業員情報だけに依存する
// (ニュースAPIが変わっても、この画面は再テスト不要)
class ExecutiveListScreen {
  constructor(private directory: EmployeeDirectory) {}
}`,
    },
  },

  "dip": {
    title: "依存性逆転の原則(DIP)",
    what: "DIPは Dependency Inversion Principle の略です。上位モジュール(ビジネスロジック)も下位モジュール(DB・外部APIなどの詳細)も、具象ではなく抽象に依存すべき、という原則です。ポイントは「抽象(インターフェース)の所有権を上位側に置く」こと。これにより本来「上位→下位」だった依存の向きが逆転します。DI(依存性注入)はDIPを実現する代表的な手段です。",
    apply: {
      text: "サービスが具象リポジトリを直接newしている状態から、インターフェースを定義してコンストラクタで注入する形に変えます。",
      code: `// ❌ Before: 上位のサービスがDB実装(具象)に直接依存
class OrderService {
  private repo = new MySqlOrderRepository(); // 直接生成
  save(order: Order) { this.repo.insert(order); }
}

// ✅ After: 抽象を定義し、実装を外から注入する
interface OrderRepository {
  insert(order: Order): void;
}
class OrderService {
  constructor(private repo: OrderRepository) {}  // 抽象に依存
  save(order: Order) { this.repo.insert(order); }
}
class MySqlOrderRepository implements OrderRepository { /* 本番用 */ }
class InMemoryOrderRepository implements OrderRepository { /* テスト用 */ }

const service = new OrderService(new MySqlOrderRepository());`,
    },
    benefits: "・ビジネスロジックがDBや外部APIの都合(接続情報、SDKの変更)から独立する\n・テスト時にモック実装へ差し替えられ、DBなしで高速にテストできる\n・実装の乗り換え(MySQL→PostgreSQL、ベンダーA→B)が利用側の修正なしでできる\n・クリーンアーキテクチャなど、レイヤー間の依存を整理する土台になる",
    langExamples: [
      {
        lang: "Rust",
        code: `trait OrderRepository {
    fn insert(&self, order_id: u32);
}

struct MySqlOrderRepository;
impl OrderRepository for MySqlOrderRepository {
    fn insert(&self, _order_id: u32) { /* DBに保存 */ }
}

// 上位モジュールは抽象(トレイト)にのみ依存する
struct OrderService<R: OrderRepository> {
    repo: R,
}
impl<R: OrderRepository> OrderService<R> {
    fn save(&self, order_id: u32) {
        self.repo.insert(order_id);
    }
}`,
      },
      {
        lang: "F#",
        code: `type IOrderRepository =
    abstract Insert: orderId: int -> unit

type MySqlOrderRepository() =
    interface IOrderRepository with
        member _.Insert orderId = () // DBに保存

// クラスに注入するスタイル
type OrderService(repo: IOrderRepository) =
    member _.Save orderId = repo.Insert orderId

// 関数型スタイルでは「関数を注入する」だけでもDIPを満たせる
let save (insert: int -> unit) orderId = insert orderId`,
      },
      {
        lang: "Kotlin",
        code: `interface OrderRepository {
    fun insert(orderId: Int)
}

class MySqlOrderRepository : OrderRepository {
    override fun insert(orderId: Int) { /* DBに保存 */ }
}

// 上位モジュールは抽象を注入される(コンストラクタインジェクション)
class OrderService(private val repo: OrderRepository) {
    fun save(orderId: Int) = repo.insert(orderId)
}

val service = OrderService(MySqlOrderRepository())`,
      },
      {
        lang: "TypeScript",
        code: `interface OrderRepository {
  insert(orderId: number): void;
}

class MySqlOrderRepository implements OrderRepository {
  insert(orderId: number) { /* DBに保存 */ }
}

class OrderService {
  constructor(private repo: OrderRepository) {}  // 抽象に依存
  save(orderId: number) { this.repo.insert(orderId); }
}

const service = new OrderService(new MySqlOrderRepository());`,
      },
    ],
    domain: {
      text: "決算アラートのビジネスロジックが特定ベンダーの株価・決算APIクライアントを直接生成していると、ベンダー変更やテストのたびにロジック側の修正が必要になります。抽象をビジネスロジック側が所有し、実装を注入します。",
      code: `// ❌ 上位のビジネスロジックが特定ベンダーのSDKに直依存
class EarningsAlertService {
  private api = new BloombergApiClient();  // 具象を直接生成
  check(company: Company) {
    const e = this.api.fetchEarnings(company.code);
    /* 上方修正なら通知… */
  }
}

// ✅ 抽象はビジネスロジック側が所有し、実装を注入する
interface EarningsProvider {
  fetchEarnings(code: string): Earnings;
}

class EarningsAlertService {
  constructor(private provider: EarningsProvider) {}
  check(company: Company) {
    const e = this.provider.fetchEarnings(company.code);
    if (e.profit > e.forecast) { /* 担当従業員に通知 */ }
  }
}

class BloombergProvider implements EarningsProvider { /* 本番用 */ }
class FixtureProvider implements EarningsProvider { /* テスト用 */ }

// ベンダー乗り換えもテストも、Service本体は無修正
const service = new EarningsAlertService(new BloombergProvider());`,
    },
  },

  "solid-overview": {
    title: "SOLID原則(全体像)",
    what: "SOLIDは、オブジェクト指向設計の5原則の頭文字です。\nS = 単一責任の原則(SRP: Single Responsibility Principle): 変更理由は1つに\nO = オープン・クローズドの原則(OCP: Open-Closed Principle): 修正ではなく追加で拡張\nL = リスコフの置換原則(LSP: Liskov Substitution Principle): 派生型は基底型の契約を守る\nI = インターフェース分離の原則(ISP: Interface Segregation Principle): 使わないものに依存させない\nD = 依存性逆転の原則(DIP: Dependency Inversion Principle): 具象ではなく抽象に依存する\n5つは独立ではなく、「抽象に依存し(DIP)、追加で拡張し(OCP)、責務を絞る(SRP)」のように組み合わさって効果を発揮します。",
    apply: {
      text: "「通知先が増えるたびにif文を修正する」コードに、複数の原則を同時に適用した例です。抽象への依存(DIP)により、追加だけで拡張でき(OCP)、判定と通知の責務も分かれます(SRP)。",
      code: `// ❌ Before: 通知方法が増えるたびにこの関数を修正
class NotificationService {
  notify(kind: string, msg: string) {
    if (kind === "email")      { /* メール送信 */ }
    else if (kind === "slack") { /* Slack送信 */ }
    // 通知先が増えるたびにelse ifを追加…
  }
}

// ✅ After: DIP + OCP + SRP
interface Notifier {           // 抽象を定義(DIP)
  notify(msg: string): void;
}
class EmailNotifier implements Notifier { notify(msg) { /* … */ } }
class SlackNotifier implements Notifier { notify(msg) { /* … */ } }
// 新しい通知先は「クラスの追加」だけ(OCP)

class AlertService {           // 判定の責務だけを持つ(SRP)
  constructor(private notifiers: Notifier[]) {}  // 注入(DIP)
  alert(msg: string) {
    this.notifiers.forEach(n => n.notify(msg));
  }
}`,
    },
    benefits: "・変更に強くなる: 修正の影響範囲が狭く、拡張は追加で済む\n・テストしやすくなる: 小さな責務+抽象への依存で、モック差し替えが容易\n・理解しやすくなる: クラス名・インターフェース名が設計の意図を語る\n・ただし万能ではない: 小規模なコードでは抽象化がやり過ぎ(過剰設計)になることもあり、変更の予測とのバランスが大切",
    langExamples: [
      {
        lang: "Rust",
        code: `// Notifierの抽象に依存し、追加だけで拡張できる構成
trait Notifier {
    fn notify(&self, msg: &str);
}

struct EmailNotifier;
impl Notifier for EmailNotifier {
    fn notify(&self, msg: &str) { println!("Email: {msg}"); }
}

struct SlackNotifier;
impl Notifier for SlackNotifier {
    fn notify(&self, msg: &str) { println!("Slack: {msg}"); }
}

fn alert(notifiers: &[Box<dyn Notifier>], msg: &str) {
    for n in notifiers {
        n.notify(msg);
    }
}`,
      },
      {
        lang: "F#",
        code: `// 関数型では「通知する関数」のリストとして表現できる
let emailNotifier msg = printfn $"Email: {msg}"
let slackNotifier msg = printfn $"Slack: {msg}"

let alert (notifiers: (string -> unit) list) msg =
    notifiers |> List.iter (fun notify -> notify msg)

// 新しい通知先は関数を1つ書いてリストに足すだけ
alert [ emailNotifier; slackNotifier ] "決算発表がありました"`,
      },
      {
        lang: "Kotlin",
        code: `fun interface Notifier {
    fun notify(msg: String)
}

class EmailNotifier : Notifier {
    override fun notify(msg: String) = println("Email: $msg")
}

class SlackNotifier : Notifier {
    override fun notify(msg: String) = println("Slack: $msg")
}

class AlertService(private val notifiers: List<Notifier>) {
    fun alert(msg: String) = notifiers.forEach { it.notify(msg) }
}`,
      },
      {
        lang: "TypeScript",
        code: `interface Notifier {
  notify(msg: string): void;
}

class EmailNotifier implements Notifier {
  notify(msg: string) { console.log("Email:", msg); }
}

class SlackNotifier implements Notifier {
  notify(msg: string) { console.log("Slack:", msg); }
}

class AlertService {
  constructor(private notifiers: Notifier[]) {}
  alert(msg: string) { this.notifiers.forEach(n => n.notify(msg)); }
}`,
      },
    ],
    domain: {
      text: "決算速報の監視・通知システムを例にすると、5原則が自然に組み合わさります。判定はWatcher、通知はNotifier実装、データ取得は抽象Provider経由——それぞれの原則が担当する箇所を持ちます。",
      code: `interface EarningsProvider {          // DIP: 抽象を上位が所有
  fetch(code: string): Earnings;
}
interface Notifier {                   // ISP: 通知の能力だけの小さな契約
  notify(msg: string): void;
}

class EarningsWatcher {                // SRP: 「判定」だけを担当
  constructor(
    private provider: EarningsProvider,  // DIP: 実装を注入
    private notifiers: Notifier[],
  ) {}
  check(company: Company) {
    const e = this.provider.fetch(company.code);
    if (e.profit > e.forecast) {
      const msg = company.name + "が業績を上方修正";
      this.notifiers.forEach(n => n.notify(msg));
    }
  }
}

// OCP: アナリスト従業員へのメール通知に加えて
// Slack通知を増やしても、Watcherは無修正
class EmailToAnalyst implements Notifier {
  constructor(private analyst: Employee) {}
  notify(msg: string) { /* analyst.email宛に送信 */ }
}
class SlackNotifier implements Notifier { /* … */ }`,
    },
  },

  // ===================================================
  // デザインパターン
  // ===================================================
  "singleton": {
    title: "Singletonパターン",
    what: "クラスのインスタンスがアプリ全体で1つだけであることを保証し、そこへのグローバルなアクセス手段を提供する生成パターンです。設定情報や共有キャッシュなど「2つ存在すると困るもの」に使います。ただしグローバル状態を作るため、隠れた依存やテストの難しさという副作用があり、現代ではDIコンテナで単一インスタンスを管理する方法が好まれることも多いです。",
    apply: {
      text: "コンストラクタを外部から呼べなくし、静的メソッド経由で唯一のインスタンスを返します(遅延初期化)。",
      code: `class Config {
  private static instance: Config | null = null;

  // newを外部から禁止する
  private constructor(public readonly apiUrl: string) {}

  static get(): Config {
    if (Config.instance === null) {
      Config.instance = new Config("https://api.example.com");
    }
    return Config.instance;
  }
}

const a = Config.get();
const b = Config.get();
console.log(a === b); // true — 常に同じインスタンス`,
    },
    benefits: "・「1つしか存在しない」ことを型とコードで保証できる(うっかり2つ作れない)\n・初回アクセス時まで生成を遅延でき、重い初期化を必要時だけに絞れる\n・どこからでも同じ状態にアクセスできる\n・注意: グローバル状態は依存が見えにくくテストしづらいので、乱用せずDI併用を検討する",
    langExamples: [
      {
        lang: "Rust",
        code: `use std::sync::OnceLock;

struct Config {
    api_url: String,
}

// OnceLockでスレッドセーフな1回だけの初期化を保証
static CONFIG: OnceLock<Config> = OnceLock::new();

fn config() -> &'static Config {
    CONFIG.get_or_init(|| Config {
        api_url: "https://api.example.com".into(),
    })
}`,
      },
      {
        lang: "F#",
        code: `// F#のモジュールの値は1度だけ初期化される
// = 言語仕様が自然にSingletonを提供する
module Config =
    let apiUrl = "https://api.example.com"

    // 重い初期化を遅延させたい場合はlazyを使う
    let holidays = lazy (loadHolidaysFromFile ())

Config.holidays.Value // 初回アクセス時に1度だけロード`,
      },
      {
        lang: "Kotlin",
        code: `// Kotlinではobject宣言が言語仕様としてSingletonを提供する
// (スレッドセーフな遅延初期化も自動)
object Config {
    val apiUrl = "https://api.example.com"
}

fun main() {
    println(Config.apiUrl) // どこからでも同一インスタンス
}`,
      },
      {
        lang: "TypeScript",
        code: `class Config {
  private static instance: Config | null = null;
  private constructor(public readonly apiUrl: string) {}

  static get(): Config {
    return (this.instance ??= new Config("https://api.example.com"));
  }
}

Config.get().apiUrl;
// なおESモジュール自体が1回だけ評価されるので、
// export const config = { … } も実質Singletonになる`,
      },
    ],
    domain: {
      text: "取引所の営業日カレンダー(休日データ)は、株価チャート・決算カレンダー・注文画面などあらゆる場所から参照されますが、内容は全画面で共通です。1回だけロードして全体で共有するSingletonが適しています。",
      code: `class MarketCalendar {
  private static instance: MarketCalendar | null = null;
  private holidays: Set<string>;

  private constructor() {
    // 取引所の休日データを1回だけロードする(重い処理)
    this.holidays = new Set(["2026-01-01", "2026-01-02" /* … */]);
  }

  static get(): MarketCalendar {
    return (this.instance ??= new MarketCalendar());
  }

  isTradingDay(date: string): boolean {
    return !this.holidays.has(date);
  }
}

// 株価チャートも、企業の決算カレンダーも、
// 従業員向けの取引画面も、同じインスタンスを参照する
MarketCalendar.get().isTradingDay("2026-01-01"); // false`,
    },
  },

  "adapter": {
    title: "Adapterパターン",
    what: "互換性のないインターフェース同士を変換して接続する構造パターンです。利用側が期待するインターフェース(Target)に合わせて、既存クラス(Adaptee)の呼び出しを変換するラッパー(Adapter)を挟みます。「電源プラグの変換アダプタ」のイメージで、既存コードや外部ライブラリを変更せずに接続できます。",
    apply: {
      text: "利用側が期待するPrinterインターフェースと、変更できない既存クラスLegacyPrinterを、Adapterで橋渡しします。",
      code: `// 利用側が期待するインターフェース(Target)
interface Printer {
  print(s: string): void;
}

// 互換性のない既存クラス(Adaptee)— 変更できない
class LegacyPrinter {
  outputAllCaps(s: string) { console.log(s.toUpperCase()); }
}

// Adapterが変換して橋渡しする
class PrinterAdapter implements Printer {
  constructor(private legacy: LegacyPrinter) {}
  print(s: string) { this.legacy.outputAllCaps(s); }
}

// 利用側はPrinterしか知らない
const printer: Printer = new PrinterAdapter(new LegacyPrinter());
printer.print("hello");`,
    },
    benefits: "・既存クラスや外部ライブラリを一切変更せずに再利用できる\n・変換ロジックがAdapter1箇所に集まり、散らばらない\n・外部依存の型がアプリ内部に漏れず、乗り換えが楽になる(腐敗防止層)\n・レガシーコードの段階的な移行にも使える",
    langExamples: [
      {
        lang: "Rust",
        code: `// 利用側が期待するインターフェース
trait Printer {
    fn print(&self, s: &str);
}

// 互換性のない既存の型
struct LegacyPrinter;
impl LegacyPrinter {
    fn output_all_caps(&self, s: &str) {
        println!("{}", s.to_uppercase());
    }
}

// Adapterが変換して橋渡しする
struct PrinterAdapter {
    legacy: LegacyPrinter,
}
impl Printer for PrinterAdapter {
    fn print(&self, s: &str) {
        self.legacy.output_all_caps(s);
    }
}`,
      },
      {
        lang: "F#",
        code: `type IPrinter =
    abstract Print: string -> unit

// 互換性のない既存クラス
type LegacyPrinter() =
    member _.OutputAllCaps (s: string) = printfn $"{s.ToUpper()}"

// Adapterが変換して橋渡しする
type PrinterAdapter(legacy: LegacyPrinter) =
    interface IPrinter with
        member _.Print s = legacy.OutputAllCaps s

let printer: IPrinter = PrinterAdapter(LegacyPrinter())
printer.Print "hello"`,
      },
      {
        lang: "Kotlin",
        code: `interface Printer {
    fun print(s: String)
}

// 互換性のない既存クラス
class LegacyPrinter {
    fun outputAllCaps(s: String) = println(s.uppercase())
}

// Adapterが変換して橋渡しする
class PrinterAdapter(private val legacy: LegacyPrinter) : Printer {
    override fun print(s: String) = legacy.outputAllCaps(s)
}

val printer: Printer = PrinterAdapter(LegacyPrinter())`,
      },
      {
        lang: "TypeScript",
        code: `interface Printer {
  print(s: string): void;
}

class LegacyPrinter {
  outputAllCaps(s: string) { console.log(s.toUpperCase()); }
}

class PrinterAdapter implements Printer {
  constructor(private legacy: LegacyPrinter) {}
  print(s: string) { this.legacy.outputAllCaps(s); }
}

const printer: Printer = new PrinterAdapter(new LegacyPrinter());`,
      },
    ],
    domain: {
      text: "外部の株価データベンダーのレスポンス形式(変更できない)を、自社アプリが期待するStockQuote形式に変換します。ベンダーを乗り換えてもAdapterを差し替えるだけで済みます。",
      code: `// 外部ベンダーAPIのレスポンス(こちらでは変えられない)
interface VendorQuote {
  symbol: string;
  last_px: number;
  ts_epoch: number;
}

// 自社アプリが期待するインターフェース
interface StockQuote {
  code: string;
  price: number;
  updatedAt: Date;
}
interface StockQuoteProvider {
  getQuote(code: string): StockQuote;
}

// Adapter: ベンダー形式 → 自社形式へ変換
class VendorQuoteAdapter implements StockQuoteProvider {
  constructor(private vendor: VendorApi) {}
  getQuote(code: string): StockQuote {
    const q: VendorQuote = this.vendor.fetch(code);
    return {
      code: q.symbol,
      price: q.last_px,
      updatedAt: new Date(q.ts_epoch * 1000),
    };
  }
}
// 企業詳細画面はStockQuoteProviderしか知らないので、
// ベンダーを乗り換えてもAdapterの差し替えだけで済む`,
    },
  },

  "observer": {
    title: "Observerパターン",
    what: "あるオブジェクト(Subject)の状態変化を、それに依存する複数のオブジェクト(Observer)へ自動的に通知する、1対多の振る舞いパターンです。Subjectは「誰が聞いているか」を具体的に知らず、登録されたObserverに一斉通知するだけです。イベントリスナーやPub/Sub、リアクティブプログラミングの基礎になっています。",
    apply: {
      text: "SubjectにObserverの登録口(subscribe)を設け、状態変化時に登録済みの全Observerへ通知します。",
      code: `type Observer = (price: number) => void;

class PriceFeed {                       // Subject(通知する側)
  private observers: Observer[] = [];

  subscribe(o: Observer) { this.observers.push(o); }

  setPrice(price: number) {
    // 状態変化を全Observerへ自動通知
    this.observers.forEach(o => o(price));
  }
}

const feed = new PriceFeed();
feed.subscribe(p => console.log("チャート更新:", p));
feed.subscribe(p => { if (p > 1000) console.log("アラート!"); });
feed.setPrice(1200); // 両方のObserverが反応する`,
    },
    benefits: "・Subject側は通知先を知らなくてよい(疎結合)ので、通知先の追加・削除が自由\n・ポーリング(定期的な問い合わせ)が不要になり、変化した瞬間に反応できる\n・1つのイベントに複数の処理(画面更新・ログ・アラート)を独立して繋げられる\n・注意: 通知の連鎖が追いにくくなることがあるので、購読解除の管理も忘れずに",
    langExamples: [
      {
        lang: "Rust",
        code: `trait Observer {
    fn update(&self, price: f64);
}

struct ChartWidget;
impl Observer for ChartWidget {
    fn update(&self, price: f64) { println!("チャート更新: {price}"); }
}

struct PriceFeed {
    observers: Vec<Box<dyn Observer>>,
}
impl PriceFeed {
    fn subscribe(&mut self, o: Box<dyn Observer>) {
        self.observers.push(o);
    }
    fn set_price(&self, price: f64) {
        for o in &self.observers {
            o.update(price);
        }
    }
}`,
      },
      {
        lang: "F#",
        code: `// F#/.NETは言語・標準ライブラリでObserverを直接サポート
type PriceFeed() =
    let priceChanged = Event<float>()
    member _.PriceChanged = priceChanged.Publish
    member _.SetPrice p = priceChanged.Trigger p

let feed = PriceFeed()
feed.PriceChanged.Add(fun p -> printfn $"チャート更新: {p}")
feed.PriceChanged.Add(fun p ->
    if p > 1000.0 then printfn "アラート!")
feed.SetPrice 1200.0 // 両方のハンドラが呼ばれる`,
      },
      {
        lang: "Kotlin",
        code: `fun interface Observer {
    fun update(price: Double)
}

class PriceFeed {
    private val observers = mutableListOf<Observer>()

    fun subscribe(o: Observer) { observers += o }

    fun setPrice(price: Double) =
        observers.forEach { it.update(price) }
}

val feed = PriceFeed()
feed.subscribe { p -> println("チャート更新: $p") }
feed.subscribe { p -> if (p > 1000) println("アラート!") }
feed.setPrice(1200.0)`,
      },
      {
        lang: "TypeScript",
        code: `type Observer = (price: number) => void;

class PriceFeed {
  private observers: Observer[] = [];

  subscribe(o: Observer) { this.observers.push(o); }

  setPrice(price: number) {
    this.observers.forEach(o => o(price));
  }
}

const feed = new PriceFeed();
feed.subscribe(p => console.log("チャート更新:", p));
feed.subscribe(p => { if (p > 1000) console.log("アラート!"); });
feed.setPrice(1200);`,
      },
    ],
    domain: {
      text: "株価フィードの更新を、チャート画面・価格アラート・従業員(アナリスト)のウォッチリストなど複数の機能へ同時に届けます。フィード側は「誰が使うか」を知らないので、新しい購読者を自由に追加できます。",
      code: `type PriceListener = (company: Company, price: number) => void;

class StockPriceFeed {
  private listeners: PriceListener[] = [];
  subscribe(l: PriceListener) { this.listeners.push(l); }
  onTick(company: Company, price: number) {
    this.listeners.forEach(l => l(company, price));
  }
}

const feed = new StockPriceFeed();

// チャート画面が購読
feed.subscribe((c, p) => chart.draw(c.code, p));

// 価格アラート機能が購読(担当従業員へ通知)
feed.subscribe((c, p) => {
  const watch = watchList.find(c.code);
  if (watch && p >= watch.targetPrice) {
    notify(watch.analyst /* Employee */, c.name + "が目標株価に到達");
  }
});

// ポートフォリオ評価が購読
feed.subscribe((c, p) => portfolio.revalue(c.code, p));

// フィード側は購読者を1つも知らないまま配信できる`,
    },
  },

  "strategy": {
    title: "Strategyパターン",
    what: "アルゴリズム(計算方法・処理方式)をそれぞれ独立したクラス(または関数)としてカプセル化し、実行時に交換可能にする振る舞いパターンです。「何をするか」は共通インターフェースで固定し、「どうやるか」を差し替えます。if/switchによる方式の分岐をポリモーフィズムに置き換える代表的な手段です。",
    apply: {
      text: "手数料の計算方式をStrategyとして切り出し、利用側(Broker)は方式を知らずに計算を依頼します。",
      code: `// アルゴリズムの共通インターフェース
type FeeStrategy = (amount: number) => number;

const flatFee: FeeStrategy = () => 100;              // 定額
const rateFee: FeeStrategy = amount => amount * 0.001; // 料率

class Broker {
  constructor(private strategy: FeeStrategy) {}
  charge(amount: number) { return this.strategy(amount); }
}

// 実行時に方式を選べる。新方式の追加も既存コード無修正
const broker = new Broker(rateFee);
broker.charge(1_000_000); // 1000`,
    },
    benefits: "・方式の分岐(if/switch)が消え、新しいアルゴリズムを追加だけで拡張できる(OCP)\n・アルゴリズム単体でテストできる\n・実行時にユーザー設定や条件に応じて方式を切り替えられる\n・利用側のコードが「何をするか」だけに集中でき、読みやすくなる",
    langExamples: [
      {
        lang: "Rust",
        code: `trait FeeStrategy {
    fn fee(&self, amount: f64) -> f64;
}

struct FlatFee;
impl FeeStrategy for FlatFee {
    fn fee(&self, _amount: f64) -> f64 { 100.0 }
}

struct RateFee { rate: f64 }
impl FeeStrategy for RateFee {
    fn fee(&self, amount: f64) -> f64 { amount * self.rate }
}

struct Broker {
    strategy: Box<dyn FeeStrategy>,
}
impl Broker {
    fn charge(&self, amount: f64) -> f64 {
        self.strategy.fee(amount)
    }
}`,
      },
      {
        lang: "F#",
        code: `// 関数型言語では「関数を渡す」ことがそのままStrategyになる
let flatFee _amount = 100.0
let rateFee rate amount = amount * rate

let charge (feeStrategy: float -> float) amount =
    feeStrategy amount

charge flatFee 1000000.0        // 100.0
charge (rateFee 0.001) 1000000.0 // 1000.0`,
      },
      {
        lang: "Kotlin",
        code: `fun interface FeeStrategy {
    fun fee(amount: Double): Double
}

class Broker(private val strategy: FeeStrategy) {
    fun charge(amount: Double) = strategy.fee(amount)
}

// SAM変換でラムダをそのまま渡せる
val flat = Broker { 100.0 }
val rate = Broker { amount -> amount * 0.001 }

rate.charge(1_000_000.0) // 1000.0`,
      },
      {
        lang: "TypeScript",
        code: `type FeeStrategy = (amount: number) => number;

class Broker {
  constructor(private strategy: FeeStrategy) {}
  charge(amount: number) { return this.strategy(amount); }
}

const flat = new Broker(() => 100);
const rate = new Broker(amount => amount * 0.001);

rate.charge(1_000_000); // 1000`,
      },
    ],
    domain: {
      text: "企業のバリュエーション(理論価値の算出)には、PER基準・DCF法・配当割引モデルなど複数の方式があります。方式をStrategyとして注入すれば、アナリスト(従業員)が画面で選んだ方式に応じて切り替えられます。",
      code: `interface ValuationStrategy {
  name: string;
  value(c: Company): number;
}

class PerValuation implements ValuationStrategy {
  name = "PER基準";
  value(c: Company) { return c.netIncome * 15; }
}
class DcfValuation implements ValuationStrategy {
  name = "DCF法";
  value(c: Company) { /* 将来キャッシュフローを割引 */ return 0; }
}
class DividendValuation implements ValuationStrategy {
  name = "配当割引モデル";
  value(c: Company) { /* 配当から算出 */ return 0; }
}

class CompanyAnalyzer {
  constructor(private strategy: ValuationStrategy) {}
  report(c: Company): string {
    return c.name + "の理論価値(" + this.strategy.name + "): "
      + this.strategy.value(c);
  }
}

// アナリスト(従業員)が選んだ方式で評価
const analyzer = new CompanyAnalyzer(new DcfValuation());`,
    },
  },

  "template-method": {
    title: "Template Methodパターン",
    what: "処理の大きな流れ(骨組み)を親クラスのメソッドで固定し、流れの中の個々のステップだけを抽象メソッドとしてサブクラスにオーバーライドさせる振る舞いパターンです。「全体の順序は共通、細部だけ違う」処理の重複を排除できます。関数型言語では高階関数(関数を受け取る関数)で同じことを表現できます。",
    apply: {
      text: "「取得→整形」という流れを親クラスで固定し、整形方法だけをサブクラスで差し替えます。",
      code: `abstract class ReportGenerator {
  // 骨組み(テンプレートメソッド): 順序はここで固定
  generate(): string {
    const data = this.fetch();
    return this.format(data);
  }
  protected abstract fetch(): string;
  protected abstract format(data: string): string;
}

class HtmlReport extends ReportGenerator {
  protected fetch() { return "売上データ"; }
  protected format(data: string) { return "<h1>" + data + "</h1>"; }
}

class CsvReport extends ReportGenerator {
  protected fetch() { return "売上データ"; }
  protected format(data: string) { return "data," + data; }
}`,
    },
    benefits: "・処理の順序・流れが1箇所(親クラス)に集まり、重複しない\n・「順序を間違える」バグをサブクラス側で起こせない\n・共通処理の変更が親クラスの修正1回で全サブクラスに反映される\n・フレームワークが利用者コードを呼び出す「ハリウッドの原則」の基本形",
    langExamples: [
      {
        lang: "Rust",
        code: `// トレイトのデフォルト実装が骨組みを固定する
trait ReportGenerator {
    fn fetch(&self) -> String;
    fn format(&self, data: String) -> String;

    // テンプレートメソッド(デフォルト実装)
    fn generate(&self) -> String {
        let data = self.fetch();
        self.format(data)
    }
}

struct HtmlReport;
impl ReportGenerator for HtmlReport {
    fn fetch(&self) -> String { "売上データ".into() }
    fn format(&self, data: String) -> String {
        format!("<h1>{data}</h1>")
    }
}`,
      },
      {
        lang: "F#",
        code: `// 高階関数で「骨組み+差し替え可能なステップ」を表現する
let generateReport fetch format =
    let data = fetch ()   // ステップ1: 取得
    format data           // ステップ2: 整形(差し替え可能)

let htmlReport =
    generateReport
        (fun () -> "売上データ")
        (fun d -> $"<h1>{d}</h1>")

let csvReport =
    generateReport
        (fun () -> "売上データ")
        (fun d -> $"data,{d}")`,
      },
      {
        lang: "Kotlin",
        code: `abstract class ReportGenerator {
    // 骨組みは固定(オーバーライド不可)
    fun generate(): String {
        val data = fetch()
        return format(data)
    }
    protected abstract fun fetch(): String
    protected abstract fun format(data: String): String
}

class HtmlReport : ReportGenerator() {
    override fun fetch() = "売上データ"
    override fun format(data: String) = "<h1>$data</h1>"
}`,
      },
      {
        lang: "TypeScript",
        code: `abstract class ReportGenerator {
  generate(): string {          // 骨組みを固定
    const data = this.fetch();
    return this.format(data);
  }
  protected abstract fetch(): string;
  protected abstract format(data: string): string;
}

class HtmlReport extends ReportGenerator {
  protected fetch() { return "売上データ"; }
  protected format(data: string) { return "<h1>" + data + "</h1>"; }
}`,
      },
    ],
    domain: {
      text: "決算レポートの生成は「データ取得→検証→整形」の流れがどのレポートでも共通です。流れを親クラスで固定し、四半期HTML版・通期PDF版などの違いはステップの実装だけで表現します。",
      code: `abstract class EarningsReport {
  // 骨組み: 取得→検証→整形 の順序は固定
  generate(company: Company): string {
    const raw = this.fetch(company.code);
    if (!this.validate(raw)) {
      throw new Error(company.name + "の決算データに不備");
    }
    return this.format(company, raw);
  }

  protected abstract fetch(code: string): RawEarnings;

  // フックメソッド: デフォルトあり、必要なら上書き
  protected validate(raw: RawEarnings): boolean {
    return raw.revenue >= 0;
  }

  protected abstract format(c: Company, raw: RawEarnings): string;
}

class QuarterlyHtmlReport extends EarningsReport {
  protected fetch(code: string) { /* 四半期データ取得 */ }
  protected format(c: Company, raw: RawEarnings) { /* HTML化 */ }
}
class AnnualPdfReport extends EarningsReport {
  protected fetch(code: string) { /* 通期データ取得 */ }
  protected format(c: Company, raw: RawEarnings) { /* PDF化 */ }
}`,
    },
  },

  "decorator": {
    title: "Decoratorパターン",
    what: "既存オブジェクトを、同じインターフェースを持つラッパーで包むことで、継承を使わずに機能を動的に追加していく構造パターンです。ラッパーは何重にも重ねられるため、必要な機能だけを自由な組み合わせで「重ね着」できます。継承だと組み合わせの数だけサブクラスが爆発しますが、Decoratorなら機能ごとに1クラスで済みます。",
    apply: {
      text: "DataSourceと同じインターフェースを持つLoggingDecoratorで包み、読み込みにログ機能を追加します。",
      code: `interface DataSource {
  read(): string;
}

class FileSource implements DataSource {
  read() { return "data"; }
}

// 同じインターフェースを実装したラッパーが機能を追加する
class LoggingDecorator implements DataSource {
  constructor(private inner: DataSource) {}
  read() {
    console.log("読み込み開始");
    return this.inner.read();
  }
}

// 利用側はDataSourceとしてそのまま使える
const source: DataSource = new LoggingDecorator(new FileSource());
source.read();`,
    },
    benefits: "・実行時に必要な機能だけを選んで組み合わせられる(継承は組み合わせ爆発する)\n・各機能(ログ・キャッシュ・リトライ等)が独立した小さなクラスになる(SRP)\n・元のクラスを一切変更せずに機能を足せる(OCP)\n・重ねる順序で挙動を制御できる(例: キャッシュの内側でリトライ)",
    langExamples: [
      {
        lang: "Rust",
        code: `trait DataSource {
    fn read(&self) -> String;
}

struct FileSource;
impl DataSource for FileSource {
    fn read(&self) -> String { "data".into() }
}

// ジェネリクスで内側のDataSourceを包む
struct LoggingDecorator<S: DataSource> {
    inner: S,
}
impl<S: DataSource> DataSource for LoggingDecorator<S> {
    fn read(&self) -> String {
        println!("読み込み開始");
        self.inner.read()
    }
}

let source = LoggingDecorator { inner: FileSource };`,
      },
      {
        lang: "F#",
        code: `// 関数を包む関数がDecoratorになる
type DataSource = unit -> string

let fileSource: DataSource = fun () -> "data"

let withLogging (inner: DataSource) : DataSource =
    fun () ->
        printfn "読み込み開始"
        inner ()

let withCache (inner: DataSource) : DataSource =
    let cache = lazy (inner ())
    fun () -> cache.Value

// 必要な機能を重ね着させる
let source = withLogging (withCache fileSource)`,
      },
      {
        lang: "Kotlin",
        code: `interface DataSource {
    fun read(): String
}

class FileSource : DataSource {
    override fun read() = "data"
}

class LoggingDecorator(private val inner: DataSource) : DataSource {
    override fun read(): String {
        println("読み込み開始")
        return inner.read()
    }
}

val source: DataSource = LoggingDecorator(FileSource())`,
      },
      {
        lang: "TypeScript",
        code: `interface DataSource {
  read(): string;
}

class FileSource implements DataSource {
  read() { return "data"; }
}

class LoggingDecorator implements DataSource {
  constructor(private inner: DataSource) {}
  read() {
    console.log("読み込み開始");
    return this.inner.read();
  }
}

const source: DataSource = new LoggingDecorator(new FileSource());`,
      },
    ],
    domain: {
      text: "株価取得APIの呼び出しに「キャッシュ」「ログ」を重ね着させます。画面によって「キャッシュだけ」「ログだけ」など必要な組み合わせが違っても、Decoratorなら自由に構成できます。",
      code: `interface PriceProvider {
  getPrice(company: Company): number;
}

class ApiPriceProvider implements PriceProvider {
  getPrice(company: Company) { /* 実際のAPI呼び出し */ return 0; }
}

// キャッシュ機能を重ねるDecorator
class CachedPrice implements PriceProvider {
  private cache = new Map<string, number>();
  constructor(private inner: PriceProvider) {}
  getPrice(company: Company) {
    if (!this.cache.has(company.code)) {
      this.cache.set(company.code, this.inner.getPrice(company));
    }
    return this.cache.get(company.code)!;
  }
}

// ログ機能を重ねるDecorator
class LoggedPrice implements PriceProvider {
  constructor(private inner: PriceProvider) {}
  getPrice(company: Company) {
    console.log("株価取得: " + company.name);
    return this.inner.getPrice(company);
  }
}

// 必要な機能を重ね着させる(順序も選べる)
const provider: PriceProvider =
  new LoggedPrice(new CachedPrice(new ApiPriceProvider()));`,
    },
  },

  "facade": {
    title: "Facadeパターン",
    what: "複雑なサブシステム群(複数のクラスやAPIの呼び出し手順)に対して、シンプルな窓口となるインターフェースを1つ用意する構造パターンです。Facade(ファサード)は建物の「正面」の意味。利用側はサブシステムの内部構造や正しい呼び出し順序を知らずに、簡潔なAPIだけで目的を達成できます。",
    apply: {
      text: "認証→在庫確保→決済という複数サブシステムの手順を、Facadeの1メソッドにまとめます。",
      code: `// サブシステム群(それぞれ複雑な事情を持つ)
class Auth      { login()   { /* 認証 */ } }
class Inventory { reserve() { /* 在庫確保 */ } }
class Payment   { charge()  { /* 決済 */ } }

// Facadeが正しい手順を1つの窓口にまとめる
class OrderFacade {
  private auth = new Auth();
  private inventory = new Inventory();
  private payment = new Payment();

  placeOrder() {
    this.auth.login();
    this.inventory.reserve();
    this.payment.charge();
  }
}

// 利用側は1メソッド呼ぶだけ
new OrderFacade().placeOrder();`,
    },
    benefits: "・利用側のコードが劇的にシンプルになり、誤った手順で呼ぶミスがなくなる\n・サブシステムの内部変更がFacadeの内側に閉じ、利用側に波及しない\n・サブシステムへの依存がFacade1箇所に集まり、結合度が下がる\n・注意: 何でもFacadeに足すと「神クラス」化するので、窓口の責務は絞る",
    langExamples: [
      {
        lang: "Rust",
        code: `struct Auth;
impl Auth { fn login(&self) { /* 認証 */ } }

struct Inventory;
impl Inventory { fn reserve(&self) { /* 在庫確保 */ } }

struct Payment;
impl Payment { fn charge(&self) { /* 決済 */ } }

// Facadeが複雑な手順を1つの窓口にまとめる
struct OrderFacade {
    auth: Auth,
    inventory: Inventory,
    payment: Payment,
}
impl OrderFacade {
    fn place_order(&self) {
        self.auth.login();
        self.inventory.reserve();
        self.payment.charge();
    }
}`,
      },
      {
        lang: "F#",
        code: `module Auth =
    let login () = ()      // 認証
module Inventory =
    let reserve () = ()    // 在庫確保
module Payment =
    let charge () = ()     // 決済

// Facade: 複雑な手順を1つの関数にまとめる
module OrderFacade =
    let placeOrder () =
        Auth.login ()
        Inventory.reserve ()
        Payment.charge ()

OrderFacade.placeOrder ()`,
      },
      {
        lang: "Kotlin",
        code: `class Auth      { fun login()   { /* 認証 */ } }
class Inventory { fun reserve() { /* 在庫確保 */ } }
class Payment   { fun charge()  { /* 決済 */ } }

class OrderFacade(
    private val auth: Auth = Auth(),
    private val inventory: Inventory = Inventory(),
    private val payment: Payment = Payment(),
) {
    fun placeOrder() {
        auth.login()
        inventory.reserve()
        payment.charge()
    }
}

OrderFacade().placeOrder()`,
      },
      {
        lang: "TypeScript",
        code: `class Auth      { login()   { /* 認証 */ } }
class Inventory { reserve() { /* 在庫確保 */ } }
class Payment   { charge()  { /* 決済 */ } }

class OrderFacade {
  private auth = new Auth();
  private inventory = new Inventory();
  private payment = new Payment();

  placeOrder() {
    this.auth.login();
    this.inventory.reserve();
    this.payment.charge();
  }
}

new OrderFacade().placeOrder();`,
      },
    ],
    domain: {
      text: "企業サマリー画面を出すには、認証トークン取得→株価API→財務API→ニュースAPIと複数の呼び出しが必要です。MarketDataFacadeが手順をまとめ、画面側は1メソッドで企業スナップショットを取得できます。",
      code: `class MarketDataFacade {
  constructor(
    private auth: AuthClient,          // 認証
    private prices: PriceApi,          // 株価API
    private financials: FinancialsApi, // 財務API
    private news: NewsApi,             // ニュースAPI
  ) {}

  // 利用側は1メソッド呼ぶだけで企業サマリーが手に入る
  getCompanySnapshot(company: Company): CompanySnapshot {
    const token = this.auth.token();
    return {
      name: company.name,
      price: this.prices.latest(company.code, token),
      financials: this.financials.summary(company.code, token),
      headlines: this.news.top(company.code, token, 5),
      executives: company.employees.filter(e => e.isExecutive),
    };
  }
}

// 企業詳細画面: API群の呼び出し順序も認証も知らなくてよい
const snapshot = facade.getCompanySnapshot(toyota);`,
    },
  },

  "command": {
    title: "Commandパターン",
    what: "操作(リクエスト)そのものを、実行に必要な情報ごとオブジェクトとして表現する振る舞いパターンです。操作がオブジェクトになることで、履歴に積む・取り消す(Undo)・キューに入れる・ログに残す・後で実行する、といった扱いが可能になります。エディタのUndo/Redoやジョブキューの基本形です。",
    apply: {
      text: "操作をexecute/undoを持つオブジェクトにし、実行履歴をスタックに積んでUndoを実現します。",
      code: `interface Command {
  execute(): void;
  undo(): void;
}

class AddText implements Command {
  constructor(private doc: Document, private text: string) {}
  execute() { this.doc.append(this.text); }
  undo()    { this.doc.removeLast(this.text.length); }
}

class History {
  private stack: Command[] = [];
  run(cmd: Command) {
    cmd.execute();
    this.stack.push(cmd);  // 履歴に積む
  }
  undoLast() {
    this.stack.pop()?.undo();  // 直前の操作を取り消す
  }
}`,
    },
    benefits: "・Undo/Redo、操作履歴、マクロ(操作の記録・再生)が自然に実装できる\n・操作をキューに積んで遅延実行・非同期実行できる\n・「操作を発行する側」と「実行する側」が分離される(ボタンは中身を知らない)\n・操作のログが構造化データとして残せる(監査にも有効)",
    langExamples: [
      {
        lang: "Rust",
        code: `trait Command {
    fn execute(&self);
    fn undo(&self);
}

struct AddText { text: String }
impl Command for AddText {
    fn execute(&self) { println!("追加: {}", self.text); }
    fn undo(&self)    { println!("取り消し: {}", self.text); }
}

struct History {
    stack: Vec<Box<dyn Command>>,
}
impl History {
    fn run(&mut self, cmd: Box<dyn Command>) {
        cmd.execute();
        self.stack.push(cmd);
    }
    fn undo_last(&mut self) {
        if let Some(cmd) = self.stack.pop() {
            cmd.undo();
        }
    }
}`,
      },
      {
        lang: "F#",
        code: `// レコードに実行・取り消しの関数を持たせる
type Command = {
    Execute: unit -> unit
    Undo: unit -> unit
}

let addText text = {
    Execute = fun () -> printfn $"追加: {text}"
    Undo    = fun () -> printfn $"取り消し: {text}"
}

let mutable history: Command list = []

let run cmd =
    cmd.Execute()
    history <- cmd :: history

let undoLast () =
    match history with
    | cmd :: rest ->
        cmd.Undo()
        history <- rest
    | [] -> ()`,
      },
      {
        lang: "Kotlin",
        code: `interface Command {
    fun execute()
    fun undo()
}

class AddText(private val text: String) : Command {
    override fun execute() = println("追加: $text")
    override fun undo()    = println("取り消し: $text")
}

class History {
    private val stack = ArrayDeque<Command>()
    fun run(cmd: Command) {
        cmd.execute()
        stack.addLast(cmd)
    }
    fun undoLast() {
        stack.removeLastOrNull()?.undo()
    }
}`,
      },
      {
        lang: "TypeScript",
        code: `interface Command {
  execute(): void;
  undo(): void;
}

class AddText implements Command {
  constructor(private text: string) {}
  execute() { console.log("追加:", this.text); }
  undo()    { console.log("取り消し:", this.text); }
}

class History {
  private stack: Command[] = [];
  run(cmd: Command) {
    cmd.execute();
    this.stack.push(cmd);
  }
  undoLast() { this.stack.pop()?.undo(); }
}`,
      },
    ],
    domain: {
      text: "ポートフォリオへの売買注文をCommandにすると、実行履歴・取り消し・監査ログが自然に手に入ります。「誰が(従業員)」「どの企業を」「いくら」操作したかがオブジェクトとして記録されます。",
      code: `interface OrderCommand {
  execute(): void;
  undo(): void;
  describe(): string;  // 監査ログ用
}

class BuyOrder implements OrderCommand {
  constructor(
    private portfolio: Portfolio,
    private trader: Employee,   // 発注した従業員
    private company: Company,
    private qty: number,
  ) {}
  execute() { this.portfolio.add(this.company.code, this.qty); }
  undo()    { this.portfolio.remove(this.company.code, this.qty); }
  describe() {
    return this.trader.name + "が" + this.company.name
      + "を" + this.qty + "株購入";
  }
}

class OrderHistory {
  private history: OrderCommand[] = [];
  run(cmd: OrderCommand) {
    cmd.execute();
    this.history.push(cmd);
    auditLog.write(cmd.describe());  // 監査ログにも自動記録
  }
  undoLast() { this.history.pop()?.undo(); }  // 誤発注の取り消し
}`,
    },
  },

  "composite": {
    title: "Compositeパターン",
    what: "個々の部品(Leaf)と部品の集まり(Composite)を同じインターフェースで扱えるようにし、木構造を表現する構造パターンです。Compositeは子として「Leaf」も「別のComposite」も持てるため、任意の深さの入れ子を再帰的に扱えます。利用側は相手が「個」か「集合」かを区別せずに操作できます。ファイルシステム(ファイルとフォルダ)が典型例です。",
    apply: {
      text: "ファイル(Leaf)とフォルダ(Composite)が同じNodeインターフェースを実装し、サイズ計算を再帰的に行います。",
      code: `interface Node {
  size(): number;
}

class File implements Node {                 // Leaf(個)
  constructor(private bytes: number) {}
  size() { return this.bytes; }
}

class Folder implements Node {               // Composite(集合)
  private children: Node[] = [];             // FileもFolderも持てる
  add(node: Node) { this.children.push(node); }
  size() {
    return this.children.reduce((sum, c) => sum + c.size(), 0);
  }
}

const root = new Folder();
root.add(new File(100));
const sub = new Folder();
sub.add(new File(200));
root.add(sub);           // フォルダの中にフォルダ
root.size();             // 300 — 再帰的に合計される`,
    },
    benefits: "・利用側が「個」と「集合」を区別しなくてよく、コードが単純になる\n・任意の深さの入れ子構造を、再帰でエレガントに処理できる\n・新しい種類のLeaf/Compositeを追加しても利用側は無修正(OCP)\n・組織図・メニュー・UIツリーなど、現実の階層構造をそのまま表現できる",
    langExamples: [
      {
        lang: "Rust",
        code: `trait Node {
    fn size(&self) -> u64;
}

struct File { bytes: u64 }
impl Node for File {
    fn size(&self) -> u64 { self.bytes }
}

struct Folder { children: Vec<Box<dyn Node>> }
impl Node for Folder {
    fn size(&self) -> u64 {
        self.children.iter().map(|c| c.size()).sum()
    }
}

let root = Folder {
    children: vec![
        Box::new(File { bytes: 100 }),
        Box::new(Folder {
            children: vec![Box::new(File { bytes: 200 })],
        }),
    ],
};
assert_eq!(root.size(), 300);`,
      },
      {
        lang: "F#",
        code: `// 再帰的な判別共用体がCompositeを最も自然に表現する
type Node =
    | File of bytes: int64
    | Folder of children: Node list

let rec size = function
    | File bytes -> bytes
    | Folder children -> children |> List.sumBy size

let root =
    Folder [
        File 100L
        Folder [ File 200L ]  // フォルダの中にフォルダ
    ]

size root // 300L`,
      },
      {
        lang: "Kotlin",
        code: `interface Node {
    fun size(): Long
}

class File(private val bytes: Long) : Node {
    override fun size() = bytes
}

class Folder : Node {
    private val children = mutableListOf<Node>()
    fun add(node: Node) { children += node }
    override fun size() = children.sumOf { it.size() }
}

val root = Folder().apply {
    add(File(100))
    add(Folder().apply { add(File(200)) })
}
root.size() // 300`,
      },
      {
        lang: "TypeScript",
        code: `interface Node {
  size(): number;
}

class File implements Node {
  constructor(private bytes: number) {}
  size() { return this.bytes; }
}

class Folder implements Node {
  private children: Node[] = [];
  add(node: Node) { this.children.push(node); }
  size() {
    return this.children.reduce((sum, c) => sum + c.size(), 0);
  }
}`,
      },
    ],
    domain: {
      text: "企業の組織図はCompositeの好例です。従業員(Leaf)と部門(Composite)を同じOrgUnitとして扱えば、「本社全体の人数」「営業本部の人件費合計」を同じメソッドで再帰的に集計できます。",
      code: `interface OrgUnit {
  headcount(): number;
  totalSalary(): number;
}

// Leaf: 従業員
class Employee implements OrgUnit {
  constructor(public name: string, private salary: number) {}
  headcount() { return 1; }
  totalSalary() { return this.salary; }
}

// Composite: 部門(従業員も子部門も持てる)
class Department implements OrgUnit {
  private members: OrgUnit[] = [];
  constructor(public name: string) {}
  add(unit: OrgUnit) { this.members.push(unit); }
  headcount() {
    return this.members.reduce((s, m) => s + m.headcount(), 0);
  }
  totalSalary() {
    return this.members.reduce((s, m) => s + m.totalSalary(), 0);
  }
}

const sales = new Department("営業本部");
sales.add(new Employee("佐藤", 6_000_000));
const salesEast = new Department("東日本営業部");
salesEast.add(new Employee("鈴木", 5_000_000));
sales.add(salesEast);  // 部門の中に部門

sales.headcount();    // 2 — 個人も部門も同じように数えられる
sales.totalSalary();  // 11,000,000`,
    },
  },

  "factory-method": {
    title: "Factory Methodパターン",
    what: "オブジェクト生成のためのメソッド(Factory Method)をインターフェースとして定義し、「どの具象クラスをインスタンス化するか」の決定をサブクラスに委ねる生成パターンです。共通の処理フローは親クラスに置いたまま、生成する部品だけをサブクラスで差し替えられます。",
    apply: {
      text: "ダイアログの表示処理は親クラスで共通化し、「どのボタンを作るか」だけをサブクラスが決めます。",
      code: `interface Button {
  render(): void;
}
class DarkButton implements Button {
  render() { /* ダークテーマで描画 */ }
}
class LightButton implements Button {
  render() { /* ライトテーマで描画 */ }
}

abstract class Dialog {
  // Factory Method: どのボタンを作るかはサブクラスが決める
  protected abstract createButton(): Button;

  show() {                       // 共通の処理フロー
    const button = this.createButton();
    button.render();
  }
}

class DarkDialog extends Dialog {
  protected createButton() { return new DarkButton(); }
}
class LightDialog extends Dialog {
  protected createButton() { return new LightButton(); }
}`,
    },
    benefits: "・利用側・共通処理側が具象クラス名(new)から切り離される\n・新しい種類の生成物は「サブクラスの追加」だけで対応できる(OCP)\n・生成ロジック(引数の組み立てなど)が1箇所に集まる\n・テスト時は「テスト用部品を作るサブクラス」に差し替えられる",
    langExamples: [
      {
        lang: "Rust",
        code: `trait Button {
    fn render(&self);
}

struct DarkButton;
impl Button for DarkButton {
    fn render(&self) { /* ダークテーマで描画 */ }
}

trait Dialog {
    // Factory Method
    fn create_button(&self) -> Box<dyn Button>;

    // 共通の処理フロー(デフォルト実装)
    fn show(&self) {
        self.create_button().render();
    }
}

struct DarkDialog;
impl Dialog for DarkDialog {
    fn create_button(&self) -> Box<dyn Button> {
        Box::new(DarkButton)
    }
}`,
      },
      {
        lang: "F#",
        code: `type IButton =
    abstract Render: unit -> unit

type DarkButton() =
    interface IButton with
        member _.Render() = () // ダークテーマで描画

[<AbstractClass>]
type Dialog() =
    // Factory Method
    abstract CreateButton: unit -> IButton
    // 共通の処理フロー
    member this.Show() = this.CreateButton().Render()

type DarkDialog() =
    inherit Dialog()
    override _.CreateButton() = DarkButton() :> IButton`,
      },
      {
        lang: "Kotlin",
        code: `interface Button {
    fun render()
}

class DarkButton : Button {
    override fun render() { /* ダークテーマで描画 */ }
}

abstract class Dialog {
    // Factory Method
    protected abstract fun createButton(): Button

    fun show() {              // 共通の処理フロー
        createButton().render()
    }
}

class DarkDialog : Dialog() {
    override fun createButton() = DarkButton()
}`,
      },
      {
        lang: "TypeScript",
        code: `interface Button {
  render(): void;
}
class DarkButton implements Button {
  render() { /* ダークテーマで描画 */ }
}

abstract class Dialog {
  protected abstract createButton(): Button;  // Factory Method

  show() {
    this.createButton().render();
  }
}

class DarkDialog extends Dialog {
  protected createButton() { return new DarkButton(); }
}`,
      },
    ],
    domain: {
      text: "取引所ごとに決算・株価フィードのフォーマット(東証はCSV、NASDAQはJSON…)が違います。取り込みフローは共通のまま、「どのParserを作るか」だけを取引所ごとのサブクラスに委ねます。",
      code: `interface FeedParser {
  parse(raw: string): Company[];
}
class TseCsvParser implements FeedParser { /* 東証CSV形式 */ }
class NasdaqJsonParser implements FeedParser { /* NASDAQ JSON形式 */ }

abstract class FeedImporter {
  // Factory Method: どのParserを使うかはサブクラスが決める
  protected abstract createParser(): FeedParser;

  // 取り込みフローは全取引所で共通
  import(raw: string): Company[] {
    const companies = this.createParser().parse(raw);
    this.validate(companies);
    return companies;
  }
  private validate(companies: Company[]) { /* 共通の検証 */ }
}

class TseImporter extends FeedImporter {
  protected createParser() { return new TseCsvParser(); }
}
class NasdaqImporter extends FeedImporter {
  protected createParser() { return new NasdaqJsonParser(); }
}
// ロンドン証取対応も「Parser+Importerの追加」だけで済む`,
    },
  },

  "builder": {
    title: "Builderパターン",
    what: "複雑なオブジェクトの組み立て手順と表現を分離し、メソッドチェーンなどで段階的に構築できるようにする生成パターンです。引数が多い・省略可能な項目が多い・組み立てに順序や検証があるオブジェクトで威力を発揮します。「引数が5個も6個も並ぶコンストラクタ(telescoping constructor)」の解消策としても定番です。",
    apply: {
      text: "省略可能な設定が多いHTTPリクエストを、必要な項目だけをメソッドチェーンで指定して構築します。",
      code: `class HttpRequest {
  constructor(
    public url: string,
    public method: string,
    public timeoutMs: number,
  ) {}
}

class HttpRequestBuilder {
  private method = "GET";        // デフォルト値
  private timeoutMs = 3000;

  constructor(private url: string) {}

  withMethod(m: string) { this.method = m; return this; }
  withTimeout(ms: number) { this.timeoutMs = ms; return this; }

  build(): HttpRequest {
    return new HttpRequest(this.url, this.method, this.timeoutMs);
  }
}

// 必要な項目だけを、読みやすい順序で指定できる
const req = new HttpRequestBuilder("https://example.com")
  .withMethod("POST")
  .build();`,
    },
    benefits: "・引数の多いコンストラクタが消え、何を設定しているかが名前で分かる\n・省略可能な項目はデフォルト値に任せ、必要なものだけ指定できる\n・build()時にまとめて検証でき、不完全なオブジェクトの存在を防げる\n・同じ構築手順から異なる表現(HTML版/PDF版など)を作り分けられる",
    langExamples: [
      {
        lang: "Rust",
        code: `struct HttpRequest {
    url: String,
    method: String,
    timeout_ms: u32,
}

struct HttpRequestBuilder {
    url: String,
    method: String,
    timeout_ms: u32,
}
impl HttpRequestBuilder {
    fn new(url: &str) -> Self {
        Self { url: url.into(), method: "GET".into(), timeout_ms: 3000 }
    }
    fn method(mut self, m: &str) -> Self {
        self.method = m.into();
        self
    }
    fn build(self) -> HttpRequest {
        HttpRequest {
            url: self.url,
            method: self.method,
            timeout_ms: self.timeout_ms,
        }
    }
}

let req = HttpRequestBuilder::new("https://example.com")
    .method("POST")
    .build();`,
      },
      {
        lang: "F#",
        code: `type HttpRequest = {
    Url: string
    Method: string
    TimeoutMs: int
}

module HttpRequest =
    let defaults = { Url = ""; Method = "GET"; TimeoutMs = 3000 }

// F#ではレコードのcopy-and-update式が
// Builderの役割を簡潔に果たす
let req =
    { HttpRequest.defaults with
        Url = "https://example.com"
        Method = "POST" }`,
      },
      {
        lang: "Kotlin",
        code: `class HttpRequest private constructor(
    val url: String,
    val method: String,
    val timeoutMs: Int,
) {
    class Builder(private val url: String) {
        private var method = "GET"
        private var timeoutMs = 3000

        fun method(m: String) = apply { method = m }
        fun timeoutMs(t: Int) = apply { timeoutMs = t }
        fun build() = HttpRequest(url, method, timeoutMs)
    }
}

val req = HttpRequest.Builder("https://example.com")
    .method("POST")
    .build()

// なおKotlinでは名前付き引数+デフォルト値でも
// 同じ目的を果たせることが多い`,
      },
      {
        lang: "TypeScript",
        code: `class HttpRequestBuilder {
  private method = "GET";
  private timeoutMs = 3000;

  constructor(private url: string) {}

  withMethod(m: string) { this.method = m; return this; }
  withTimeout(ms: number) { this.timeoutMs = ms; return this; }

  build() {
    return { url: this.url, method: this.method, timeoutMs: this.timeoutMs };
  }
}

const req = new HttpRequestBuilder("https://example.com")
  .withMethod("POST")
  .build();`,
      },
    ],
    domain: {
      text: "企業スクリーニング(条件を組み合わせた企業検索)は、業種・時価総額・従業員数・地域など条件が多く、すべて省略可能です。Builderなら必要な条件だけを読みやすく積み上げ、build()時に矛盾を検証できます。",
      code: `class CompanyQueryBuilder {
  private conditions: ((c: Company) => boolean)[] = [];

  industry(name: string) {
    this.conditions.push(c => c.industry === name);
    return this;
  }
  marketCapAtLeast(min: number) {
    this.conditions.push(c => c.marketCap >= min);
    return this;
  }
  employeesBetween(min: number, max: number) {
    if (min > max) throw new Error("従業員数の範囲が不正");
    this.conditions.push(
      c => c.employees.length >= min && c.employees.length <= max,
    );
    return this;
  }

  build(): (c: Company) => boolean {
    const conds = this.conditions;
    return c => conds.every(cond => cond(c));
  }
}

// 「半導体業種で、時価総額1000億円以上、従業員1000〜5万人」
const query = new CompanyQueryBuilder()
  .industry("半導体")
  .marketCapAtLeast(100_000_000_000)
  .employeesBetween(1_000, 50_000)
  .build();

const matched = allCompanies.filter(query);`,
    },
  },

  "proxy": {
    title: "Proxyパターン",
    what: "本物のオブジェクト(RealSubject)と同じインターフェースを持つ代理オブジェクト(Proxy)を立て、アクセスを仲介する構造パターンです。代理の中で遅延初期化(仮想Proxy)、アクセス制御(保護Proxy)、キャッシュ、リモート通信の隠蔽などを差し込めます。Decoratorと構造は似ていますが、目的が「機能追加」ではなく「アクセスの制御・仲介」である点が異なります。",
    apply: {
      text: "本物のAPIと同じインターフェースを持つProxyが、キャッシュを使ってアクセスを仲介します。利用側はProxyか本物かを区別できません。",
      code: `interface Api {
  fetch(key: string): string;
}

class RealApi implements Api {
  fetch(key: string) { /* 実際の通信(遅い・高い) */ return "..."; }
}

// 本物と同じインターフェースの代理人がアクセスを仲介
class CachingProxy implements Api {
  private cache = new Map<string, string>();
  constructor(private real: RealApi) {}

  fetch(key: string) {
    if (!this.cache.has(key)) {
      this.cache.set(key, this.real.fetch(key)); // 必要な時だけ本物へ
    }
    return this.cache.get(key)!;
  }
}

const api: Api = new CachingProxy(new RealApi());`,
    },
    benefits: "・重い初期化や通信を「本当に必要になるまで」遅延できる\n・アクセス権のチェックを本体から分離して差し込める\n・キャッシュにより高価な呼び出し(課金API等)を節約できる\n・利用側は本物と同じインターフェースなので、Proxyの有無を意識しない",
    langExamples: [
      {
        lang: "Rust",
        code: `use std::collections::HashMap;

trait Api {
    fn fetch(&mut self, key: &str) -> String;
}

struct RealApi;
impl Api for RealApi {
    fn fetch(&mut self, _key: &str) -> String {
        "...".into() // 実際の通信
    }
}

struct CachingProxy {
    real: RealApi,
    cache: HashMap<String, String>,
}
impl Api for CachingProxy {
    fn fetch(&mut self, key: &str) -> String {
        if !self.cache.contains_key(key) {
            let v = self.real.fetch(key);
            self.cache.insert(key.into(), v);
        }
        self.cache[key].clone()
    }
}`,
      },
      {
        lang: "F#",
        code: `type IApi =
    abstract Fetch: string -> string

type RealApi() =
    interface IApi with
        member _.Fetch _key = "..." // 実際の通信

type CachingProxy(real: IApi) =
    let cache = System.Collections.Generic.Dictionary<string, string>()
    interface IApi with
        member _.Fetch key =
            match cache.TryGetValue key with
            | true, v -> v
            | _ ->
                let v = real.Fetch key
                cache[key] <- v
                v

let api: IApi = CachingProxy(RealApi())`,
      },
      {
        lang: "Kotlin",
        code: `interface Api {
    fun fetch(key: String): String
}

class RealApi : Api {
    override fun fetch(key: String) = "..." // 実際の通信
}

class CachingProxy(private val real: Api) : Api {
    private val cache = mutableMapOf<String, String>()
    override fun fetch(key: String) =
        cache.getOrPut(key) { real.fetch(key) }
}

val api: Api = CachingProxy(RealApi())

// なおKotlinには by による委譲の言語サポートもある:
// class LoggingApi(private val real: Api) : Api by real`,
      },
      {
        lang: "TypeScript",
        code: `interface Api {
  fetch(key: string): string;
}

class RealApi implements Api {
  fetch(key: string) { return "..."; } // 実際の通信
}

class CachingProxy implements Api {
  private cache = new Map<string, string>();
  constructor(private real: Api) {}
  fetch(key: string) {
    if (!this.cache.has(key)) {
      this.cache.set(key, this.real.fetch(key));
    }
    return this.cache.get(key)!;
  }
}

// JSには汎用のProxyオブジェクトも組み込まれている
// (new Proxy(target, handler))`,
      },
    ],
    domain: {
      text: "従量課金の外部財務データAPIの前にProxyを立てると、「有料プラン契約者(従業員の権限)のみアクセス可能」というアクセス制御と、「同じ企業の照会はキャッシュで済ませて課金を節約」というキャッシュを、本体を変えずに差し込めます。",
      code: `interface FinancialsApi {
  getStatement(company: Company): Statement;
}

// 従量課金の外部API(1回の呼び出しごとに課金される)
class PaidVendorApi implements FinancialsApi {
  getStatement(company: Company): Statement { /* 実通信 */ }
}

class FinancialsProxy implements FinancialsApi {
  private cache = new Map<string, Statement>();
  constructor(
    private real: FinancialsApi,
    private user: Employee,      // 利用する従業員
  ) {}

  getStatement(company: Company): Statement {
    // 保護Proxy: 権限のない従業員は本物に到達できない
    if (!this.user.hasPaidPlan) {
      throw new Error("財務データの閲覧には有料プランが必要です");
    }
    // キャッシュProxy: 課金APIの呼び出しを節約
    if (!this.cache.has(company.code)) {
      this.cache.set(company.code, this.real.getStatement(company));
    }
    return this.cache.get(company.code)!;
  }
}

// 画面側はFinancialsApiしか知らないので、Proxyの存在は透過的
const api: FinancialsApi = new FinancialsProxy(new PaidVendorApi(), analyst);`,
    },
  },

  "chain-of-responsibility": {
    title: "Chain of Responsibilityパターン",
    what: "リクエストを処理できるオブジェクトが見つかるまで、複数のハンドラを鎖(チェーン)のように順番にたどっていく振る舞いパターンです。送信者は「誰が処理するか」を知る必要がなく、各ハンドラは「自分で処理する」か「次に回す」かだけを判断します。Webフレームワークのミドルウェアや、承認フロー、イベントのバブリングなどに使われています。",
    apply: {
      text: "各ハンドラが「自分の限度内なら処理、超えるなら次へ回す」を繰り返す承認チェーンを作ります。",
      code: `class Approver {
  constructor(
    private title: string,
    private limit: number,
    private next?: Approver,   // 鎖の次のハンドラ
  ) {}

  approve(amount: number): string {
    if (amount <= this.limit) {
      return this.title + "が承認";   // 自分で処理できる
    }
    if (this.next) {
      return this.next.approve(amount); // 次のハンドラへ回す
    }
    return "承認者なし";
  }
}

const chain = new Approver("担当者", 10_000,
              new Approver("課長", 100_000,
              new Approver("部長", 1_000_000)));

chain.approve(50_000); // "課長が承認"`,
    },
    benefits: "・送信者と処理者が疎結合になる(送信者はチェーンの先頭しか知らない)\n・ハンドラの追加・削除・並び替えが実行時に柔軟にできる\n・各ハンドラは自分の判断だけに集中でき、責務が小さくなる(SRP)\n・巨大なif-else連鎖を、独立したハンドラの列に分解できる",
    langExamples: [
      {
        lang: "Rust",
        code: `struct Approver {
    title: &'static str,
    limit: u64,
    next: Option<Box<Approver>>,
}

impl Approver {
    fn approve(&self, amount: u64) -> String {
        if amount <= self.limit {
            format!("{}が承認", self.title)
        } else if let Some(next) = &self.next {
            next.approve(amount)   // 次のハンドラへ回す
        } else {
            "承認者なし".into()
        }
    }
}

let chain = Approver {
    title: "担当者", limit: 10_000,
    next: Some(Box::new(Approver {
        title: "課長", limit: 100_000, next: None,
    })),
};`,
      },
      {
        lang: "F#",
        code: `type Approver = {
    Title: string
    Limit: decimal
    Next: Approver option
}

let rec approve approver amount =
    if amount <= approver.Limit then
        $"{approver.Title}が承認"
    else
        match approver.Next with
        | Some next -> approve next amount  // 次のハンドラへ
        | None -> "承認者なし"

let chain =
    { Title = "担当者"; Limit = 10_000m
      Next = Some { Title = "課長"; Limit = 100_000m; Next = None } }

approve chain 50_000m // "課長が承認"`,
      },
      {
        lang: "Kotlin",
        code: `class Approver(
    private val title: String,
    private val limit: Long,
    private val next: Approver? = null,
) {
    fun approve(amount: Long): String = when {
        amount <= this.limit -> "${"$"}{title}が承認"
        next != null         -> next.approve(amount)
        else                 -> "承認者なし"
    }
}

val chain = Approver("担当者", 10_000,
            Approver("課長", 100_000,
            Approver("部長", 1_000_000)))

chain.approve(50_000) // "課長が承認"`,
      },
      {
        lang: "TypeScript",
        code: `class Approver {
  constructor(
    private title: string,
    private limit: number,
    private next?: Approver,
  ) {}

  approve(amount: number): string {
    if (amount <= this.limit) return this.title + "が承認";
    if (this.next) return this.next.approve(amount);
    return "承認者なし";
  }
}

const chain = new Approver("担当者", 10_000,
              new Approver("課長", 100_000,
              new Approver("部長", 1_000_000)));`,
      },
    ],
    domain: {
      text: "企業内の経費・投資の承認フローはChainそのものです。金額に応じて担当者→部長→CFOと承認権限を持つ従業員をたどります。組織変更で承認段階が増えても、チェーンの組み替えだけで対応できます。",
      code: `class ApprovalHandler {
  constructor(
    private approver: Employee,   // 承認権限を持つ従業員
    private limit: number,        // この従業員の承認限度額
    private next?: ApprovalHandler,
  ) {}

  request(company: Company, amount: number): string {
    if (amount <= this.limit) {
      return company.name + "への投資" + amount + "円を "
        + this.approver.name + "(" + this.approver.title + ")が承認";
    }
    if (this.next) {
      return this.next.request(company, amount); // 上位承認者へ
    }
    return "取締役会の決議が必要";
  }
}

// 担当者(10万) → 部長(1000万) → CFO(10億) の承認チェーン
const chain = new ApprovalHandler(tanaka, 100_000,
              new ApprovalHandler(suzuki, 10_000_000,
              new ApprovalHandler(cfo, 1_000_000_000)));

chain.request(startupA, 5_000_000);
// → "スタートアップAへの投資5000000円を 鈴木(部長)が承認"`,
    },
  },

  "abstract-factory": {
    title: "Abstract Factoryパターン",
    what: "関連するオブジェクト群(部品ファミリー)を、具象クラスを指定せずにまとめて生成するインターフェースを提供する生成パターンです。「Windows用UI部品一式/Mac用UI部品一式」のように、一貫性が必要な部品セットを丸ごと切り替えられます。Factory Methodが「1種類の生成」をサブクラスに委ねるのに対し、Abstract Factoryは「複数種類の生成」を1つのファクトリにまとめます。",
    apply: {
      text: "ButtonとCheckboxという部品ファミリーを、テーマごとのFactoryがまとめて生成します。部品の組み合わせがちぐはぐになりません。",
      code: `interface Button   { render(): void; }
interface Checkbox { render(): void; }

// 部品ファミリーをまとめて生成するインターフェース
interface GuiFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class DarkFactory implements GuiFactory {
  createButton()   { return new DarkButton(); }
  createCheckbox() { return new DarkCheckbox(); }
}
class LightFactory implements GuiFactory {
  createButton()   { return new LightButton(); }
  createCheckbox() { return new LightCheckbox(); }
}

// 利用側はどのテーマか知らずに、一貫した部品一式を使える
function buildForm(factory: GuiFactory) {
  factory.createButton().render();
  factory.createCheckbox().render();
}`,
    },
    benefits: "・部品同士の組み合わせの一貫性が保証される(ダークButton+ライトCheckboxのような混在を防ぐ)\n・ファミリーの切り替えがFactory1つの差し替えで済む\n・利用側コードが具象クラスから完全に分離される(DIP)\n・新しいファミリーの追加は「Factory+部品の追加」だけ(OCP)",
    langExamples: [
      {
        lang: "Rust",
        code: `trait Button { fn render(&self); }
trait Checkbox { fn render(&self); }

struct DarkButton;
impl Button for DarkButton { fn render(&self) {} }
struct DarkCheckbox;
impl Checkbox for DarkCheckbox { fn render(&self) {} }

// 部品ファミリーをまとめて生成するトレイト
trait GuiFactory {
    fn create_button(&self) -> Box<dyn Button>;
    fn create_checkbox(&self) -> Box<dyn Checkbox>;
}

struct DarkFactory;
impl GuiFactory for DarkFactory {
    fn create_button(&self) -> Box<dyn Button> {
        Box::new(DarkButton)
    }
    fn create_checkbox(&self) -> Box<dyn Checkbox> {
        Box::new(DarkCheckbox)
    }
}`,
      },
      {
        lang: "F#",
        code: `type IButton = abstract Render: unit -> unit
type ICheckbox = abstract Render: unit -> unit

type IGuiFactory =
    abstract CreateButton: unit -> IButton
    abstract CreateCheckbox: unit -> ICheckbox

type DarkButton() =
    interface IButton with member _.Render() = ()
type DarkCheckbox() =
    interface ICheckbox with member _.Render() = ()

type DarkFactory() =
    interface IGuiFactory with
        member _.CreateButton() = DarkButton() :> IButton
        member _.CreateCheckbox() = DarkCheckbox() :> ICheckbox

let buildForm (factory: IGuiFactory) =
    factory.CreateButton().Render()
    factory.CreateCheckbox().Render()`,
      },
      {
        lang: "Kotlin",
        code: `interface Button { fun render() }
interface Checkbox { fun render() }

class DarkButton : Button { override fun render() {} }
class DarkCheckbox : Checkbox { override fun render() {} }

interface GuiFactory {
    fun createButton(): Button
    fun createCheckbox(): Checkbox
}

class DarkFactory : GuiFactory {
    override fun createButton() = DarkButton()
    override fun createCheckbox() = DarkCheckbox()
}

fun buildForm(factory: GuiFactory) {
    factory.createButton().render()
    factory.createCheckbox().render()
}`,
      },
      {
        lang: "TypeScript",
        code: `interface Button   { render(): void; }
interface Checkbox { render(): void; }

interface GuiFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class DarkFactory implements GuiFactory {
  createButton()   { return new DarkButton(); }
  createCheckbox() { return new DarkCheckbox(); }
}

function buildForm(factory: GuiFactory) {
  factory.createButton().render();
  factory.createCheckbox().render();
}`,
      },
    ],
    domain: {
      text: "市場(日本市場/米国市場)ごとに、株価の取得方法・営業日カレンダー・通貨表示がセットで異なります。市場ごとのFactoryが一貫した部品一式を生成すれば、「東証の株価をドル表示してしまう」ようなちぐはぐを防げます。",
      code: `interface PriceProvider   { latest(code: string): number; }
interface TradingCalendar { isOpen(date: Date): boolean; }
interface MoneyFormatter  { format(amount: number): string; }

// 市場ごとの部品ファミリーをまとめて生成する
interface MarketFactory {
  createPriceProvider(): PriceProvider;
  createCalendar(): TradingCalendar;
  createFormatter(): MoneyFormatter;
}

class TokyoMarketFactory implements MarketFactory {
  createPriceProvider() { return new TsePriceProvider(); }
  createCalendar()      { return new JpxCalendar(); }
  createFormatter()     { return new JpyFormatter(); }  // ¥表示
}
class UsMarketFactory implements MarketFactory {
  createPriceProvider() { return new NasdaqPriceProvider(); }
  createCalendar()      { return new NyseCalendar(); }
  createFormatter()     { return new UsdFormatter(); }  // $表示
}

// ダッシュボードはどの市場かを知らずに、一貫した部品で動く
function buildDashboard(factory: MarketFactory, company: Company) {
  const price = factory.createPriceProvider().latest(company.code);
  return factory.createFormatter().format(price);
}`,
    },
  },

  // ===================================================
  // クリーンアーキテクチャ
  // ===================================================
  "clean-arch-overview": {
    title: "クリーンアーキテクチャ(全体像)",
    what: "クリーンアーキテクチャは、Robert C. Martinが提唱した、ビジネスルールをフレームワーク・DB・UIなどの「詳細」から独立させるアーキテクチャ指針です。同心円で表され、内側から エンティティ → ユースケース → インターフェースアダプター → フレームワーク&ドライバー の4層が基本形です。内側ほど抽象度が高く安定し、外側ほど具体的で変わりやすいものを置きます。ヘキサゴナル(ポート&アダプター)やオニオンアーキテクチャと狙いは共通です。",
    apply: {
      text: "「Webフレームワークの中にビジネスロジックを書く」構成を、レイヤーごとに分離した構成に変えます。",
      code: `// ❌ Before: ルーティング関数の中に全部入り
app.post("/hire", async (req, res) => {
  if (req.body.salary < 0) return res.status(400).send();
  await db.query("INSERT INTO employees ...", [req.body.name]);
  res.json({ ok: true });
  // 業務ルール・SQL・HTTPが混ざり、テストにはWebとDBが必要
});

// ✅ After: 同心円のレイヤーに分離
// [エンティティ] 最重要ルール(何にも依存しない)
class Employee {
  constructor(public name: string, public salary: number) {
    if (salary < 0) throw new Error("給与は0未満にできない");
  }
}
// [ユースケース] アプリ固有の手順(内側と自層の抽象のみ参照)
class HireEmployee {
  constructor(private repo: EmployeeRepository) {}
  async run(name: string, salary: number) {
    await this.repo.save(new Employee(name, salary));
  }
}
// [アダプター] HTTP形式 ⇔ ユースケース形式の変換
// [詳細] Express・DBドライバは最外周で組み立てる`,
    },
    benefits: "・重要なビジネスルールがUI・DB・フレームワークの変更に巻き込まれない\n・エンティティとユースケースを、Web/DBなしの高速なテストで検証できる\n・「どのDBを使うか」などの決定を遅らせられる(詳細は後から差し替え可能)\n・レイヤーごとに関心が分かれ、どこに何を書くべきかの共通言語ができる",
    langExamples: [
      {
        lang: "Rust",
        code: `// エンティティ: 何にも依存しない
struct Employee {
    name: String,
    salary: u64,
}

// ユースケース層が所有するポート(抽象)
trait EmployeeRepository {
    fn save(&self, employee: &Employee);
}

// ユースケース: エンティティとポートだけを知る
struct HireEmployee<R: EmployeeRepository> {
    repo: R,
}
impl<R: EmployeeRepository> HireEmployee<R> {
    fn run(&self, name: &str, salary: u64) {
        let employee = Employee {
            name: name.into(),
            salary,
        };
        self.repo.save(&employee);
    }
}
// DB実装(impl EmployeeRepository for PostgresRepo)は外側の層に置く`,
      },
      {
        lang: "F#",
        code: `// エンティティ: 純粋なレコードとルール
type Employee = { Name: string; Salary: int64 }

// ユースケース層が所有するポート
type IEmployeeRepository =
    abstract Save: Employee -> unit

// ユースケース: 内側と自層の抽象だけを参照する
type HireEmployee(repo: IEmployeeRepository) =
    member _.Run(name, salary) =
        if salary < 0L then invalidArg "salary" "給与は0未満にできない"
        repo.Save { Name = name; Salary = salary }

// DB実装・Webハンドラは外側で組み立てる(関数注入でも可)`,
      },
      {
        lang: "Kotlin",
        code: `// エンティティ: フレームワーク非依存
class Employee(val name: String, val salary: Long) {
    init { require(salary >= 0) { "給与は0未満にできない" } }
}

// ユースケース層が所有するポート
interface EmployeeRepository {
    fun save(employee: Employee)
}

// ユースケース: エンティティとポートだけを知る
class HireEmployee(private val repo: EmployeeRepository) {
    fun run(name: String, salary: Long) {
        repo.save(Employee(name, salary))
    }
}
// Spring等のフレームワークやDB実装は最外周のモジュールに置く`,
      },
      {
        lang: "TypeScript",
        code: `// エンティティ: 何にも依存しない
class Employee {
  constructor(public name: string, public salary: number) {
    if (salary < 0) throw new Error("給与は0未満にできない");
  }
}

// ユースケース層が所有するポート
interface EmployeeRepository {
  save(employee: Employee): Promise<void>;
}

// ユースケース: エンティティとポートだけを知る
class HireEmployee {
  constructor(private repo: EmployeeRepository) {}
  async run(name: string, salary: number) {
    await this.repo.save(new Employee(name, salary));
  }
}
// Express・Prisma等は最外周で接続する`,
    },
    ],
    domain: {
      text: "企業・従業員を扱う経済情報アプリを4層に整理した例です。各レイヤーの役割と置くものが一目で分かるように、依存の向き(→は「参照する」)も添えています。",
      code: `// [1. エンティティ] 企業横断の最重要ルール(依存なし)
//   Company, Employee, 「給与は0未満にできない」等の業務ルール
class Company {
  private employees: Employee[] = [];
  hire(e: Employee) {
    if (this.employees.length >= 10_000) {
      throw new Error("雇用上限を超過");  // 業務ルール
    }
    this.employees.push(e);
  }
}

// [2. ユースケース] アプリ固有の手順(→ エンティティ)
//   「企業に従業員を雇用する」「決算レポートを出す」
//   + 自層で定義するポート: CompanyRepository, ReportOutput

// [3. インターフェースアダプター] 形式の変換(→ ユースケース)
//   HireController: HTTPリクエスト → ユースケースの入力へ変換
//   CompanyGateway: ポートを実装し、SQLの結果 ⇔ エンティティを変換

// [4. フレームワーク&ドライバー] 詳細(→ アダプター)
//   Express / PostgreSQL / React などの道具と起動・配線コード

// 依存はつねに 4 → 3 → 2 → 1 の内向きだけ。
// 「DBを乗り換える」変更は3と4だけで完結し、1と2は無傷で済む`,
    },
  },

  "dependency-rule": {
    title: "依存性のルール",
    what: "依存性のルール(The Dependency Rule)は、クリーンアーキテクチャで唯一の絶対ルールです。「ソースコードの依存は、内側(抽象度の高い方)にのみ向かってよい」——内側の円は、外側の円に定義された名前(クラス・関数・変数)を一切参照してはいけません。内側が外側の機能(DB保存など)を必要とする場合は、内側がインターフェース(ポート)を定義し、外側が実装します(SOLIDのDIP)。実行時の制御が外へ流れても、ソースコードの依存は内向きのまま保てます。",
    apply: {
      text: "ユースケースがDBライブラリを直接importしている違反状態を、ポート(内側が所有する抽象)+実装(外側)に分離します。",
      code: `// ❌ Before: 内側(ユースケース)が外側(DBライブラリ)に依存
import { MySqlClient } from "mysql-driver";  // 依存が外向き!

class HireEmployee {
  private db = new MySqlClient("mysql://...");
  async run(name: string) {
    await this.db.query("INSERT INTO employees ...", [name]);
  }
}

// ✅ After: 内側がポートを定義し、外側が実装する
// --- ユースケース層(内側) ---
interface EmployeeRepository {          // 内側が所有する抽象
  save(employee: Employee): Promise<void>;
}
class HireEmployee {
  constructor(private repo: EmployeeRepository) {}
  async run(name: string, salary: number) {
    await this.repo.save(new Employee(name, salary));
  }
}

// --- インフラ層(外側) ---
import { MySqlClient } from "mysql-driver"; // 外側ならOK
class MySqlEmployeeRepository implements EmployeeRepository {
  async save(e: Employee) { /* INSERT文を発行 */ }
}
// 依存の向き: 外側(MySql実装) → 内側(ポート)。ルール遵守`,
    },
    benefits: "・外側(DB・フレームワーク)の変更が内側の重要なコードに波及しない\n・内側だけを取り出してテストできる(外側はモックに差し替え)\n・「この import は内向きか?」というシンプルな基準でレビューできる\n・実装の乗り換え(MySQL→PostgreSQL)が外側の差し替えだけで済む",
    langExamples: [
      {
        lang: "Rust",
        code: `// 内側のクレート(モジュール): ポートを所有
mod usecase {
    pub trait EmployeeRepository {
        fn save(&self, name: &str);
    }

    pub struct HireEmployee<R: EmployeeRepository> {
        pub repo: R,
    }
    impl<R: EmployeeRepository> HireEmployee<R> {
        pub fn run(&self, name: &str) {
            self.repo.save(name);
        }
    }
}

// 外側のモジュール: 内側のポートを実装する(依存は内向き)
mod infra {
    use super::usecase::EmployeeRepository;

    pub struct PostgresRepository;
    impl EmployeeRepository for PostgresRepository {
        fn save(&self, _name: &str) { /* SQL発行 */ }
    }
}`,
      },
      {
        lang: "F#",
        code: `// 内側: ポートの定義とユースケース
module UseCase =
    type IEmployeeRepository =
        abstract Save: name: string -> unit

    let hireEmployee (repo: IEmployeeRepository) name =
        repo.Save name

// 外側: 内側のポートを実装(依存は内向き)
module Infra =
    open UseCase

    type PostgresRepository() =
        interface IEmployeeRepository with
            member _.Save name = () // SQL発行

// F#はプロジェクト内でファイルの後方参照ができないため、
// 「内側を先に定義する」構造がコンパイラで強制される`,
      },
      {
        lang: "Kotlin",
        code: `// 内側のモジュール(usecase): ポートを所有
interface EmployeeRepository {
    fun save(name: String)
}

class HireEmployee(private val repo: EmployeeRepository) {
    fun run(name: String) = repo.save(name)
}

// 外側のモジュール(infra): 内側に依存して実装
class PostgresEmployeeRepository : EmployeeRepository {
    override fun save(name: String) { /* SQL発行 */ }
}

// Gradleのモジュール分割で「infra → usecase」の
// 一方向依存をビルドレベルで強制できる`,
      },
      {
        lang: "TypeScript",
        code: `// 内側(usecase/): ポートを所有
export interface EmployeeRepository {
  save(name: string): Promise<void>;
}

export class HireEmployee {
  constructor(private repo: EmployeeRepository) {}
  run(name: string) { return this.repo.save(name); }
}

// 外側(infra/): 内側のポートを実装(importは内向き)
import { EmployeeRepository } from "../usecase/ports";

export class PostgresEmployeeRepository implements EmployeeRepository {
  async save(name: string) { /* SQL発行 */ }
}

// ESLintのimportルールで「usecase/はinfra/を
// importできない」を機械的に強制できる`,
      },
    ],
    domain: {
      text: "「株価データの取得元を大手ベンダーAPIから取引所直結に乗り換える」というよくある変更を、依存性のルールが守られている場合とそうでない場合で比べます。",
      code: `// 内側(ユースケース層)が所有するポート
interface StockPriceProvider {
  latest(company: Company): Promise<number>;
}

// ユースケース: 従業員(アナリスト)向けのウォッチリスト評価
class EvaluateWatchList {
  constructor(private prices: StockPriceProvider) {}
  async run(companies: Company[]): Promise<number> {
    let total = 0;
    for (const c of companies) total += await this.prices.latest(c);
    return total;
  }
}

// 外側: ベンダーAPI実装(v1)
class VendorApiProvider implements StockPriceProvider {
  async latest(c: Company) { /* ベンダーSDK呼び出し */ return 0; }
}
// 外側: 取引所直結実装(v2)— 乗り換えはこのクラスを足すだけ
class ExchangeDirectProvider implements StockPriceProvider {
  async latest(c: Company) { /* 取引所プロトコル */ return 0; }
}

// 依存性のルールが守られていれば、
// EvaluateWatchList(内側)は乗り換えの前後で1文字も変わらない。
// 違反してベンダーSDKを直接importしていたら、全ユースケースを修正する羽目に`,
    },
  },

  "entities": {
    title: "エンティティ",
    what: "エンティティは同心円の最も内側に位置し、企業全体(アプリケーション横断)で通用する最重要ビジネスルールを持つ層です。「給与は0未満にできない」「約定は営業日にしか成立しない」のような、UIがWebでもCLIでも、DBが何であっても変わらないルールをオブジェクト(またはデータ構造+関数)として表現します。何にも依存しないため最も安定し、最も再利用しやすい層です。",
    apply: {
      text: "検証ロジックがControllerやDB層に散らばった状態から、ルールをエンティティ自身に集めます。",
      code: `// ❌ Before: 業務ルールがあちこちに散在
// controller.ts
if (req.body.salary < 0) return res.status(400).send();
// batch.ts(別の入口では検証を忘れている…)
db.insert("employees", { salary: csvRow.salary });

// ✅ After: ルールをエンティティに集約(壊れた状態を作れない)
class Employee {
  readonly name: string;
  readonly salary: number;

  constructor(name: string, salary: number) {
    if (name.trim() === "") throw new Error("氏名は必須");
    if (salary < 0) throw new Error("給与は0未満にできない");
    this.name = name;
    this.salary = salary;
  }

  withRaise(rate: number): Employee {
    if (rate > 0.2) throw new Error("昇給は1回20%まで");
    return new Employee(this.name, Math.round(this.salary * (1 + rate)));
  }
}
// Webから来てもCSVバッチから来ても、Employeeを通る限りルールが守られる`,
    },
    benefits: "・業務ルールが1箇所に集まり、入口(Web/バッチ/CLI)ごとの検証漏れがなくなる\n・何にも依存しないため、単体テストが最も簡単で高速\n・UI・DB・フレームワークをすべて捨てても生き残る、寿命の長いコードになる\n・ドメインの用語がそのままクラス名・メソッド名になり、仕様書代わりに読める",
    langExamples: [
      {
        lang: "Rust",
        code: `// コンストラクタ関数でルールを強制し、
// 不正な値のEmployeeを作れなくする
pub struct Employee {
    name: String,
    salary: u64, // u64型自体が「負の給与」を排除している
}

impl Employee {
    pub fn new(name: &str, salary: u64) -> Result<Self, String> {
        if name.trim().is_empty() {
            return Err("氏名は必須".into());
        }
        Ok(Self { name: name.into(), salary })
    }

    pub fn with_raise(&self, rate: f64) -> Result<Self, String> {
        if rate > 0.2 {
            return Err("昇給は1回20%まで".into());
        }
        let new_salary = (self.salary as f64 * (1.0 + rate)) as u64;
        Employee::new(&self.name, new_salary)
    }
}`,
      },
      {
        lang: "F#",
        code: `// privateコンストラクタ+スマートコンストラクタで
// 「不正なEmployeeは存在できない」を型で表現
type Employee = private { Name: string; Salary: int64 }

module Employee =
    let create name salary =
        if System.String.IsNullOrWhiteSpace name then
            Error "氏名は必須"
        elif salary < 0L then
            Error "給与は0未満にできない"
        else
            Ok { Name = name; Salary = salary }

    let withRaise rate employee =
        if rate > 0.2 then Error "昇給は1回20%まで"
        else
            let newSalary = float employee.Salary * (1.0 + rate)
            create employee.Name (int64 newSalary)`,
      },
      {
        lang: "Kotlin",
        code: `// initブロックでルールを強制する
class Employee(val name: String, val salary: Long) {
    init {
        require(name.isNotBlank()) { "氏名は必須" }
        require(salary >= 0) { "給与は0未満にできない" }
    }

    fun withRaise(rate: Double): Employee {
        require(rate <= 0.2) { "昇給は1回20%まで" }
        return Employee(name, (salary * (1 + rate)).toLong())
    }
}

// ORMアノテーションやSpring依存をこのクラスに
// 持ち込まないことが「内側を守る」ポイント`,
      },
      {
        lang: "TypeScript",
        code: `class Employee {
  readonly name: string;
  readonly salary: number;

  constructor(name: string, salary: number) {
    if (name.trim() === "") throw new Error("氏名は必須");
    if (salary < 0) throw new Error("給与は0未満にできない");
    this.name = name;
    this.salary = salary;
  }

  withRaise(rate: number): Employee {
    if (rate > 0.2) throw new Error("昇給は1回20%まで");
    return new Employee(
      this.name,
      Math.round(this.salary * (1 + rate)),
    );
  }
}`,
      },
    ],
    domain: {
      text: "企業(Company)エンティティに「上場企業の役員は2名以上」「従業員の雇用上限」といった業務ルールを持たせた例です。これらのルールはどんなUI・DBでも変わらない、アプリの核です。",
      code: `class Company {
  private employees: Employee[] = [];

  constructor(
    public readonly name: string,
    public readonly isListed: boolean,  // 上場企業か
  ) {}

  hire(e: Employee) {
    if (this.employees.length >= 10_000) {
      throw new Error("雇用上限(10,000名)を超過");
    }
    this.employees.push(e);
  }

  // 業務ルール: 上場企業は役員が2名以上必要
  canFileDisclosure(): boolean {
    const executives = this.employees.filter(e => e.isExecutive);
    return !this.isListed || executives.length >= 2;
  }

  totalPayroll(): number {
    return this.employees.reduce((s, e) => s + e.salary, 0);
  }
}

// このクラスはWebフレームワークもDBも知らないので、
// テストは new Company(...) して呼ぶだけ。1ミリ秒で終わる`,
    },
  },

  "usecases": {
    title: "ユースケース",
    what: "ユースケース層はエンティティの1つ外側にあり、「従業員を雇用する」「決算レポートを出力する」といったアプリケーション固有の操作手順(アプリケーションビジネスルール)を表現します。エンティティを取得し、業務ルールを実行させ、結果を保存・出力する——という指揮者の役割です。参照してよいのは内側(エンティティ)と、自層で定義した抽象(リポジトリや出力のポート)だけで、Web・DB・画面の詳細は知りません。",
    apply: {
      text: "「雇用する」という操作の手順をユースケースクラスに整理します。入出力はポート(抽象)経由にします。",
      code: `// ユースケース層で定義するポート(抽象)
interface CompanyRepository {
  find(id: string): Promise<Company>;
  save(company: Company): Promise<void>;
}

// ユースケース: 手順の指揮に徹する
class HireEmployeeUseCase {
  constructor(private companies: CompanyRepository) {}

  async run(input: { companyId: string; name: string; salary: number }) {
    // 1. エンティティを取得
    const company = await this.companies.find(input.companyId);
    // 2. 業務ルールはエンティティに実行させる
    const employee = new Employee(input.name, input.salary);
    company.hire(employee);
    // 3. ポート経由で保存(DBの種類は知らない)
    await this.companies.save(company);
    return { hired: employee.name };
  }
}
// HTTPのステータスコードもSQLも画面も、この層には登場しない`,
    },
    benefits: "・「このアプリに何ができるか」がユースケースクラスの一覧として見える化される\n・手順(ユースケース)とルール(エンティティ)が分離され、それぞれ単体でテストできる\n・同じユースケースをWeb・CLI・バッチなど複数の入口から再利用できる\n・詳細(DB・UI)の変更がユースケースに波及しない",
    langExamples: [
      {
        lang: "Rust",
        code: `pub trait CompanyRepository {
    fn find(&self, id: &str) -> Company;
    fn save(&self, company: &Company);
}

pub struct HireEmployee<R: CompanyRepository> {
    companies: R,
}

impl<R: CompanyRepository> HireEmployee<R> {
    pub fn run(&self, company_id: &str, name: &str, salary: u64) {
        let mut company = self.companies.find(company_id);
        let employee = Employee::new(name, salary).unwrap();
        company.hire(employee);        // ルールはエンティティが実行
        self.companies.save(&company); // 保存先の詳細は知らない
    }
}`,
      },
      {
        lang: "F#",
        code: `// 関数型スタイルでは、ユースケースは
// 「依存(関数)を受け取って手順を実行する関数」になる
type FindCompany = string -> Company
type SaveCompany = Company -> unit

let hireEmployee
    (find: FindCompany)
    (save: SaveCompany)
    companyId name salary =
    let company = find companyId
    match Employee.create name salary with
    | Ok employee ->
        company |> Company.hire employee |> save
        Ok employee
    | Error e -> Error e

// 部分適用で依存を注入して「実行可能なユースケース」を作る
// let hire = hireEmployee Postgres.find Postgres.save`,
      },
      {
        lang: "Kotlin",
        code: `interface CompanyRepository {
    fun find(id: String): Company
    fun save(company: Company)
}

class HireEmployeeUseCase(
    private val companies: CompanyRepository,
) {
    data class Input(val companyId: String, val name: String, val salary: Long)

    fun run(input: Input): String {
        val company = companies.find(input.companyId)
        val employee = Employee(input.name, input.salary)
        company.hire(employee)   // ルールはエンティティが実行
        companies.save(company)  // 保存先の詳細は知らない
        return employee.name
    }
}`,
      },
      {
        lang: "TypeScript",
        code: `interface CompanyRepository {
  find(id: string): Promise<Company>;
  save(company: Company): Promise<void>;
}

class HireEmployeeUseCase {
  constructor(private companies: CompanyRepository) {}

  async run(input: { companyId: string; name: string; salary: number }) {
    const company = await this.companies.find(input.companyId);
    const employee = new Employee(input.name, input.salary);
    company.hire(employee);
    await this.companies.save(company);
    return { hired: employee.name };
  }
}`,
      },
    ],
    domain: {
      text: "経済情報アプリのユースケース一覧のイメージです。ユースケース名がそのまま「アプリの機能一覧」になり、それぞれがエンティティとポートだけで完結します。",
      code: `// このアプリにできること = ユースケースの一覧
class HireEmployeeUseCase { /* 企業に従業員を雇用する */ }
class RaiseSalaryUseCase { /* 従業員を昇給させる(上限20%ルール) */ }
class GenerateEarningsReportUseCase { /* 企業の決算レポートを出す */ }
class ScreenCompaniesUseCase { /* 条件で企業を検索する */ }

// 例: 決算レポート出力
interface CompanyRepository { find(id: string): Promise<Company>; }
interface ReportOutput { emit(report: EarningsReport): void; } // 出力ポート

class GenerateEarningsReportUseCase {
  constructor(
    private companies: CompanyRepository,
    private output: ReportOutput,   // PDFかHTMLかは知らない
  ) {}

  async run(companyId: string) {
    const company = await this.companies.find(companyId);
    const report = EarningsReport.from(company); // エンティティのルールで生成
    this.output.emit(report);
  }
}

// 同じユースケースを、Web画面からも月次バッチからも呼び出せる。
// テストはインメモリのRepositoryと記録用Outputを渡すだけ`,
    },
  },

  "interface-adapters": {
    title: "インターフェースアダプター",
    what: "インターフェースアダプター層は、ユースケースの1つ外側で「形式の変換」を担当する層です。Controller(外の入力→ユースケースの入力へ変換)、Presenter(ユースケースの出力→画面向けのViewModelへ変換)、Gateway(ユースケースのポートを実装し、エンティティ⇔DBレコードを変換)が代表です。内側の形式と外側の形式が混ざらないよう、両者の翻訳者に徹します。",
    apply: {
      text: "HTTPの世界とユースケースの世界を、ControllerとPresenterが翻訳する形にします。",
      code: `// Controller: HTTP形式 → ユースケースの入力へ変換
class HireController {
  constructor(private useCase: HireEmployeeUseCase) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.useCase.run({
        companyId: req.params.id,        // HTTPの都合はここで吸収
        name: req.body.name,
        salary: Number(req.body.salary),
      });
      return { status: 201, body: result };
    } catch (e) {
      return { status: 400, body: { error: (e as Error).message } };
    }
  }
}

// Gateway: ユースケースのポートを実装し、形式を変換
class CompanyGateway implements CompanyRepository {
  async find(id: string): Promise<Company> {
    const row = await sql("SELECT ... WHERE id = ?", [id]);
    return new Company(row.name, row.is_listed === 1); // レコード→エンティティ
  }
  async save(company: Company) { /* エンティティ→レコード */ }
}`,
    },
    benefits: "・内側(ユースケース)がHTTPステータスやSQLの都合を知らずに済む\n・画面表示の変更(日付形式、通貨表示など)がPresenterの修正だけで完結する\n・DBスキーマとエンティティを独立に進化させられる(Gatewayが吸収)\n・変換ロジックが層として明示され、「どこで変換するか」に迷わない",
    langExamples: [
      {
        lang: "Rust",
        code: `// Gateway: ユースケースのポートを実装し、
// DBレコード ⇔ エンティティを変換する
struct EmployeeRow {
    name: String,
    salary_yen: i64, // DBの都合の型
}

struct EmployeeGateway;
impl EmployeeRepository for EmployeeGateway {
    fn save(&self, employee: &Employee) {
        let row = EmployeeRow {
            name: employee.name().to_string(),
            salary_yen: employee.salary() as i64,
        };
        // INSERT文を発行(SQLはこの層まで)
    }
}`,
      },
      {
        lang: "F#",
        code: `// Presenter: ユースケースの出力を表示用に変換
type ReportViewModel = {
    Title: string
    FormattedProfit: string  // "1,234百万円" のような表示形式
}

module ReportPresenter =
    let present (report: EarningsReport) =
        { Title = $"{report.CompanyName} 決算"
          FormattedProfit =
            report.Profit / 1_000_000L
            |> fun m -> $"%s{m.ToString(\"N0\")}百万円" }

// ユースケースは金額をint64で返すだけ。
// 「百万円単位・カンマ区切り」は表示の都合なのでこの層で行う`,
      },
      {
        lang: "Kotlin",
        code: `// Controller: HTTP形式 → ユースケースの入力へ変換
class HireController(private val useCase: HireEmployeeUseCase) {
    fun handle(req: HttpRequest): HttpResponse =
        try {
            val name = useCase.run(
                HireEmployeeUseCase.Input(
                    companyId = req.pathParam("id"),
                    name = req.body["name"] ?: error("nameは必須"),
                    salary = req.body["salary"]?.toLong() ?: 0,
                )
            )
            HttpResponse(201, mapOf("hired" to name))
        } catch (e: IllegalArgumentException) {
            HttpResponse(400, mapOf("error" to e.message))
        }
}
// ユースケースはHttpRequestを一切知らない`,
      },
      {
        lang: "TypeScript",
        code: `// Presenter: ユースケースの出力 → 画面用ViewModel
interface ReportViewModel {
  title: string;
  formattedProfit: string;  // "1,234百万円"
}

class ReportPresenter {
  present(report: EarningsReport): ReportViewModel {
    return {
      title: report.companyName + " 決算",
      formattedProfit:
        (report.profit / 1_000_000).toLocaleString("ja-JP") + "百万円",
    };
  }
}

// ユースケースは数値を返すだけ。表示形式はこの層の責務`,
      },
    ],
    domain: {
      text: "「企業の決算サマリーを表示する」機能を通しで見た例です。HTTP→ユースケース→エンティティ→Gateway(DB)→Presenter(表示形式)と、各アダプターが変換を担当します。",
      code: `// [Controller] GET /companies/7203/earnings
class EarningsController {
  constructor(private useCase: GenerateEarningsReportUseCase) {}
  async handle(req: HttpRequest) {
    return this.useCase.run(req.params.companyId); // HTTP→入力へ変換
  }
}

// [Gateway] ユースケースのポートを実装(DBの形式を吸収)
class CompanyGateway implements CompanyRepository {
  async find(id: string): Promise<Company> {
    const row = await sql("SELECT * FROM companies WHERE code = ?", [id]);
    // snake_caseのレコード → エンティティへ変換
    return new Company(row.company_name, row.is_listed === 1);
  }
}

// [Presenter] 従業員(アナリスト)向け画面の表示形式へ変換
class EarningsPresenter implements ReportOutput {
  viewModel: ReportViewModel | null = null;
  emit(report: EarningsReport) {
    this.viewModel = {
      title: report.companyName + " 2026年3月期",
      formattedProfit:
        (report.profit / 1_000_000).toLocaleString("ja-JP") + "百万円",
      badge: report.isRecordHigh ? "過去最高益" : "",
    };
  }
}
// 表示を「億円単位」に変えたくなってもPresenterだけ直せばよい`,
    },
  },

  "details-outside": {
    title: "フレームワークとドライバー(詳細)",
    what: "最外周のフレームワーク&ドライバー層には、Webフレームワーク・データベース・UI・外部APIクライアントなどの「詳細」を置きます。クリーンアーキテクチャでは「DBは詳細」「フレームワークは詳細」と考えます——ビジネスルールから見れば、それらは交換可能な道具にすぎないからです。詳細を外側に閉じ込めることで、「どのDBを使うか」といった決定を遅らせ、後からの乗り換えも可能にします。アプリの組み立て(どの実装をどのポートに注入するか)も、この最外周のmain関数が担います。",
    apply: {
      text: "最外周のmain(組み立てコード)で、各ポートに実装を配線します。内側のコードは組み立て方を知りません。",
      code: `// main.ts — 最外周: 詳細を選んで配線する唯一の場所
import express from "express";                       // 詳細
import { PostgresCompanyRepository } from "./infra"; // 詳細
import { HireEmployeeUseCase } from "./usecase";     // 内側
import { HireController } from "./adapters";         // 変換係

// 組み立て: ポートに実装を注入する
const repo = new PostgresCompanyRepository("postgres://...");
const useCase = new HireEmployeeUseCase(repo);
const controller = new HireController(useCase);

// フレームワークへの接続もここだけ
const app = express();
app.post("/companies/:id/hire", (req, res) =>
  controller.handle(req).then(r => res.status(r.status).json(r.body)));
app.listen(3000);

// テスト時は同じ部品を別の組み立て方で使う:
// new HireEmployeeUseCase(new InMemoryCompanyRepository())`,
    },
    benefits: "・「どのDB・どのフレームワークにするか」の決定を後回しにできる(選択肢を保てる)\n・乗り換え(Express→Fastify、MySQL→PostgreSQL)が最外周の差し替えで済む\n・組み立て場所が1箇所(main)に集まり、アプリの構成が一覧できる\n・テストでは同じ部品をインメモリ実装で組み立て直せるため、高速で安定したテストになる",
    langExamples: [
      {
        lang: "Rust",
        code: `// main.rs — 最外周で実装を選んで組み立てる
fn main() {
    // 詳細の選択はここに集約される
    let repo = PostgresCompanyRepository::connect("postgres://...");
    let use_case = HireEmployee { companies: repo };

    // Webフレームワーク(axum等)への接続もここだけ
    serve(use_case);
}

#[cfg(test)]
mod tests {
    #[test]
    fn hire_works_without_db() {
        // テストでは同じ部品をインメモリ実装で組み立てる
        let use_case = HireEmployee {
            companies: InMemoryRepository::new(),
        };
        use_case.run("acme", "佐藤", 5_000_000);
    }
}`,
      },
      {
        lang: "F#",
        code: `// Program.fs — 最外周(F#では最後のファイル)で組み立てる
[<EntryPoint>]
let main _ =
    // 詳細の選択と配線はここだけ
    let find = Postgres.findCompany "postgres://..."
    let save = Postgres.saveCompany "postgres://..."

    // 部分適用でユースケースを組み立てる
    let hire = UseCase.hireEmployee find save

    Web.serve hire // Webフレームワークへの接続
    0

// テストではインメモリの関数を部分適用するだけ:
// let hire = UseCase.hireEmployee InMemory.find InMemory.save`,
      },
      {
        lang: "Kotlin",
        code: `// Main.kt — 最外周: 組み立て(Composition Root)
fun main() {
    // 詳細の選択はここに集約
    val repo = PostgresCompanyRepository(url = "jdbc:postgresql://...")
    val useCase = HireEmployeeUseCase(repo)
    val controller = HireController(useCase)

    // フレームワーク(Ktor等)への接続もここだけ
    startServer(controller)
}

// テストでは同じ部品を差し替えて組み立てる
class HireEmployeeUseCaseTest {
    @Test
    fun \`DBなしで雇用できる\`() {
        val useCase = HireEmployeeUseCase(InMemoryCompanyRepository())
        useCase.run(HireEmployeeUseCase.Input("acme", "佐藤", 5_000_000))
    }
}`,
      },
      {
        lang: "TypeScript",
        code: `// main.ts — 最外周: 組み立て(Composition Root)
const repo = new PostgresCompanyRepository("postgres://...");
const useCase = new HireEmployeeUseCase(repo);
const controller = new HireController(useCase);

const app = express();
app.post("/companies/:id/hire", (req, res) =>
  controller.handle(req).then(r => res.status(r.status).json(r.body)));
app.listen(3000);

// テストは同じ部品をインメモリで組み立て直す
test("DBなしで雇用できる", async () => {
  const useCase = new HireEmployeeUseCase(new InMemoryCompanyRepository());
  const result = await useCase.run(
    { companyId: "acme", name: "佐藤", salary: 5_000_000 });
  expect(result.hired).toBe("佐藤");
});`,
      },
    ],
    domain: {
      text: "経済情報アプリの「詳細」が差し替わっていく現実的なシナリオです。ビジネスルール(企業・従業員・ユースケース)は無傷のまま、外側だけが入れ替わります。",
      code: `// ---- リリース時の構成 ----
const app = buildApp({
  companyRepo: new PostgresCompanyRepository(),  // DB: PostgreSQL
  priceProvider: new VendorApiProvider(),        // 株価: ベンダーAPI
  notifier: new EmailNotifier(),                 // 通知: メール
});

// ---- 1年後: 事情が変わっても組み立ての差し替えだけ ----
const app2 = buildApp({
  companyRepo: new DynamoCompanyRepository(),    // コスト削減でDynamoへ
  priceProvider: new ExchangeDirectProvider(),   // 取引所直結に乗り換え
  notifier: new SlackNotifier(),                 // 通知はSlackに変更
});

// ---- テスト・デモ環境 ----
const demoApp = buildApp({
  companyRepo: new InMemoryCompanyRepository([acme, globex]),
  priceProvider: new FixturePriceProvider(1000), // 固定値
  notifier: new NoopNotifier(),
});

// Company・Employee・各ユースケースのコードは
// 3つの構成すべてで同一。これが「詳細を外に追いやる」効果`,
    },
  },

  // ===================================================
  // バイブコーディング
  // ===================================================
  "vibe-coding-overview": {
    title: "バイブコーディング(全体像)",
    what: "バイブコーディング(Vibe Coding)は、自然言語でAIに指示してコードを生成させ、細部の実装よりも「動く結果」を確かめながら素早く作り進める開発スタイルです。2025年にAndrej Karpathyが「コードの存在すら忘れて雰囲気(vibe)に身を任せる」と表現したことから広まりました。プロトタイプ・個人ツール・使い捨てスクリプトのように「まず形にして試したい」場面で特に威力を発揮します。一方、細部を見ないぶん検証と品質管理の考え方がセットで必要になります。",
    apply: {
      text: "従来の「自分で全部書く」開発と、バイブコーディングの進め方を比べると、人間の仕事が「書く」から「伝える・確かめる」に変わります。",
      code: `── 従来の開発 ─────────────────────
1. 仕様を考える
2. コードを自分で書く(数時間〜数日)
3. デバッグして完成させる

── バイブコーディング ─────────────
1. 作りたいものを言葉で伝える
   「企業名を入力すると株価チャートを表示する
    Webページを作って。HTMLファイル1枚で完結、
    ライブラリはChart.jsを使って」
2. 生成されたコードを実行して動作を見る(数分)
3. 気になる点を言葉でフィードバック
   「チャートの下に直近5日の終値も表で出して」
4. 動いたら取り込む前に検証する
   (重要な部分は読む・テストする)

人間の役割: 書く人 → 方向を決めて検証する人`,
    },
    benefits: "・アイデアを数分〜数時間で動く形にでき、試行錯誤の回数が桁違いに増える\n・ボイラープレートや慣れない言語・ライブラリの学習コストをスキップできる\n・「まず動くものを見て考える」ことで、要件の勘違いに早く気づける\n・注意: 速さの代償として検証責任は残る。重要システムへの「雰囲気のまま投入」は禁物",
    langExamples: [
      {
        lang: "Rust",
        code: `── RustをAIに書かせるときのポイント ──

プロンプト例:
「CSVファイルから企業名と売上を読み込んで、
 売上順にソートして表示するCLIツールをRustで。
 エラー処理はanyhowクレートでシンプルに」

注意点:
・所有権・借用のコンパイルエラーが出たら、
  エラーメッセージをそのまま貼ると効果的
  (Rustコンパイラのエラーは情報量が多くAIと相性が良い)
・「unwrap()を使わずResultで処理して」と
  指定すると本番寄りの品質になる
・Cargo.tomlの依存もセットで生成してもらう`,
      },
      {
        lang: "F#",
        code: `── F#をAIに書かせるときのポイント ──

プロンプト例:
「企業の四半期売上のリストから移動平均を計算する
 F#の関数を。判別共用体とパターンマッチを活用して、
 .fsxスクリプトとして実行できる形で」

注意点:
・F#は学習データが比較的少なく、C#風の
  コードが混ざることがある。「F#らしく
  パイプライン演算子と不変データで」と念押しする
・dotnet fsi で動く.fsxから始めると
  実行→フィードバックのループが速い`,
      },
      {
        lang: "Kotlin",
        code: `── KotlinをAIに書かせるときのポイント ──

プロンプト例:
「従業員リスト(名前・部署・給与)を部署ごとに
 集計して平均給与を出すKotlinのコードを。
 data classとコレクション操作(groupBy等)を使って」

注意点:
・Java風の冗長なコードが出たら「Kotlinらしく
  簡潔に」と指示すると改善される
・null安全(?. や ?:)の扱い方針を伝えると
  実運用に近いコードになる
・Gradleの設定が絡むエラーはバージョン情報を
  添えて質問すると精度が上がる`,
      },
      {
        lang: "TypeScript",
        code: `── TypeScriptをAIに書かせるときのポイント ──

プロンプト例:
「企業の株価データ(日付と終値の配列)から
 前日比変化率を計算するTypeScriptの関数を。
 型定義を明示して、any型は使わないで」

注意点:
・「strictモードで型エラーが出ない形で」と
  伝えるとany頼みのコードを防げる
・学習データが最も豊富な言語の1つで、
  生成品質は安定しやすい
・ライブラリのバージョン差(v4とv5でAPIが違う等)
  によるハルシネーションには注意`,
      },
    ],
    domain: {
      text: "経済情報アプリをバイブコーディングで立ち上げるときの、最初のプロンプトの例です。目的・データ・画面・技術の4点を伝えるだけで、たたき台が数分で手に入ります。",
      code: `── 最初のプロンプト ─────────────────

「企業情報ダッシュボードのプロトタイプを作って。

 目的: 営業チームが訪問前に企業概要を3分で把握する
 データ: 企業(名前・業種・時価総額・従業員数)を
        10社ぶんダミーデータで用意して
 画面: 企業一覧(カード形式)→タップで詳細
       詳細には従業員数の推移グラフ(ダミー)も
 技術: HTML/CSS/JSのファイル1枚。スマホ優先。
       外部ライブラリはChart.jsのみ」

── 5分後 ──────────────────────────
動くプロトタイプが手に入る。触ってみて
「業種で絞り込みたい」「時価総額は億円表示がいい」
と気づいたことを次のプロンプトで伝えて改善していく。

従来なら企画書とモックで1週間かけていた
「方向性の確認」が、動くもので即日できる`,
    },
  },

  "prompting": {
    title: "効果的な指示(プロンプト)",
    what: "AIへの指示の質が、生成されるコードの質を直接決めます。基本は3点セット——①目的(何のために作るか)、②入出力の例(どう動けばよいか)、③制約(言語・ライブラリ・エラー処理などの方針)。AIは書かれていないことを推測で埋めるため、曖昧な指示は「もっともらしいが期待と違うもの」を生みます。また、既存コードやエラーメッセージなどの「事実」を共有するほど、回答は的確になります。",
    apply: {
      text: "曖昧なプロンプトを、目的・例・制約つきに書き直した例です。手戻りの回数が大きく変わります。",
      code: `── ❌ 曖昧な指示 ──────────────────
「企業データを処理する関数を作って」

→ 何のデータ? どう処理? 出力は?
  AIが全部推測で埋めるので、期待とズレやすい

── ✅ 目的・例・制約を伝える ────────
「企業の決算データから増収増益の企業だけを
 抽出する関数をTypeScriptで作って。

 入力の例:
   [{ name: "アクメ", revenue: [100, 120],
      profit: [10, 15] }, ...]
   (配列は古い年度→新しい年度の順)

 出力の例: 増収かつ増益の企業名の配列
   ["アクメ"]

 制約:
 ・データが1年分しかない企業は除外
 ・型定義を明示、anyは使わない
 ・純粋関数にして(引数を変更しない)」`,
    },
    benefits: "・期待とのズレが減り、書き直しの往復回数が少なくなる\n・入出力例がそのままテストケースの種になる\n・制約を伝えることで、プロジェクトの方針(型安全、エラー処理)に合ったコードになる\n・「目的」を伝えると、AIがより適切な設計や代替案を提案してくれることがある",
    langExamples: [
      {
        lang: "Rust",
        code: `── Rust向けプロンプトの工夫 ──

「企業の株価履歴を保持する構造体と、
 期間内の最大ドローダウンを計算するメソッドをRustで。

 制約:
 ・panicせずResult<f64, String>を返す
 ・f64の比較はpartial_cmpを正しく処理
 ・#[cfg(test)]のユニットテストも付けて」

ポイント: Rustはエラー処理の方針
(panic / Result / anyhow)を指定しないと
スタイルがぶれやすい。テストを同時に
頼むと動作確認もセットで済む`,
      },
      {
        lang: "F#",
        code: `── F#向けプロンプトの工夫 ──

「従業員の給与改定を表すF#の関数を。

 制約:
 ・Employee型はレコードで不変に
 ・昇給率が0〜20%の範囲外ならErrorを返す
   (Result<Employee, string>)
 ・if式でなくパターンマッチを優先
 ・関数合成しやすいようカリー化された引数順で」

ポイント: F#は「不変データ+Result型」の
方針を明示すると、例外throwに頼らない
関数型らしいコードが安定して出てくる`,
      },
      {
        lang: "Kotlin",
        code: `── Kotlin向けプロンプトの工夫 ──

「企業リストを条件で絞り込むKotlinの関数を。

 制約:
 ・data class Company(名前・業種・時価総額)
 ・引数はフィルタ条件のラムダ (Company) -> Boolean
 ・戻り値はList<Company>、元のリストは変更しない
 ・拡張関数として実装して」

ポイント: Kotlinはコレクション操作の
書き方が豊富なので、「拡張関数で」
「シーケンスで遅延評価」など形まで
指定すると好みのスタイルに寄せられる`,
      },
      {
        lang: "TypeScript",
        code: `── TypeScript向けプロンプトの工夫 ──

「株価APIのレスポンスを画面表示用に変換する
 TypeScriptの関数を。

 入力の型: { symbol: string; last_px: number;
            ts_epoch: number }
 出力の型: { code: string; price: string;  // "1,234円"
            updatedAt: string }            // "2026/07/13"
 制約:
 ・型定義をinterfaceで明示
 ・変換ロジックは純粋関数に
 ・Intl.NumberFormatで通貨表示」

ポイント: 入出力の「型」をそのまま
書いて渡せるのがTSの強み。型が仕様書になる`,
      },
    ],
    domain: {
      text: "経済情報アプリの機能追加を依頼するときの、コンテキスト(既存の前提)の渡し方の例です。既存の型定義を貼るだけで、プロジェクトに馴染むコードが返ってきます。",
      code: `── コンテキストを渡すプロンプト ──────

「以下の既存の型定義があるプロジェクトです。

 interface Company {
   code: string;        // 証券コード
   name: string;
   employees: Employee[];
 }
 interface Employee {
   name: string;
   department: string;
   salary: number;
 }

 この型を使って、『部署ごとの平均給与が
 全社平均を上回っている部署』を企業ごとに
 一覧するレポート関数を追加してください。

 ・既存の型は変更しない
 ・戻り値の型も定義して
 ・端数は四捨五入で円単位」

── ポイント ────────────────────────
既存の型・命名規則・コード片を見せると、
AIはプロジェクトの流儀に合わせてくる。
「何も見せずに頼む」と汎用的な別物が返ってくる`,
    },
  },

  "iteration": {
    title: "小さく反復する",
    what: "バイブコーディングの基本リズムは「小さく頼む → 実行して確かめる → 結果をフィードバックする」の高速な反復です。大きな機能を一度に生成させるほど誤りの混入率と発見の難しさが上がるため、1ステップずつ動作確認しながら進めます。エラーが出たらメッセージをそのまま貼って修正を依頼するのが基本動作です。また、AIは大胆な書き換えをすることがあるため、動く状態をこまめにコミットしておく(すぐ巻き戻せる)ことが安心して任せるためのセーフティネットになります。",
    apply: {
      text: "「全部一気に」ではなく「1ステップずつ動作確認」で進める実際の流れです。",
      code: `── ❌ 一気に頼む ────────────────────
「企業検索、詳細表示、株価チャート、
 ウォッチリスト、通知機能を全部作って」
→ 500行のコードが来て、どこかが動かない。
  どこが悪いのか、人間にもAIにも分かりにくい

── ✅ 小さく反復する ────────────────
1.「まず企業一覧を表示するだけのページを」
   → 実行 → 動いた → commit
2.「一覧に検索ボックスを追加して」
   → 実行 → 動いた → commit
3.「企業をタップしたら詳細を表示して」
   → 実行 → エラー発生!
4. エラーメッセージをそのまま貼る:
   「TypeError: Cannot read properties of
    undefined (reading 'code') が出た」
   → 修正案 → 実行 → 動いた → commit
5. 次の機能へ…

壊れたら直前のcommitに戻して別の頼み方を試す`,
    },
    benefits: "・エラーの原因箇所が「直前の1ステップ」に絞られ、デバッグが速い\n・動く状態が常に手元にあり、いつでも巻き戻せる安心感がある\n・途中で方向修正できる(全部できてから「違う」と気づくのを防ぐ)\n・フィードバックが具体的になり、AIの修正精度も上がる",
    langExamples: [
      {
        lang: "Rust",
        code: `── Rustでの反復のコツ ──

Rustはコンパイラが最強のフィードバック源。

1. AIにコードを生成させる
2. cargo check(高速な型チェック)
3. エラーが出たら全文をそのまま貼る:
   「error[E0502]: cannot borrow \`companies\`
    as mutable because it is also borrowed
    as immutable ... というエラーが出た」
4. Rustコンパイラのエラーは原因と修正候補
   まで書いてあるので、AIの修正精度が高い

cargo check → cargo test → cargo run の
順に確認すると、反復1周が速くて確実`,
      },
      {
        lang: "F#",
        code: `── F#での反復のコツ ──

F#はREPL(dotnet fsi)が反復と相性抜群。

1. AIに関数を1つ生成させる
2. .fsxファイルに貼ってdotnet fsiで即実行
3. 結果が期待と違えば、実際の出力を貼る:
   「calcMovingAverage [100.; 120.; 90.] 2 の
    結果が [110.0; 105.0] になったけど、
    先頭の要素は平均が取れないので
    除外してほしい」
4. 型エラーはコンパイラの指摘をそのまま共有

小さな関数単位で確かめてから
組み合わせると、堅牢に積み上がる`,
      },
      {
        lang: "Kotlin",
        code: `── Kotlinでの反復のコツ ──

1. AIにコードを生成させる
2. IDEの赤線(コンパイルエラー)があれば
   その内容を貼って修正依頼
3. 実行時エラーはスタックトレースの
   先頭数行をそのまま貼る:
   「kotlin.KotlinNullPointerException
    at CompanyReport.kt:42 で落ちた」
4. 動いたらテストも生成させる:
   「今の関数のエッジケースを網羅する
    JUnit5のテストを書いて」

Kotlin Playgroundやスクラッチファイルで
小さく試してから本体に取り込むと安全`,
      },
      {
        lang: "TypeScript",
        code: `── TypeScriptでの反復のコツ ──

1. AIにコードを生成させる
2. tsc --noEmit で型チェック
   エラーはそのまま貼って修正依頼:
   「TS2345: Argument of type 'string' is
    not assignable to parameter of type
    'number' が42行目に出た」
3. ブラウザで動かす場合はDevToolsの
   Consoleのエラーをコピペで共有
4. console.logの実際の出力を貼って
   「期待は○○、実際は××」と伝えると
   ピンポイントで直ってくる

npm run dev の自動リロードと組み合わせると
1周数十秒の高速ループになる`,
      },
    ],
    domain: {
      text: "経済情報ダッシュボードに「従業員数の推移グラフ」を追加する反復の実録イメージです。1ステップずつ確かめることで、ズレを早期に修正できています。",
      code: `1.「企業詳細に従業員数の推移グラフを追加して。
    データは {year: 2022, count: 1200} の配列で」
   → 表示された。が、縦軸が0始まりでなく
     変化が誇張されて見える

2.「縦軸を0始まりにして。あと単位『名』を付けて」
   → 直った → commit

3.「前年比の増減率もツールチップに出して」
   → エラー: Cannot read properties of
     undefined (reading 'count')
   → エラーをそのまま貼る
   →「最初の年は前年がないので、
      ガードを追加しました」→ 動いた → commit

4.「役員(isExecutive)だけの推移も
    切り替えで見られるようにして」
   → 動いた → commit → 完成

計4回の反復・所要20分。各ステップが小さいので
どこで壊れてもすぐ原因が特定できた`,
    },
  },

  "review-verification": {
    title: "生成コードの検証",
    what: "AIの出力は「もっともらしいが間違っている」ことがあります(ハルシネーション)。存在しないAPI、古いライブラリの使い方、微妙に誤ったロジックなどが、自信満々の文面で返ってきます。だからこそ、取り込む前の検証——実際に動かす・テストを通す・重要な部分は読んで理解する——が不可欠です。そして、生成コードで障害が起きたときに責任を負うのはAIではなく、取り込みを判断した人間です。「AIが書いたから」は言い訳になりません。",
    apply: {
      text: "生成コードを取り込む前のチェックの流れを、軽量なものから順に習慣化します。",
      code: `── 生成コードを取り込む前のチェックリスト ──

レベル1: 動かして確かめる(必須・数秒)
  □ 実行してエラーが出ないか
  □ 代表的な入力で期待どおりの出力か
  □ 変な入力(空、0、マイナス)でどうなるか

レベル2: 読んで理解する(重要な箇所は必須)
  □ 何をしているか自分の言葉で説明できるか
  □ 使われているAPI・ライブラリは実在するか
  □ 「なぜこう書いたの?」とAIに説明させるのも有効

レベル3: テストで固定する(残すコードには推奨)
  □ 入出力例をテストコードにする
    (AIに「このコードのテストを書いて」でOK)
  □ エッジケースのテストも依頼する

判断基準: 使い捨てスクリプトはレベル1でも可。
本番に入るコード・お金や個人情報を扱うコードは
レベル3+人間のレビューまで必須`,
    },
    benefits: "・「もっともらしい誤り」を本番に入れる前に捕まえられる\n・読んで理解する習慣により、障害時に自分で調査・修正できる状態を保てる\n・テスト化しておけば、後のAIの変更による退行もすぐ検知できる\n・「重要度に応じて検証の深さを変える」判断ができ、速度と品質を両立できる",
    langExamples: [
      {
        lang: "Rust",
        code: `── Rustでの検証のコツ ──

強力な型システムが検証の第一関門になる。

・cargo check が通る = 型・所有権レベルの
  整合性はコンパイラが保証済み
・ただし「コンパイルが通る=正しい」ではない。
  ロジックの誤りは型では捕まらない
・AIに頼むテストの例:
  「この関数のプロパティベーステストを
   proptestクレートで書いて。
   『ソート結果は常に昇順』を検証したい」
・unsafeブロックが生成されたら要注意。
  本当に必要か必ず人間が判断する`,
      },
      {
        lang: "F#",
        code: `── F#での検証のコツ ──

・まずREPL(dotnet fsi)で関数単位に実行し、
  入出力を目で確かめる
・型シグネチャを見るだけでも検証になる:
  「この関数、Employee -> Employee のはずが
   Employee -> unit になってる = 破壊的変更?」
・AIに頼むテストの例:
  「この関数のテストをFsCheckで。
   『昇給後の給与は必ず元以上』という
   性質を検証して」
・判別共用体の網羅チェック(warning)を
  無視していないかも確認ポイント`,
      },
      {
        lang: "Kotlin",
        code: `── Kotlinでの検証のコツ ──

・!!(強制アンラップ)が生成コードに
  混ざっていたら要注意。nullの扱いを
  ちゃんと考えたか確認する
・runCatchingで例外を握りつぶす形に
  なっていないかチェック
・AIに頼むテストの例:
  「このクラスのJUnit5テストを書いて。
   境界値(0円、上限ちょうど、上限+1円)を
   網羅して」
・非推奨API(Deprecated)の使用は
  IDEの警告で機械的に発見できる`,
      },
      {
        lang: "TypeScript",
        code: `── TypeScriptでの検証のコツ ──

・any / as / @ts-ignore が生成コードに
  混ざっていたら型検査が素通しになるサイン。
  「anyを使わずに書き直して」と依頼する
・tsc --noEmit + ESLintを通すのを習慣に
・AIに頼むテストの例:
  「この関数のVitestテストを書いて。
   正常系2つ、異常系(空配列・不正な日付)も」
・実在しないnpmパッケージをimportして
  いないか、インストール前にnpmjs.comで確認`,
      },
    ],
    domain: {
      text: "「企業の時価総額ランキング」機能の生成コードに潜んでいた、実際にありがちな「もっともらしい誤り」の例です。動かすだけでは気づきにくく、読む・テストすることで捕まえられます。",
      code: `// AIが生成した一見正しいコード
function topCompanies(companies: Company[], n: number) {
  return companies
    .sort((a, b) => b.marketCap - a.marketCap)  // 誤り1
    .slice(0, n);
}

// 誤り1: sortは元の配列を破壊する(引数を変更してしまう)
//   → 他の画面で使っている一覧の順番まで変わるバグに
//   → [...companies].sort(...) が正しい

// 誤り2(別の生成例): 前年比計算で
//   (current - previous) / current      // 分母が逆
//   → 数字はそれっぽく出るので動作確認だけでは
//     気づきにくい。入出力例のテストで捕まえる

// 検証の実践:
// 1. 「この関数は引数を変更しない?」とAIに確認
// 2. 計算式は例で検証:
//    「時価総額100→120の企業の成長率は20%になる?」
// 3. テスト化:
//    expect(growthRate(100, 120)).toBeCloseTo(0.2)
// お金の数字を扱う機能は「それっぽく動く」が
// 一番危ない。例による検証を習慣にする`,
    },
  },

  "security-quality": {
    title: "セキュリティと品質のリスク",
    what: "バイブコーディングには特有のリスクがあります。①秘密情報の漏洩——プロンプトに貼った内容は外部サービスに送信され、AIはAPIキーをコードにハードコードしがち。②実在しないパッケージ——AIが創作したパッケージ名を攻撃者が悪用する「スロップスクワッティング」も報告されています。③脆弱性の混入——SQLインジェクションやXSSなどは「動く」だけでは検出されません。「動く」と「安全」は別物である、という意識が最大の防御です。",
    apply: {
      text: "秘密情報・依存パッケージ・脆弱性の3大リスクへの基本対策です。",
      code: `── リスク1: 秘密情報の漏洩 ──────────
❌ 「このAPIキー sk-abc123... を使って
    株価取得のコードを書いて」
✅ 「APIキーは環境変数 STOCK_API_KEY から
    読む形でコードを書いて」
→ プロンプトにもコードにも秘密を書かない。
  .envファイル+.gitignoreを最初に整備

── リスク2: 実在しないパッケージ ──────
AIの提案: 「stock-price-fetcher-proという
便利なライブラリがあります」
→ インストール前に確認:
  ・レジストリ(npm/crates.io等)に実在するか
  ・作者は誰か、更新されているか、利用実績は
→ 攻撃者がAIの創作しがちな名前で悪意ある
  パッケージを公開する攻撃が実在する

── リスク3: 脆弱性の混入 ────────────
生成コード:
  db.query("SELECT * FROM companies
    WHERE name = '" + userInput + "'")
→ SQLインジェクション。動作確認では気づけない
→ 公開前に「このコードのセキュリティ上の
  問題を指摘して」とAI自身に点検させるのも有効`,
    },
    benefits: "・(対策することで)秘密情報の流出という取り返しのつかない事故を防げる\n・サプライチェーン攻撃(悪意あるパッケージ)の入口を塞げる\n・「動く」と「安全」を区別する習慣が、公開してよいものの判断基準になる\n・AI自身にセキュリティ点検させる方法を知っていれば、低コストで一定の防御ができる",
    langExamples: [
      {
        lang: "Rust",
        code: `── Rustでの注意点 ──

・依存の確認: crates.ioで実在・作者・
  ダウンロード数を見る。cargo auditで
  既知の脆弱性もチェックできる
・秘密情報:
  「dotenvyクレートで環境変数から
   APIキーを読む形にして」と指示
・unsafe: 生成コードにunsafeが混ざったら
  「unsafeなしで書けない?」とまず聞く
・整数オーバーフロー: 金額計算は
  checked_add / checked_mul を指定すると
  静かな桁あふれを防げる`,
      },
      {
        lang: "F#",
        code: `── F#/.NETでの注意点 ──

・依存の確認: NuGetで実在と作者を確認。
  dotnet list package --vulnerable で
  既知の脆弱性を検査できる
・秘密情報: appsettingsに直書きさせず
  「環境変数またはUser Secretsから
   読む形にして」と指示
・SQL: 「Dapperのパラメータ化クエリで」
  など、文字列連結でないことを明示
・型で防ぐ: 「金額はdecimalで」と指定
  (floatの誤差はお金の計算で事故のもと)`,
      },
      {
        lang: "Kotlin",
        code: `── Kotlin/JVMでの注意点 ──

・依存の確認: Maven Centralで実在を確認。
  OWASP Dependency-Checkで脆弱性検査
・秘密情報: 「APIキーはSystem.getenvから。
  ソースにハードコードしないで」と指示
・SQL: 「PreparedStatementまたは
  Exposedのパラメータバインドで」と明示
・Androidの場合はローカルに保存する
  トークンの暗号化(EncryptedSharedPreferences)
  まで指定するとより安全`,
      },
      {
        lang: "TypeScript",
        code: `── TypeScript/Node.jsでの注意点 ──

・依存の確認: npmjs.comで実在・作者・
  週間DL数を確認。npm auditも実行
  (タイポスクワッティングの標的が最も多い
   エコシステムなので特に慎重に)
・秘密情報: 「process.env.API_KEYから読んで、
  .env.exampleも作って」と指示。
  フロントエンドのコードにキーを置かない
・XSS: 「innerHTMLでなくtextContentで」
  「ユーザー入力はエスケープして」と明示
・SQL: 「プレースホルダ($1)を使って」と指定`,
      },
    ],
    domain: {
      text: "経済情報アプリは「お金の数字」「企業の非公開情報」「従業員の個人情報」を扱うため、リスク管理の重要度が高い領域です。ドメイン特有の注意点をまとめます。",
      code: `── 経済情報アプリ特有のリスクと対策 ──

1. 株価データAPIのキー
   ❌ フロントエンドのJSに埋め込む
     (誰でもDevToolsで抜き取れて、従量課金を悪用される)
   ✅ 「APIキーはサーバー側だけで使い、
      フロントには自前のエンドポイント経由で」と指示

2. 従業員データ(個人情報)
   ❌ 実データをプロンプトに貼って
     「このデータで動作確認して」
   ✅ 「ダミーデータを生成して確認して」と依頼。
      実名・実給与は外部サービスに送らない

3. 金額計算の品質
   ・浮動小数点の誤差: 0.1 + 0.2 !== 0.3
   ・「金額は整数の『銭』単位で計算して」等の
     方針を最初に指定する
   ・時価総額の集計は桁あふれにも注意(BigInt)

4. 非公開の決算情報を扱う場合
   ・組織のAI利用ポリシー(送信してよい情報の
     範囲)を先に確認するのが大前提`,
    },
  },

  "ai-collaboration": {
    title: "人間とAIの役割分担",
    what: "バイブコーディングは「全部AIに丸投げ」ではなく、得意分野で分担する協働です。AIが得意なのは、定型的な実装・ボイラープレート・慣れないライブラリの使い方・変換やテストの作成など「パターンが存在する仕事」。人間が担うべきは、要件定義(何を作るべきか)・設計判断(どんな方針にするか)・品質の最終判断(この状態でリリースしてよいか)です。自動テストを整備しておくと、AIの変更による退行を即検知でき、安心して任せられる範囲が広がります。",
    apply: {
      text: "1つの機能開発を、人間の仕事とAIの仕事に分けた例です。判断は人間、パターン作業はAIという分担が基本形です。",
      code: `── 機能: 「企業ウォッチリストに通知機能を追加」──

[人間] 要件を決める
  「目標株価に到達したら通知。ただし同じ企業への
   通知は1日1回まで(通知疲れを防ぐ)」
   ← ビジネス判断はAIには決められない

[人間] 設計方針を決める
  「通知はNotifierインターフェースにして
   将来Slack対応できるようにしよう」
   ← アーキテクチャの意思決定

[AI] 実装する
  「上の方針でTypeScriptのコードを書いて」
  → インターフェース、実装、重複排除ロジック

[AI] テストを書く
  「『1日1回まで』のルールのテストを書いて。
   日付をまたぐケースも」

[人間] 検証して取り込みを判断する
  ・テストが通るか、ルールの解釈は正しいか
  ・「23:59と0:01は別の日?同じ24時間以内?」
   ← 仕様の曖昧さに気づくのも人間の仕事

[人間] リリース判断`,
    },
    benefits: "・パターン作業をAIに任せることで、人間は要件・設計という高付加価値な仕事に集中できる\n・「AIに説明できる程度に要件を言語化する」こと自体が、仕様の曖昧さの発見につながる\n・テストという安全網があると、AIに任せられる範囲を段階的に広げられる\n・スキルの学習にも有効: AIの出力を読み、「なぜ?」と聞くことで新しい言語・技術を実地で学べる",
    langExamples: [
      {
        lang: "Rust",
        code: `── Rustでの分担例 ──

[人間] 「並行処理でデータ競合が怖いので、
       まず設計方針を相談したい」
[AI]  選択肢を提示(Mutex / channel /
      actorモデル)と、それぞれの
      トレードオフを説明
[人間] 「チャネルベースでいこう」と決定
[AI]  実装+テストを生成
[人間] cargo test を確認して取り込み

Rustは学習曲線が急な言語だからこそ、
「AIに説明させながら書かせる」ことが
そのまま言語の学習になる`,
      },
      {
        lang: "F#",
        code: `── F#での分担例 ──

[人間] 「決算データのバリデーションを
       Railway Oriented Programming
       (Result連鎖)で組みたい」と方針決定
[AI]  bind/mapを使ったパイプラインを実装
[人間] 型シグネチャを見て設計意図どおりか確認
[AI]  FsCheckのプロパティテストを追加
[人間] 「この性質で仕様を表せてる?」を判断

型シグネチャが設計の共通言語になるのが
F#での協働のやりやすさ。人間は型を見て
方向性を判断し、中身の実装はAIに任せる`,
      },
      {
        lang: "Kotlin",
        code: `── Kotlinでの分担例 ──

[人間] 「AndroidアプリにDBキャッシュ層を
       足したい。RoomとSQLDelightどっちがいい?」
[AI]  比較(マルチプラットフォーム対応、
      型安全性、学習コスト)を提示
[人間] 「KMP予定はないのでRoomで」と決定
[AI]  Entity/DAO/Migrationを一式生成
[人間] スキーマ設計だけ重点レビュー
      (後から変えにくい部分に人間の目を使う)
[AI]  DAOのテストを生成

「後から変えにくいもの(スキーマ、公開API)は
人間が厚くレビュー」が投資効率の良い分担`,
      },
      {
        lang: "TypeScript",
        code: `── TypeScriptでの分担例 ──

[人間] 「フォームのバリデーションが複雑化
       してきた。zodを導入すべき?」
[AI]  現状コードとzod版の比較を提示
[人間] 導入を決定、既存コードの移行を依頼
[AI]  スキーマ定義と移行コードを生成
[人間] 「型がスキーマから推論される形に
       なってる?」と設計意図を確認
[AI]  エッジケースのテストを追加

型定義(interface/zodスキーマ)を人間が
レビューの中心に据えると、実装の細部は
安心して任せられる`,
      },
    ],
    domain: {
      text: "経済情報アプリの開発チームでの、現実的な分担の全体像です。ドメイン知識(金融・業務ルール)が絡む判断ほど人間の役割が大きくなります。",
      code: `── 経済情報アプリ開発での役割分担 ──

[人間だけができること]
・「移動平均は5日と25日、どちらを見せるべきか」
  → 利用者(アナリスト従業員)の業務理解が必要
・「この企業データの利用は契約の範囲内か」
  → データライセンスの判断
・「決算発表の15時に通知が集中しても大丈夫か」
  → 運用・負荷の想定はドメイン経験がモノを言う

[AIに任せて効率化できること]
・チャート描画・テーブル表示などのUI実装
・APIレスポンスの型定義と変換関数
・テストデータ(ダミー企業・従業員)の生成
・「この計算式(PER、配当利回り)の実装」
  ※ ただし式の正しさの確認は人間

[協働が最も活きること]
・「出来高加重平均価格(VWAP)を実装して」
  → AIが実装、人間が金融知識で検算
・障害調査 → ログをAIに貼って仮説を出させ、
  人間がドメイン知識で絞り込む

判断と検算は人間、パターンと物量はAI`,
    },
  },
};
