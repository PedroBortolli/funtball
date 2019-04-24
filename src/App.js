import React, { useReducer } from 'react';
import {Link} from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import './App.css'

function App() {
	console.log(localStorage.getItem('auth-jwt'))
	const [state, update] = useReducer((state, action) => {
		switch(action.type) {
			case 'add':
				return {
					...state,
					[action.key]: action.value
				}
			case 'remove':
				let newState = {...state}
				if (action.key in newState)
					delete newState[action.key]
				return newState
			default:
		}
	}, {})

	let decoded
	const authJwt = localStorage.getItem('auth-jwt')
	if (authJwt) decoded = jwtDecode(authJwt)
	
	return (
		<div>
			{authJwt ?
				<div>
					<h1>Hi, {decoded.username}</h1>
					<Link to="/logoff" style={{fontSize: 32}}>Logoff</Link>
				</div>
				:
				<div>
					<h1>Please login to continue</h1>
					<Link to="/login" style={{fontSize: 32}}>Login</Link><br/>
				</div>
			}
			
			{/*
			<button onClick={() => update({type: 'add', key: 'Key', value: 'Test'})}>Click!</button>
			<br/>
			<button onClick={() => update({type: 'add', key: 'Key', value: '123'})}>Click!</button>
			<br/>
			<button onClick={() => update({type: 'remove', key: 'Key'})}>Remove...</button>
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<h3>{JSON.stringify(state)}</h3>
			</div>
			*/}
		</div>
	)
}

export default App;
