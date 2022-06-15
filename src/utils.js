export function decamel(str) {
	let ds = ""
	for (let i = 0; i < str.length; i++) {
		if (i === 0) {
			ds += str[i].toLowerCase()
			continue
		}
		if (/[A-Z]/.test(str[i])) {
			ds += `-${str[i].toLowerCase()}`
			continue
		}
		ds += str[i]
	}
	return ds
}

export function isBrowser() {
	if (typeof window === "undefined" || typeof Element === "undefined") {
		return false
	}
	return true
}
