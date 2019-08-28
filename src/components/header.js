import React, {useState, useEffect} from 'react'
import {Link} from 'react-router'
import {getCredentials} from '../auth/services'
import logo from '../assets/funtball-logo.png'
import styled from 'styled-components'
import {primaryColor} from '../utils/constants'
import { isMobile } from '../utils/modules'
import fetchApi from '../api/fetch'
import pointsLoading from '../assets/loadings/1.gif'
import useScreenSize from '../hooks/useScreenSize'
import {url} from '../utils/constants'
import Menu from 'react-burger-menu/lib/menus/slide'
import Brazil from '../assets/brazil.png'
import USA from '../assets/usa.png'
import i18n from '../utils/i18n'
import './css/side-menu.css'

const HeaderContainer = styled.div`
	position: fixed;
	width: 1006px;
	background: #ffffff;
	z-index: 999;
	padding-bottom: 8px;
	border-bottom: ${props => props.renderBorder ? '1px solid rgba(0, 0, 0, 0.1)' : 0};
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
const User = styled.div`
	position: fixed;
	top: 60px;
	width: 100%;
	z-index: 800;
	height: 40px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: flex-start;
	padding-left: 12px;
	font-size: 22px;
	background-color: #ffffff;
	> span:nth-child(1) {
		margin-right: 18px;
		font-weight: 900;
	}
`
const Flags = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	> img {
		:not(:last-child) {
			margin-bottom: 5px;
		}
		cursor: pointer;
	}
`
const FlagsMobile = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 28px;
	> img {
		:not(:last-child) {
			margin-right: 16px;
		}
	}
`

const setLang = (lang) => {
	if (localStorage.getItem('i18n') !== lang) {
		localStorage.setItem('i18n', lang)
		window.location.reload()
	}
}

function Header({menuOpen, changeMenuOpen, isDashMobile}) {
	const [width] = useScreenSize()
	const [userPoints, setUserPoints] = useState(null)
	const [dashboard, updateDashboard] = useState(0)
	const [menuActive, changeMenuActive] = useState(false)
	const [credentials, setCredentials] = useState(null)
	useEffect(() => {
		const fetchPoints = async () => {
			const requestBegin = + new Date()
			const tempCredentials = await getCredentials()
			setCredentials(tempCredentials)
			if (tempCredentials) {
				const pts = await fetchApi('GET', `${url}/get-points/${tempCredentials.username}`)
				setTimeout(() => {setUserPoints(pts.points)}, Math.max(1, 400 - (new Date() - requestBegin)))
			}
		}
		fetchPoints()
	}, [dashboard, window.location.href])

	const toggleMenu = (state) => {
		changeMenuActive(state.isOpen)
		if (!state.isOpen) {
			setTimeout(() => {
				changeMenuOpen(false)
			}, 300)
		}
		else changeMenuOpen(true)
	}
	const closeMenu = () => {
		changeMenuActive(false)
		setTimeout(() => {
			changeMenuOpen(false)
		}, 300)
	}

	return (
		<HeaderContainer renderBorder={!isDashMobile}>
			{isMobile(width) &&
			<Menu isOpen={menuActive} onStateChange={state => toggleMenu(state)} right width={'180px'}>
				<a className='menu-item'>
					<FlagsMobile>
						<img src={Brazil} width={24} height={16.8} alt='Change language to Portuguese' onClick={() => setLang('pt-br')} />
						<img src={USA} width={24} height={12.93} alt='Change language to English'  onClick={() => setLang('en-us')} />
					</FlagsMobile>
				</a>
				{!credentials &&
					<a className='menu-item'>
						<Link to="/login" onClick={closeMenu} style={{color: primaryColor}}>{i18n('Login')}</Link>
					</a>
				}
				<a className='menu-item'>
					{credentials && 
					<Link to={{pathname: "/dashboard", upd: updateDashboard}} onClick={closeMenu} style={{color: primaryColor}}>{i18n('Dashboard')}</Link>}
				</a>
				<a className='menu-item'>
					<Link to="/ranking" onClick={closeMenu} style={{color: primaryColor}}>Ranking</Link>
				</a>
				{credentials &&
					<a className='menu-item'>
						<Link to="/logoff" onClick={closeMenu} style={{color: primaryColor}}>{i18n('Logoff')}</Link>
					</a>
				}
			</Menu>}
			{isDashMobile && isMobile(width) && credentials &&
				<User id='oi'>
					<span>{credentials.username}:</span>
					<span>{typeof userPoints === 'number' ? userPoints : <img width={26} height={26} src={pointsLoading} alt='' />} {i18n('Points')}</span>
				</User>
			}
			<Container>
				<Link to="/">
					<img alt='' style={{float: 'left'}} src={logo} width={isMobile(width) ? 230 : 230} height={isMobile(width) ? 60 : 60} />
				</Link>
				{!isMobile(width) &&
				<MenuOptions>
					{credentials &&
					<div style={{color: primaryColor, marginRight: 32}}>
						{credentials.username}: {typeof userPoints === 'number' ? userPoints : <img width={26} height={26} src={pointsLoading} alt='' />} {i18n('Points')}
					</div>}
					{credentials && <Link to={{pathname: "/dashboard", upd: updateDashboard}} style={{color: primaryColor}}>{i18n('Dashboard')}</Link>}
					<Link to="/ranking" style={{color: primaryColor}}>Ranking</Link>
					{credentials ?
						<Link to="/logoff" style={{color: primaryColor}}>{i18n('Logoff')}</Link>
						:
						<Link to="/login" style={{color: primaryColor}}>{i18n('Login')}</Link>
					}
					<Flags>
						<img src={Brazil} width={24} height={16.8} alt='Change language to Portuguese' onClick={() => setLang('pt-br')} />
						<img src={USA} width={24} height={12.93} alt='Change language to English' onClick={() => setLang('en-us')} />
					</Flags>
				</MenuOptions>}
			</Container>
		</HeaderContainer>
	)
}

export default Header