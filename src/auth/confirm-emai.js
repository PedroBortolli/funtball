import React, {useState, useEffect} from 'react'
import fetchApi from '../api/fetch'
import {url} from '../utils/constants'

function ConfirmEmail() {
	const [confirmed, set] = useState(null)
	useEffect(() => {
		const confirm = async () => {
			const arg = new URL(window.location.href)
			const token = arg.searchParams.get('token')
			const response = await fetchApi('PUT', `${url}/confirm-email/${token}`)
			if (response.ok) set(true)
			else set(false)
		}
		confirm()
	}, [])
	
	if (confirmed) window.location = `${url}/login`

	return (
		set ? <h3>Account {confirmed ? 'confirmed. Redirecting...' : 'not confirmed...'}</h3>
		:
		<h3>Validating...</h3>
	)
}

export default ConfirmEmail