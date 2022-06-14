// Unmount test
function unMountTest() {
  const btn = document.querySelector('[is="my-button"]');
  setTimeout(() => {
    btn.remove();
  }, 3000);
}
unMountTest();

const div = dom.get("div");
div.innerHTML = "<h1>Hello!</h1>";

const lis = dom.getAll("li");
for (const li of lis) {
  li.innerHTML = "Hiya!";
}

const btn = dom.get("button");
function log() {
  console.log("hello");
}

btn.addListener("click", log);
btn.style.background = "green";
setTimeout(() => {
  btn.removeListener("click", log);
  btn.style.background = "red";
}, 10000);

// const p = dom.create(".para", "p");
// const pp = dom.create(".container p", "p");
// pp.textContent = "Borem";
// const cont = dom.get(".container");
// cont.append(p);
// cont.append(pp);
