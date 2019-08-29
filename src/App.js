import React, {useState, useEffect} from 'react';
import {getCredentials} from './auth/services'
import Header from './components/header'
import styled from 'styled-components'
import { primaryColor } from './utils/constants'
import { isMobile } from './utils/modules'
import useScreenSize from './hooks/useScreenSize'
import Pointer from './components/pointer'
import i18n from './utils/i18n'
import footballGif from './assets/loadings/5.gif'
import GitHubLogo from './assets/github-logo.png'
import TwitterLogo from './assets/twitter-logo.png'

const AppContainer = styled.div`
	width: ${props => props.width > 1005 ? '1006px' : '100%'};
	height: 100vh;
	font-family: 'Bookman Old Style';
	margin-left: ${props => props.width > 1005 ? 'calc((100vw - 1006px)/2)' : 0};
	> * {color: ${primaryColor}}
`
const Center = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	> h1, h2 {
		text-align: center;
	}
`
const Home = styled.div`
`
const Row = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	margin-top: 50px;
	> #text {
		width: 500px;
		text-align: center;
	}
	> :not(:last-child) {margin-right: 50px}
`
const ImgLinks = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 36px;
	> :not(:last-child) {margin-right: 16px}
`
const Footer = styled.div`
	margin-top: 36px;
`

function App(props) {
	const [width, height] = useScreenSize()
	const [foo, update] = useState(0)
	const [menuOpen, changeMenuOpen] = useState(false)
	const [isDashMobile, changeDashMobile] = useState(false)
	const [credentials, setCredentials] = useState(null)
	useEffect(() => {
		const getToken = async () => {
			const cred = await getCredentials()
			setCredentials(cred)
		}
		getToken()
	}, [window.location.href])
	const forceUpdate = () => update(+ new Date())
	const gap = 90

	let divStyle = {height: '100%', paddingTop: gap}
	if (menuOpen) divStyle = {height: '100%', top: gap, zIndex: -1, position: 'relative'}
	if (isDashMobile && (!props.children || props.children.props.route.path !== '/dashboard')) changeDashMobile(false)
	return (
		<AppContainer width={width} height={height}>
			<Header key={foo} menuOpen={menuOpen} changeMenuOpen={changeMenuOpen} isDashMobile={isDashMobile} />
			<div style={divStyle}>
				{props.children ?
					React.cloneElement(props.children, props={update: forceUpdate, 
										isDashMobile: isDashMobile, changeDashMobile: changeDashMobile})
					:
					<div>
						<Center>
							{!isMobile(width) ?
							<h1>{i18n('Welcome to Funtball!')}</h1>
							:
							<h2>{i18n('Welcome to Funtball!')}</h2>}
							{credentials && <span>{i18n('You are logged in as')} <b>{credentials.username}</b></span>}
						</Center>
						<Home>
							<Row style={isMobile(width) ? {marginLeft: 16, marginRight: 16} : {}}>
								<span id='text'>{i18n(`Funtball is a new pick 'em styled fantasy football game under development`)}</span>
								<Pointer direction='left' />
							</Row>
							<Row style={isMobile(width) ? {marginLeft: 16, marginRight: 16} : {}}>
								<Pointer direction='right' />
								<span id='text'>{i18n(`Score points by correctly choosing the winner of every game from the upcoming football season`)}</span>
							</Row>
							<Row style={isMobile(width) ? {marginLeft: 16, marginRight: 16} : {}}>
								<span id='text'>{i18n(`Points may also be gained by correctly guessing the score difference of a given game`)}</span>
								<Pointer direction='left' />
							</Row>
							<Row style={isMobile(width) ? {marginLeft: 16, marginRight: 16} : {}}>
								<Pointer direction='right' />
								<span id='text'>{i18n(`Play smart! Sacrifice points to double up the reward obtained from a correctly guessed game`)}</span>
							</Row>
						</Home>
						<Center style={{marginTop: 48}}>
							<img alt='' src={footballGif} width={120} height={120} />
						</Center>
						<Footer>
							<ImgLinks>
								<a target='_blank' href="https://github.com/PedroBortolli/funtball" rel='noopener noreferrer' style={{cursor: 'poiinter'}}>
									<img alt='' src={GitHubLogo} width={42} height={42}/>
								</a>
								<a target='_blank' href="https://twitter.com/PedroBortolli" rel='noopener noreferrer' style={{cursor: 'poiinter'}}>
									<img alt='' src={TwitterLogo} width={42} height={42}/>
								</a>
							</ImgLinks>
							<Center style={{textAlign: 'center', marginTop: 12, fontSize: 11}}>
								<span>{i18n("Funtball isn't affiliated with the NFL in any manner. Funtball is a recreative project and non-commercial.")}</span>
								<span>{i18n('All the logos from the 32 teams belong exclusively to the NFL. Funtball is a non-profit purposes project.')}</span>
							</Center>
						</Footer>
					</div>
				}
			</div>
		</AppContainer>
	)
}

export default App;
