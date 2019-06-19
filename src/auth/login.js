import React, {useState, useReducer} from 'react'
import styled from 'styled-components'
import fetchApi from '../api/fetch'
import beautify from '../utils/parser'
import {getCredentials} from './services'
import loading from '../utils/loading'

const url = 'http://localhost:5000'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	* {
		margin: 16px;
		margin-top: 0px;
	}
	*:first-child { margin-top: 16px }
	border: 1px solid #61acea;
	border-radius:20px;
	-moz-border-radius:20px;
	-webkit-border-radius:20px;
`

function Login(props) {
	const [loggedIn, changeLoggedIn] = useState(getCredentials() ? true : false)
	const [form, update] = useReducer((state, action) => {
		return {
			...state,
			[action.key]: action.value
		}
	}, {})

	const tryLogin = async (form) => {
		const ref = document.getElementById('login-response')
		ref.innerHTML = `<img src=${loading()} height="48" width="48"/>`
		const response = await fetchApi('POST', `${url}/sign-in`, undefined, {
			username: form.username,
			password: form.password
		})
		ref.innerHTML = beautify(response.message)
		if (response.status === 200) {
			await localStorage.setItem('auth-jwt', response.token)
			changeLoggedIn(true)
			console.log(props.history)
			props.history.goBack()
			//Route.browserHistory.push('/')
		}
	}

	return (
		!loggedIn ?
		<Container>
			<input type="text" style={{width: '200px'}} className="form-control" placeholder="Username" 
				onChange={(e) => update({key: 'username', value: e.target.value})}
				onKeyPress={(e) => e.key === 'Enter' && tryLogin(form)} autoFocus/>
			<input type="password" style={{width: '200px'}} className="form-control" placeholder="Password" 
				onChange={(e) => update({key: 'password', value: e.target.value})}
				onKeyPress={(e) => e.key === 'Enter' && tryLogin(form)}/>
			<div id="login-response"></div>
			<button type="button" style={{width: '100px'}} className="btn btn-light" 
				onClick={() => tryLogin(form)}>Submit</button>
		</Container>
		:
		<Container>
			<h3>Already logged in. Redirecting...</h3>
			{props.history.push('/')}
		</Container>
	)
}

export default Login