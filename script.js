// ==============================
// 状態管理用の変数
// ==============================

// ボタンクリック後、結果表示前のメッセージパターン
const spinningMessages = [
  "ガチャ回し中…😋",
  "今日のランチを選びよるよ〜🍴",
  "お腹すいてきたばい…🤤",
  "うまか店を探しよるけんね👀",
  "今日はここかも…？🤔",
  "ランチの運命、回転中🎰",
  "丸の内ランチ会議中📝",
  "胃袋と相談しよる…😆",
  "迷いに迷っとるばい…🌀",
  "ええ店引く予感しかしない✨",
  "ワクワクしてきたばい〜💓",
  "ランチタイムきたーー！🎉",
  "今日は当たりそうな気がする😋✨",
  "何が出るかドキドキ…😳",
  "もう待てん！早く知りたい〜😂"
];

// ガチャが回転中かどうか
let isSpinning = false;

// JSONから読み込んだランチ一覧
let lunchList = [];

// 前回選ばれた店舗
let lastShop = null;

// ==============================
// DOM取得
// ==============================

const button = document.getElementById("gachaBtn");
const result = document.getElementById("result");
const shopEl = document.getElementById("shop");
const commentEl = document.getElementById("comment");

// ==============================
// ランチデータ読み込み
// ==============================

fetch("lunch_list.json")
  .then(response => response.json())
  .then(data => {
    lunchList = data;
  });

// ==============================
// アニメーションを確実にリセットする関数
// ==============================

function resetResultAnimation() {
  result.classList.remove("show");
  result.style.display = "none";

  // 再描画を強制
  void result.offsetHeight;

  result.style.display = "block";
  result.classList.add("show");
}

// ==============================
// ガチャボタン押下処理
// ==============================

button.addEventListener("click", () => {

  // 連打防止
  if (isSpinning) return;
  if (lunchList.length === 0) return;

  isSpinning = true;
  button.disabled = true;

  // ------------------------------
  // 回転中メッセージ表示
  // ------------------------------

  const message =
    spinningMessages[Math.floor(Math.random() * spinningMessages.length)];

  shopEl.textContent = message;
  commentEl.textContent = "";

  // 毎回アニメーションをリセットして表示
  resetResultAnimation();

  // ------------------------------
  // 少し待って結果表示
  // ------------------------------

  setTimeout(() => {

    let shop;

    // 前回と同じ店を避ける
    do {
      shop = lunchList[Math.floor(Math.random() * lunchList.length)];
    } while (shop.name === lastShop);

    const comment =
      shop.comments[Math.floor(Math.random() * shop.comments.length)];

    shopEl.textContent = shop.name;
    commentEl.innerHTML = comment;

    // 結果表示も必ずボワっと
    resetResultAnimation();

    // 状態更新
    lastShop = shop.name;
    isSpinning = false;
    button.disabled = false;

  }, 1700); // 1.7秒待つ
});
