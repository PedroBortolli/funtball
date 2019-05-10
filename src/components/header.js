import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {getCredentials, assertAuth} from '../auth/services'
import logo from '../assets/funtball-logo.png'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

function Header() {
	useEffect(() => {
		console.log("Header =)")
	})
	
	return (
		<div>
			<Container>
				<img src={logo} width="280" height="100" />
				<Link to="/ranking" style={{fontSize: 22}}>Ranking</Link>
				<Link to="/dashboard" style={{fontSize: 22}}>Dashboard</Link>
				{getCredentials() ?
					<Link to="/logout" style={{fontSize: 22}}>Logout</Link>
					:
					<Link to="/login" style={{fontSize: 22}}>Login</Link>
				}
			</Container>
			<hr style={{borderWidth: 1}} />
		</div>
	)
}

export default Header