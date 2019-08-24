import React, {useState, useReducer} from 'react'
import styled from 'styled-components'
import fetchApi from '../api/fetch'
import beautify from '../utils/parser'
import loading from '../utils/loading'
import {url} from '../utils/constants'
import ReCaptcha from 'react-google-recaptcha'
import '../components/css/login.css'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 400px;
	> {
		margin: 16px;
		margin-top: 0px;
	}
	> :first-child { margin-top: 16px }
	> input {
		width: 200px;
	}
	> h2 {
		margin-bottom: 24px;
	}
`

const Center = styled.div`
	display: flex;
	justify-content: center;
`

function Signup(props) {
	const [captcha, setCaptcha] = useState(false)
	const [form, update] = useReducer((state, action) => {
		return {
			...state,
			[action.key]: action.value
		}
	}, {})
	const msg = props.history.getCurrentLocation().state

	const trySignUp = async (form) => {
		const ref = document.getElementById('signup-response')
		ref.innerHTML = `<img src=${loading()} height="42" width="42"/>`
		let msg = '', response
		if (!captcha) msg = `Please complete the captcha verification`
		else if (!form.username) msg = `Please choose a valid username`
		else if (!form.email) msg = `Please provide a valid e-mail`
		else if (!form.password) msg = `Please choose a valid password`
		else if (form.email !== form.emailCheck) msg = `E-mails don't match`
		else if (form.password !== form.passwordCheck) msg = `Passwords don't match`
		else {
			response = await fetchApi('POST', `${url}/sign-up`, undefined, {
				username: form.username,
				password: form.password,
				email: form.email
			})
			msg = response.message
		}
		setTimeout(() => {
			ref.innerHTML = beautify(msg)
		}, 750)
	}

	return (
		<Center>
			<Container>
				<h2>Sign up</h2>
				<div style={{color: '#d60000', paddingBottom: 10, fontWeight: 900}}>{msg}</div>
				<input type="text" className="form-control customForm" placeholder="Username" 
					onChange={(e) => update({key: 'username', value: e.target.value})} autoFocus/>

				<input type="text" className="form-control customForm" placeholder="E-mail" 
					onChange={(e) => update({key: 'email', value: e.target.value})} />

					<input type="text" className="form-control customForm" placeholder="Repeat e-mail" 
					onChange={(e) => update({key: 'emailCheck', value: e.target.value})} />

				<input type="password" className="form-control customForm" placeholder="Password" 
					onChange={(e) => update({key: 'password', value: e.target.value})} />

				<input type="password" className="form-control customForm" placeholder="Repeat password" 
					onChange={(e) => update({key: 'passwordCheck', value: e.target.value})} />

				<ReCaptcha sitekey="6Ld3n7QUAAAAABWNyyH3fIDHUuBqQ7rJxee2qfpz" onChange={() => setCaptcha(true)} />

				<div id="signup-response" style={{padding: '9px 8px 12px 9px', textAlign: 'center', width: 300, textAlign: 'center'}}></div>
				<button type="button" style={{width: '100px'}} className="btn btn-light" 
					onClick={() => trySignUp(form)}>Sign up</button>
			</Container>
		</Center>
	)
}

export default Signup