// ==============================
// 状態管理用の変数
// ==============================

// ガチャが回転中かどうかを管理するフラグ
let isSpinning = false;

// JSONから読み込んだランチ一覧を入れる配列
let lunchList = [];

// 前回選ばれた店舗を保持
let lastShop = null;

// ガチャボタンのDOM要素を取得
const button = document.getElementById("gachaBtn");

// ==============================
// ランチデータ（JSON）を読み込む
// ==============================

// lunch_list.json を取得して JavaScript で使える形に変換
fetch("lunch_list.json")
  .then(response => response.json())
  .then(data => {
    // JSONの中身を lunchList に保存
    lunchList = data;
  });

// ==============================
// ガチャボタンが押された時の処理
// ==============================

button.addEventListener("click", () => {
  // ガチャ回転中なら何もしない（連打防止）
  if (isSpinning) return;

  // データがまだ読み込まれていなければ中断
  if (lunchList.length === 0) return;

  // ガチャ回転開始
  isSpinning = true;
  button.disabled = true;

  // 回転中の表示
document.getElementById("shop").textContent = "ガチャ回し中…😋";
document.getElementById("comment").textContent = "";

  // 少し待ってから結果を表示（ガチャ演出）
  setTimeout(() => {
  let shop;

  // 前回と同じ店にならないようにする
  do {
    shop = lunchList[Math.floor(Math.random() * lunchList.length)];
  } while (shop.name === lastShop);

  const comment =
    shop.comments[Math.floor(Math.random() * shop.comments.length)];

  document.getElementById("shop").textContent = shop.name;
  document.getElementById("comment").textContent = comment;

  // 今回の店を保存
  lastShop = shop.name;

  isSpinning = false;
  button.disabled = false;
}, 1000); // 1秒待つ
});
