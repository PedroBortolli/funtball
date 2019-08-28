import React, {useState, useReducer, useEffect} from 'react'
import styled from 'styled-components'
import fetchApi from '../api/fetch'
import beautify from '../utils/parser'
import {getCredentials} from './services'
import loading from '../utils/loading'
import i18n from '../utils/i18n'
import {url} from '../utils/constants'
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
	> h2 {
		margin-top: 16px;
		margin-bottom: 24px;
	}
`

const Center = styled.div`
	display: flex;
	justify-content: center;
`

function Login(props) {
	const [loggedIn, changeLoggedIn] = useState(null)
	const [form, update] = useReducer((state, action) => {
		return {
			...state,
			[action.key]: action.value
		}
	}, {})
	
	useEffect(() => {
		const getToken = async () => {
			const tempCredentials = await getCredentials()
			changeLoggedIn(tempCredentials ? true : false)
		}
		getToken()
	}, [])

	const msg = props.history.getCurrentLocation().state

	const tryLogin = async (form) => {
		const ref = document.getElementById('login-response')
		ref.innerHTML = `<img src=${loading()} height="42" width="42"/>`
		const response = await fetchApi('POST', `${url}/sign-in`, undefined, {
			username: form.username,
			password: form.password
		})
		setTimeout(() => {
			if (response.message === 'Account not confirmed')
			ref.innerHTML = beautify(response.message)

		}, 1000)
		if (response.status === 200) {
			await localStorage.setItem('auth-jwt', response.token)
			changeLoggedIn(true)
			props.history.goBack()
			//Route.browserHistory.push('/')
		}
		else ref.innerHTML = i18n('Invalid username/password')
	}

	if (loggedIn) props.history.push('/')

	return (
		!loggedIn ?
		<Center>
			<Container>
				<h2>{i18n('Login')}</h2>
				<div style={{color: '#d60000', paddingBottom: 10, fontWeight: 900}}>{msg}</div>
				<input type="text" style={{width: '200px'}} className="form-control customForm" placeholder={i18n('Username')} 
					onChange={(e) => update({key: 'username', value: e.target.value})} autoCapitalize="off"
					onKeyPress={(e) => e.key === 'Enter' && tryLogin(form)} autoFocus/>
				<input type="password" style={{width: '200px'}} className="form-control customForm" placeholder={i18n('Password')} 
					onChange={(e) => update({key: 'password', value: e.target.value})}
					onKeyPress={(e) => e.key === 'Enter' && tryLogin(form)}/>
				<div id="login-response" style={{height: 60, paddingTop: 12, width: 300, textAlign: 'center'}}></div>
				<button type="button" style={{width: '100px'}} className="btn btn-light" 
					onClick={() => tryLogin(form)}>{i18n('Log in')}</button>
			</Container>
		</Center>
		:
		<Center>
			<h3>{i18n('Already logged in. Redirecting...')}</h3>
		</Center>
	)
}

export default Login