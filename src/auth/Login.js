import React, { useReducer } from 'react'
import styled from 'styled-components'
import fetchApi from '../api/fetch'
import beautify from '../utils/parser'

const url = 'http://localhost:5000'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	* {margin: 16px}
	border: 1px solid #61acea;
	border-radius:20px;
	-moz-border-radius:20px;
	-webkit-border-radius:20px;
`

const tryLogin = async (username, password) => {
	const ref = document.getElementById('login-response')
	ref.innerHTML = ''
	const response = await fetchApi(url + '/sign-in', {
		username: username,
		password: password
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
		<form>
			<input type="text" style={{width: '200px'}} className="form-control" placeholder="Username" 
				onChange={(e) => update({key: 'username', value: e.target.value})}/>
			<input type="password" style={{width: '200px'}} className="form-control" placeholder="Password" 
				onChange={(e) => update({key: 'password', value: e.target.value})}/>
			<div id="login-response"></div>
			<button type="button" style={{width: '100px'}} className="btn btn-light" 
				onClick={() => tryLogin(form.username, form.password)}>Submit</button>
		</form>
	</Container>
}

export default Login