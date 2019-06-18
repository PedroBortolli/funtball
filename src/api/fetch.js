const fetchApi = async (method, url, signal, body) => {
	const response = await fetch(url, {
		method: method,
		signal: signal,
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