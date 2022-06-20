// @ts-nocheck
window.dom = document

// Get
Node.prototype.get = function (sel) {
	return this.querySelector.bind(this).call(this, sel)
}

// Get all
Node.prototype.getAll = function (sel) {
	return this.querySelectorAll.bind(this).call(this, sel)
}

// Text content
Node.prototype.text = function (text) {
	this.textContent = text
}

// HTML content
Node.prototype.html = function (text) {
	this.innerHTML = text
}

// Give node lists array properties
NodeList.prototype.__proto__ = Array.prototype

// Listeners
Node.prototype.addListener = window.addListener = function (name, fn) {
	this.addEventListener(name, fn)
}

NodeList.prototype.addListener = NodeList.prototype.addEventListener = function (name, fn) {
	this.forEach(elem => {
		elem.addListener(name, fn)
	})
}

Node.prototype.removeListener = window.removeListener = function (name, fn) {
	this.removeEventListener(name, fn)
}

NodeList.prototype.removeListener = NodeList.prototype.removeEventListener = function (name, fn) {
	this.forEach(elem => {
		elem.removeListener(name, fn)
	})
}

// Create element
/**
 * @typedef Pos
 * @type "beforebegin" | "afterbegin" | "beforeend" | "afterend"
 */
/**
 * @param {string} sel
 * @param {Pos} pos
 */
Node.prototype.create = dom.create = (sel, pos) => {
	let split = sel.split(" ")
	let el = dom.get(sel)

	if (el) {
		el = el.cloneNode()
	}

	let ag = getAttrs(split[split.length - 1])

	if (!el) {
		el = dom.createElement(ag[0])
	}

	setAttrs(el, ag)

	if (split.length == 1) {
		document.body.appendChild(el)
		return el
	}

	let parSel = split.slice(0, split.length - 1)

	let par = dom.get(parSel)
	if (!par) {
		console.error(`Parent Node "${parSel}" does not exist`)
		document.body.appendChild(el)
		return el
	}

	if (pos) {
		par.insertAdjacentElement(pos, el)
		return el
	}

	par.appendChild(el)
	return el
}

/**
 * @typedef AttrTuple
 * @type {[string, string]}
 */
/**
 * @typedef Ag
 * @type {[string, Array<AttrTuple>]}
 */

/**
 * @param {string} sel
 * @return {Ag}
 */
function getAttrs(sel) {
	let ag = []
	let lexVal = false

	let i = 0
	while (i < sel.length) {
		if (i === 0 && !/[a-zA-Z]/.test(sel[i])) {
			ag[0] = "div"
		}

		if (lexVal) {
			if (["#", ".", "["].includes(sel[i])) {
				lexVal = false
				continue
			}

			if (!ag[1][ag[1].length - 1][1]) {
				ag[1][ag[1].length - 1][1] = ""
			}

			ag[1][ag[1].length - 1][1] = ag[1][ag[1].length - 1][1] += sel[i]
			i++
			continue
		}

		if (sel[i] === "#") {
			ag = fill(ag)
			ag[1][ag[1].length - 1][0] = "id"
			lexVal = true
			i++
			continue
		}

		if (sel[i] === ".") {
			ag = fill(ag)
			ag[1][ag[1].length - 1][0] = "class"
			lexVal = true
			i++
			continue
		}

		if (sel[i] === "[") {
			ag = fill(ag)
			let onVal = false
			i++

			while (true) {
				if (i > 100) break
				if (i >= sel.length) {
					return ag
				}

				if (sel[i] === "]") {
					if (!ag[1][ag[1].length - 1][1]) {
						ag[1][ag[1].length - 1][1] = ""
					}
					break
				}

				if (['"', "'", "`"].includes(sel[i])) {
					i++
					continue
				}

				if (sel[i] === "=") {
					onVal = true
					i++
					continue
				}

				if (onVal) {
					if (!ag[1][ag[1].length - 1][1]) {
						ag[1][ag[1].length - 1][1] = ""
					}

					ag[1][ag[1].length - 1][1] = ag[1][ag[1].length - 1][1] += sel[i]
					i++
					continue
				}

				if (!ag[1][ag[1].length - 1][0]) {
					ag[1][ag[1].length - 1][0] = ""
				}

				ag[1][ag[1].length - 1][0] += sel[i]
				i++
			}

			i++
			continue
		}

		if (ag.length - 1 < 0) {
			ag[0] = []
		}
		ag[0] = ag[0] += sel[i]
		i++
	}

	return ag
}

/**
 * @param {[string, Array<AttrTuple>]} ag
 * @return {[string, Array<AttrTuple>]}
 */
function fill(ag) {
	if (!ag[1] || ag[1].length - 1 < 0) {
		ag[1] = []
		ag[1][0] = []
	}
	return ag
}

/**
 * @param {HTMLElement}
 * @param {Array<Ag>}
 */
function setAttrs(el, ag) {
	if (!ag[1] || ag[1].length < 1) {
		return
	}

	for (let i = 0; i < ag[1].length; i++) {
		if (ag[1][i][0] === "class") {
			el.classList.add(ag[1][i][1])
			continue
		}
		el.setAttribute(ag[1][i][0], ag[1][i][1])
	}
}

// Fetch / HTTP
class Http {
	async get(url, opts = {}, rf = "json") {
		let res = await fetch(url, opts)
		return await res[rf]()
	}

	async post(url, opts = {}, rf = "json") {
		let res = await fetch(url, {
			...opts,
			method: "POST",
		})
		return await res[rf]()
	}
}

export const http = new Http()
