import React, {useState, useEffect} from 'react'
import {Link} from 'react-router'
import {getCredentials} from '../auth/services'
import logo from '../assets/funtball-logo.png'
import styled from 'styled-components'
import {primaryColor} from '../utils/constants'
import fetchApi from '../api/fetch'
import pointsLoading from '../assets/loadings/1.gif'

const url = 'http://localhost:5000/'

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
	> * {
		margin-left: 32px;
		font-size: 22px;
	}
`

function Header() {
	const [userPoints, setUserPoints] = useState(null)
	const [dashboard, updateDashboard] = useState(0)
	useEffect(() => {
		const fetchPoints = async () => {
			const requestBegin = + new Date()
			const pts = await fetchApi('GET', url + 'get-points/pedro')
			setTimeout(() => {setUserPoints(pts.points)}, Math.max(1, 400 - (new Date() - requestBegin)))
		}
		fetchPoints()
	}, [dashboard])

	const credentials = getCredentials()

	return (
		<div>
			<Container>
				<Link to="/">
					<img alt='' style={{float: 'left'}} src={logo} width="230" height="60" />
				</Link> 
				<MenuOptions>
					{credentials &&
					<div style={{color: primaryColor}}>
						{userPoints || <img width={26} height={26} src={pointsLoading} alt='' />} Points
					</div>}
					<Link to="/ranking" style={{color: primaryColor}}>Ranking</Link>
					<Link to={{pathname: "/dashboard", upd: updateDashboard}} style={{color: primaryColor}}>Dashboard</Link>
					{getCredentials() ?
						<Link to="/logoff" style={{color: primaryColor}}>Logoff</Link>
						:
						<Link to="/login" style={{color: primaryColor}}>Login</Link>
					}
				</MenuOptions>
			</Container>
			<hr style={{borderWidth: 1}} />
		</div>
	)
}

export default Header