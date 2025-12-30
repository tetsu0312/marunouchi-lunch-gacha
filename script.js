let lunchList = [];

fetch("lunch_list.json")
  .then(response => response.json())
  .then(data => {
    lunchList = data;
  });

document.getElementById("gachaBtn").addEventListener("click", () => {
  if (lunchList.length === 0) return;

  const shop = lunchList[Math.floor(Math.random() * lunchList.length)];
  const comment =
    shop.comments[Math.floor(Math.random() * shop.comments.length)];

  document.getElementById("shop").textContent = shop.name;
  document.getElementById("comment").textContent = comment;
});
