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

const MenuOptions = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	* {
		margin-left: 32px;
	}
`

function Header() {
	return (
		<div>
			<Container>
				<img style={{float: 'left'}} src={logo} width="280" height="80" />
				<MenuOptions>
					<Link to="/ranking" style={{fontSize: 22}}>Ranking</Link>
					<Link to="/dashboard" style={{fontSize: 22}}>Dashboard</Link>
					{getCredentials() ?
						<Link to="/logoff" style={{fontSize: 22}}>Logoff</Link>
						:
						<Link to="/login" style={{fontSize: 22}}>Login</Link>
					}
				</MenuOptions>
			</Container>
			<hr style={{borderWidth: 1}} />
		</div>
	)
}

export default Header