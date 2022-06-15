// @ts-nocheck

// Unmount test
function unMountTest() {
	const btn = document.querySelector('[is="my-button"]')
	setTimeout(() => {
		if (btn) {
			btn.remove()
		}
	}, 3000)
}
unMountTest()

// Get test
const div = dom.get("div")
div.innerHTML = "<h1>Hello!</h1>"

// Get all test
const lis = dom.getAll("li")
for (const li of lis) {
	li.innerHTML = "Hiya!"
}

// Listener tets
const btn = dom.get("button")

function log() {
	console.log("hello")
}

btn.addListener("click", log)
btn.style.background = "green"
setTimeout(() => {
	btn.removeListener("click", log)
	btn.style.background = "red"
}, 10000)

const p = dom.create("p.para")
p.textContent = "Florem"

const pp = dom.create(".container p")
pp.textContent = "Borem"

const ppp = dom.create("p.more-text")
ppp.textContent = "More text"
