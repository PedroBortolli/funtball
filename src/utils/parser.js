const beautify = (str) => {
	if (!str) return ''
	let string = str.replace(/"|'/g, '')
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export default beautify