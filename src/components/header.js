import React, {useState, useEffect} from 'react'
import {Link} from 'react-router'
import {getCredentials} from '../auth/services'
import logo from '../assets/funtball-logo.png'
import styled from 'styled-components'
import {primaryColor} from '../utils/constants'
import fetchApi from '../api/fetch'
import pointsLoading from '../assets/loadings/1.gif'
import useScreenSize from '../hooks/useScreenSize'
import Menu from 'react-burger-menu/lib/menus/slide'
import './side-menu.css'

const url = 'http://localhost:5000/'

const HeaderContainer = styled.div`
	position: fixed;
	width: 988px;
	background: #ffffff;
`
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
	const [width] = useScreenSize()
	const [userPoints, setUserPoints] = useState(null)
	const [dashboard, updateDashboard] = useState(0)
	const [menuOpen, changeMenuOpen] = useState(false)
	useEffect(() => {
		const fetchPoints = async () => {
			const requestBegin = + new Date()
			const pts = await fetchApi('GET', url + 'get-points/pedro')
			setTimeout(() => {setUserPoints(pts.points)}, Math.max(1, 400 - (new Date() - requestBegin)))
		}
		fetchPoints()
	}, [dashboard])

	const isMobile = () => {
		if (width < 800) return true
		return false
	}
	const toggleMenu = (state) => changeMenuOpen(state.isOpen)
	const closeMenu = () => changeMenuOpen(false)

	const credentials = getCredentials()

	return (
		<HeaderContainer>
			{isMobile() &&
			<Menu isOpen={menuOpen} onStateChange={state => toggleMenu(state)} right width={'180px'}>
				{credentials ?
					<a className='menu-item'>
						<Link to="/logoff" onClick={closeMenu} style={{color: primaryColor}}>Logoff</Link>
					</a>
					:
					<a className='menu-item'>
						<Link to="/login" onClick={closeMenu} style={{color: primaryColor}}>Login</Link>
					</a>
				}
				<a className='menu-item'>
					{credentials && 
					<Link to={{pathname: "/dashboard", upd: updateDashboard}} onClick={closeMenu} style={{color: primaryColor}}>Dashboard</Link>}
				</a>
				<a className='menu-item'>
					<Link to="/ranking" onClick={closeMenu} style={{color: primaryColor}}>Ranking</Link>
				</a>
			</Menu>}
			<Container>
				<Link to="/">
					<img alt='' style={{float: 'left'}} src={logo} width={isMobile() ? 230 : 230} height={isMobile() ? 60 : 60} />
				</Link>
				{!isMobile() &&
				<MenuOptions>
					{credentials &&
					<div style={{color: primaryColor, marginRight: 32}}>
						{credentials.username}: {userPoints || <img width={26} height={26} src={pointsLoading} alt='' />} Points
					</div>}
					{credentials && <Link to={{pathname: "/dashboard", upd: updateDashboard}} style={{color: primaryColor}}>Dashboard</Link>}
					<Link to="/ranking" style={{color: primaryColor}}>Ranking</Link>
					{credentials ?
						<Link to="/logoff" style={{color: primaryColor}}>Logoff</Link>
						:
						<Link to="/login" style={{color: primaryColor}}>Login</Link>
					}
				</MenuOptions>}
			</Container>
			<hr style={{borderWidth: 1}} />
		</HeaderContainer>
	)
}

export default Header