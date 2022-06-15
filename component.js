import { decamel } from "./utils.js";

export function Comp(
	{ name, elm, template, init, mount, unmount, mutated, props },
	...methods
) {
	try {
		const elmMap = {
			button: "HTMLButtonElement",
		};

		if (elm && template) {
			console.error("Cannot attach shadow root to non-generic elements")
			console.error(
				"Choose between hyphenated element name and native element with is attribute"
			);
		}

		let comp = Function(`
			let comp;
			class ${name} extends ${elmMap[elm] ? elmMap[elm] : "HTMLElement"} {
				constructor() {
					super();

					comp = this;

					${
						template
							? `
						let shad = this.attachShadow({ mode: "open" });
						let temp = dom.get("#${name}");
						let cl = temp.content.cloneNode(true);
						shad.appendChild(cl);
					`
							: ""
					}

					${init ? `(${init}).call(this);` : ""}

					let methods = ${methods.toString().replaceAll(",function", ";\nfunction")};

					${methods
						.map((_, i) => `this.${methods[i].name} = ${methods[i]};;`)
						.toString()
						.replaceAll(";,", "\n")
					}

					${methods
						.map(
							(_, i) =>
								`this.${methods[i].name} = this.${methods[i].name}.bind(this);;`
						)
						.toString()
						.replaceAll(";,", "\n")
					}
				}

				connectedCallback() {
					${mount ? `this.unmount = (${mount}).call(this);` : ""}
				}

				disconnectedCallback() {
					${unmount ? `(${unmount}).call(this);` : ""}
					this.unmount && this.unmount.call(this);
				}

				attributeChangedCallback(attrName, oldVal, newVal) {
					console.log("+++++++++++++++++++++++");
					console.log("CHANGED:", attrName);
					${mutated ? `(${mutated}).call(this, attrName, oldVal, newVal);` : ""}
				}

				static get observedAttributes() {
					return [${props.map((p) => `"${p}"`).toString()}]
				}

				${props
					.map(
						(prop) =>
							`get ${prop}() {return this.getAttribute("${prop}")};\nset ${prop}(val) {this.setAttribute("${prop}",val)};`
					).toString().replaceAll(',get', "\nget").replaceAll(',set', "\nset")}
			}
			customElements.define("${decamel(name)}", ${name}, ${elm && `{extends:"${elm}"}`})
			return (comp)
		`)();

		return comp
	} catch (err) {
		console.error(err);
	}
}
