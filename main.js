window.dom = document;

// Give nodelists array properties
NodeList.prototype.__proto__ = Array.prototype;

// Get
Node.prototype.get = dom.querySelector.bind(dom);
NodeList.prototype.get = dom.querySelector.bind(dom);

// Get all
Node.prototype.getAll = dom.querySelectorAll.bind(dom);
NodeList.prototype.getAll = dom.querySelectorAll.bind(dom);

// Listeners
Node.prototype.addListener = window.addListener = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.addListener = NodeList.prototype.addEventListener =
  function (name, fn) {
    this.forEach(function (elem, i) {
      elem.addListener(name, fn);
    });
  };

Node.prototype.removeListener = window.removeListener = function (name, fn) {
  this.removeEventListener(name, fn);
};

NodeList.prototype.removeListener = NodeList.prototype.removeEventListener =
  function (name, fn) {
    this.forEach(function (elem, i) {
      elem.removeListener(name, fn);
    });
  };

// // Create element
// Node.prototype.create = dom.create = function (sel, elm) {
//   if (dom.get(sel)) {
//     return dom.get(sel);
//   }
//   return dom.createElement(elm);
// };
