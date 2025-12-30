// ==============================
// 状態管理用の変数
// ==============================

// ガチャが回転中かどうかを管理するフラグ
let isSpinning = false;

// JSONから読み込んだランチ一覧を入れる配列
let lunchList = [];

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
  document.getElementById("shop").textContent = "ガチャ回し中…";
  document.getElementById("comment").textContent = "";

  // 少し待ってから結果を表示（ガチャ演出）
  setTimeout(() => {
    // ランチ一覧からランダムで1店舗選ぶ
    const shop =
      lunchList[Math.floor(Math.random() * lunchList.length)];

    // 選ばれた店舗のコメントからランダムで1つ選ぶ
    const comment =
      shop.comments[Math.floor(Math.random() * shop.comments.length)];

    // 画面に結果を表示
    document.getElementById("shop").textContent = shop.name;
    document.getElementById("comment").textContent = comment;

    // ガチャ回転終了
    isSpinning = false;
    button.disabled = false;
  }, 800); // 0.8秒待つ
});
