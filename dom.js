import { decamel } from "./utils.js";

export function Comp(
  { name, elm, init, mount, unmount, mutated, props },
  ...methods
) {
  try {
    const elmMap = {
      button: "HTMLButtonElement",
    };

    Function(`class ${name} extends ${elmMap["button"]} {
			constructor() {
				super();

				this.attachShadow({ mode: "open" })

				let temp = document.getElementById("${name}")
				let cl = temp.content.cloneNode(true)
				this.shadowRoot.appendChild(cl)

				(${init && init}).call(this);

				let methods = ${methods};
				${methods
          .map((_, i) => `this.${methods[i].name} = ${methods[i]};`)
          .toString()
          .replaceAll("},", "};")}
				${methods
          .map(
            (_, i) =>
              `this.${methods[i].name} = this.${methods[i].name}.bind(this);`
          )
          .toString()
          .replaceAll("},", "};")}
			}

			connectedCallback() {
				this.unmount = (${mount && mount}).call(this);
			}

			disconnectedCallback() {
				(${unmount && unmount}).call(this);
				this.unmount && this.unmount.call(this);
			}

			attributeChangedCallback(attrName, oldVal, newVal) {
				console.log("CHANGED:", attrName);
				(${mutated && mutated}).call(this, attrName, oldVal, newVal);
			}

			static get observedAttributes() {
				${console.log(props.map((p) => `"${p}"`).toString())}
				return [${props.map((p) => `"${p}"`).toString()}]
			}

			${props
        .map(
          (prop) =>
            `get ${prop}() {return this.getAttribute("${prop}")};set ${prop}(val) {this.setAttribute("${prop}",val)}`
        )
        .toString()
        .replaceAll("},", "};")}
			}
			customElements.define("${decamel(name)}", ${name},{extends:"${elm}"})
		`)();
  } catch (err) {
    console.error(err);
  }
}
