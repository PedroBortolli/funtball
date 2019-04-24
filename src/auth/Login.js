import React, { useReducer } from 'react'
import styled from 'styled-components'
import fetchApi from '../api/fetch'
import beautify from '../utils/parser'
import loading from '../assets/loading.gif'

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

const tryLogin = async (form) => {
	const ref = document.getElementById('login-response')
	ref.innerHTML = `<img src=${loading} height="32" width="32"/>`
	const response = await fetchApi(url + '/sign-in', {
		username: form.username,
		password: form.password
	})
	ref.innerHTML = beautify(response.message)
}

function Login() {
	const [form, update] = useReducer((state, action) => {
		return {
			...state,
			[action.key]: action.value
		}
	}, {})

	return <Container>
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
}

export default Login