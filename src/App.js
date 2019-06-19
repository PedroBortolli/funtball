import React, {useState} from 'react';
import {getCredentials} from './auth/services'
import Header from './components/header'
import styled from 'styled-components'
import { primaryColor } from './utils/constants'
import useScreenSize from './hooks/useScreenSize'

const AppContainer = styled.div`
	width: ${props => props.width > 987 ? '988px' : '100%'};
	height: 100vh;
	font-family: "Bookman Old Style";
	margin-left: ${props => props.width > 987 ? 'calc((100% - 966px)/2)' : 0};
	margin-right: ${props => props.with > 987 ? 'calc((100% - 966px)/2)' : 0};
`
const Container = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
	padding-top: 24px;
	> * {
		color: ${primaryColor}
	}
`

function App(props) {
	const [width, height] = useScreenSize()
	const [foo, update] = useState(0)
	const credentials = getCredentials()
	const forceUpdate = () => update(+ new Date())
	return (
		<AppContainer width={width} height={height}>
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

		</AppContainer>
	)
}

export default App;
