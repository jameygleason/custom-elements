// @ts-ignore
window.dom = document

// Give nodelists array properties
// @ts-ignore
NodeList.prototype.__proto__ = Array.prototype

// Get
// @ts-ignore
Node.prototype.get = dom.querySelector.bind(dom)
// @ts-ignore
NodeList.prototype.get = dom.querySelector.bind(dom)

// Get all
// @ts-ignore
Node.prototype.getAll = dom.querySelectorAll.bind(dom)
// @ts-ignore
NodeList.prototype.getAll = dom.querySelectorAll.bind(dom)

// Listeners
// @ts-ignore
Node.prototype.addListener = window.addListener = function (name, fn) {
	this.addEventListener(name, fn)
}

// @ts-ignore
NodeList.prototype.addListener = NodeList.prototype.addEventListener = function (name, fn) {
	this.forEach(elem => {
		// @ts-ignore
		elem.addListener(name, fn)
	})
}

// @ts-ignore
Node.prototype.removeListener = window.removeListener = function (name, fn) {
	this.removeEventListener(name, fn)
}

// @ts-ignore
NodeList.prototype.removeListener = NodeList.prototype.removeEventListener = function (name, fn) {
	this.forEach(elem => {
		// @ts-ignore
		elem.removeListener(name, fn)
	})
}

// Create element
// @ts-ignore
Node.prototype.create = dom.create = function (sel, elm) {
	// @ts-ignore
	if (dom.get(sel)) {
		// @ts-ignore
		return dom.get(sel)
	}
	// @ts-ignore
	return dom.createElement(elm)
}
