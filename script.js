let isSpinning = false;

let lunchList = [];

fetch("lunch_list.json")
  .then(response => response.json())
  .then(data => {
    lunchList = data;
  });

document.getElementById("gachaBtn").addEventListener("click", () => {
  if (isSpinning) return;
  if (lunchList.length === 0) return;

  isSpinning = true;

  document.getElementById("shop").textContent = "ガチャ回し中…";
  document.getElementById("comment").textContent = "";

  setTimeout(() => {
    const shop =
      lunchList[Math.floor(Math.random() * lunchList.length)];
    const comment =
      shop.comments[Math.floor(Math.random() * shop.comments.length)];

    document.getElementById("shop").textContent = shop.name;
    document.getElementById("comment").textContent = comment;

    isSpinning = false;
  }, 800); // 0.8秒待つ
});

const button = document.getElementById("gachaBtn");
button.disabled = true;

// 結果表示後
button.disabled = false;
