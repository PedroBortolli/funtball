import React/*, { useReducer }*/ from 'react';
import {getCredentials} from './auth/services'
import Header from './components/header'
import './App.css'

function App(props) {
	const credentials = getCredentials()
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
			*/}

		</div>
	)
}

export default App;
