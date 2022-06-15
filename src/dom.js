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
Node.prototype.create = dom.create = sel => {
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

	let par = dom.get(split.slice(0, split.length - 1))
	par.appendChild(el)
	return el
}

/**
 * @typedef AttrTuple
 * @type {[string, string]}
 */

/**
 * @param {string} sel
 * @return {[string, Array<AttrTuple>]}
 */
function getAttrs(sel) {
	let ag = []
	let delims = ["#", ".", "["]
	let lexVal = false

	let i = 0
	while (i < sel.length) {
		if (i === 0 && !/[a-zA-Z]/.test(sel[i])) {
			ag[0] = "div"
		}

		if (lexVal) {
			if (delims.includes(sel[i])) {
				lexVal = false
				continue
			}
			if (!ag[1][ag[1].length - 1][1]) [(ag[1][ag[1].length - 1][1] = "")]
			ag[1][ag[1].length - 1][1] = ag[1][ag[1].length - 1][1] += sel[i]
			i++
			continue
		}

		if (sel[i] === "#") {
			if (!ag[1] || ag[1].length - 1 < 0) {
				ag[1] = []
				ag[1][0] = []
			}
			ag[1][ag[1].length - 1][0] = "id"
			lexVal = true
			i++
			continue
		}

		if (sel[i] === ".") {
			if (!ag[1] || ag[1].length - 1 < 0) {
				ag[1] = []
				ag[1][0] = []
			}
			ag[1][ag[1].length - 1][0] = "class"
			lexVal = true
			i++
			continue
		}

		if (sel[i] === "[") {
			if (!ag[1] || ag[1].length - 1 < 0) {
				ag[1] = []
				ag[1][0] = []
			}
			// aag.length - 1][0] = "class"
			// let attr = []
			// let sp = sel.split("")
			// let onVal = false
			// for (let ii = 1; ii < sp - 1; i++) {
			// 	if (sp[ii] === "=") {
			// 		onVal = true
			// 		continue
			// 	}
			// 	if (onVal) {
			// 		attr[1] += sp[ii]
			// 		continue
			// 	}
			// 	attr[0] += sp[ii]
			// }
			lexVal = true
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
 * @param {HTMLElement}
 * @param {Array<any>}
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
