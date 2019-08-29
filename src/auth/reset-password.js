import React, {useState} from 'react'
import fetchApi from '../api/fetch'
import i18n from '../utils/i18n'
import {url} from '../utils/constants'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	> h2 {
		margin-bottom: 48px;
	}
	> input {
		width: 200px;
	}
	> button {
		margin-top: 20px;
		width: 100px;
	}
	> p {
		margin-top: 16px;
	}
`

function ResetPassword() {
	const [password, changePassword] = useState(null)
	const [checkPassword, changeCheckPassword] = useState(null)
	const [passwordResponse, setPasswordResponse] = useState(null)

	const sendRequest = async () => {
		setPasswordResponse(null)
		if (password !== checkPassword) return setPasswordResponse(i18n("Passwords don't match"))

		const _url = new URL(window.location.href)
		const email = _url.searchParams.get('email')
		const token = _url.searchParams.get('token')
		const response = await fetchApi('PUT', `${url}/reset-password`, undefined, {
			email: email,
			token: token,
			newPassword: password
		})

		if (!response.ok) setPasswordResponse(i18n("Sorry, an internal error happened and it wasn't possible to reset your password"))
		else setPasswordResponse(i18n('Password successfully reseted'))
	}

	return (
		<Container>
			<h2>{i18n('Create new password')}</h2>
			<input className="form-control customForm" type="password" 
				placeholder={i18n('Password')} onChange={e => changePassword(e.target.value)} />
			<input className="form-control customForm" type="password" 
				placeholder={i18n('Confirm password')} onChange={e => changeCheckPassword(e.target.value)} 
				onKeyPress={(e) => e.key === 'Enter' && sendRequest()} />
			
			{passwordResponse && <p>{passwordResponse}</p>}

			<button type="button" className="btn btn-light" onClick={sendRequest}>
				{i18n('Confirm')}
			</button>
		</Container>
	)
}

export default ResetPassword