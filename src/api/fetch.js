const fetchApi = async (url, body) => {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
	try {
		const content = await response.json()
		return {
			...content,
			ok: response.ok,
			redirected: response.redirected,
			status: response.status,
			statusText: response.statusText
		}
	}
	catch (err) { return response }
}

export default fetchApi