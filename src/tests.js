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
	li.textContent = "Hiya!"
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

// Create test
const p1 = dom.create("p.para")
p1.textContent = "Florem"

const p2 = dom.create(".container p#contained")
p2.textContent = "Borem"

const p3 = dom.create("p.more-text")
p3.textContent = "More text"

const p4 = dom.create('p[test="true"]')
p4.textContent = "Attribute text"

const p5 = dom.create("p[hidden]")
p5.textContent = "Hidden"

// Create list
dom.create("#list h2", "beforebegin").html("<span>Quick list</span>")
for (let i = 0; i < 3; i++) {
	dom.create("#list li").text(`${i} hi`)
}
