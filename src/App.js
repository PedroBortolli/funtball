import React/*, { useReducer }*/ from 'react';
import {Link} from 'react-router'
import {getCredentials} from './auth/services'
import Header from './components/header'
import './App.css'

function App(props) {
	const credentials = getCredentials()
	/*
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
	*/
	console.log(props)
	return (
		<div>
			<Header />
			{props.children}
			{/*
			{credentials ?
				<div>
					<h1>Hi, {credentials.username}</h1>
					<Link to="/logoff" style={{fontSize: 32}}>Logoff</Link>
				</div>
				:
				<div>
					<h1>Please login to continue</h1>
					<Link to="/login" style={{fontSize: 32}}>Login</Link><br/>
				</div>
			}
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
