import React, {useState} from 'react';
import {getCredentials} from './auth/services'
import Header from './components/header'
import styled from 'styled-components'
import { primaryColor } from './utils/constants'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	padding-top: 24px;
	//height: calc(100vh - 80px);
	> * {
		color: ${primaryColor}
	}
`

function App(props) {
	const credentials = getCredentials()
	const [foo, update] = useState(0)
	const forceUpdate = () => update(+ new Date())
	return (
		<div>
			<Header key={foo} />
			{props.children ?
				React.cloneElement(props.children, props={update: forceUpdate})
				:
				<Container>
					<h2>Welcome to Funtball!</h2>
					{credentials && <p>You are now logged in as <b>{credentials.username}</b></p>}
				</Container>
			}

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
