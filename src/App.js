import React, {useState} from 'react';
import {getCredentials} from './auth/services'
import Header from './components/header'
import './App.css'

function App(props) {
	const credentials = getCredentials()
	const [foo, update] = useState(0)
	const forceUpdate = () => update(+ new Date())
	return (
		<div>
			<Header key={foo} />
			{props.children && React.cloneElement(props.children, props={update: forceUpdate})}

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
