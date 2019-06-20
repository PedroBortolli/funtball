import React, {useState} from 'react';
import {getCredentials} from './auth/services'
import Header from './components/header'
import styled from 'styled-components'
import { primaryColor } from './utils/constants'
import useScreenSize from './hooks/useScreenSize'
import Pointer from './components/pointer'
import footballGif from './assets/loadings/5.gif'
import GitHubLogo from './assets/github-logo.png'
import TwitterLogo from './assets/twitter-logo.png'

const AppContainer = styled.div`
	width: ${props => props.width > 987 ? '988px' : '100%'};
	height: 100vh;
	font-family: "Bookman Old Style";
	margin-left: ${props => props.width > 987 ? 'calc((100% - 966px)/2)' : 0};
	margin-right: ${props => props.with > 987 ? 'calc((100% - 966px)/2)' : 0};
	> * {color: ${primaryColor}}
`
const Center = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 16px;
`
const Home = styled.div`
	> div:nth-child(odd) {
		margin-left: 115px;
	}
	> div:nth-child(even) {
		margin-left: 185px;
	}
`
const Row = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 20px;
	margin-top: 50px;
	> span {
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
	const credentials = getCredentials()
	const forceUpdate = () => update(+ new Date())
	const isMobile = () => {
		if (width < 500) return true
		return false
	}
	return (
		<AppContainer width={width} height={height}>
			<Header key={foo} />
			{props.children ?
				React.cloneElement(props.children, props={update: forceUpdate})
				:
				<div>
					<Center>
						{!isMobile() ?
						<h1>Welcome to Funtball!</h1>
						:
						<h2>Welcome to Funtball!</h2>}
						{credentials && <span>You are now logged in as <b>{credentials.username}</b></span>}
					</Center>
					<Home>
						<Row style={isMobile() ? {marginLeft: 16, marginRight: 16} : {}}>
							<span>Funtball is a new pick 'em styled fantasy football game under development</span>
							<Pointer direction='left' />
						</Row>
						<Row style={isMobile() ? {marginLeft: 16, marginRight: 16} : {}}>
							<Pointer direction='right' />
							<span>Score points by correctly choosing the winner of every game from the upcoming football season</span>
						</Row>
						<Row style={isMobile() ? {marginLeft: 16, marginRight: 16} : {}}>
							<span>Points may also be gained by correctly guessing the score difference of a given game</span>
							<Pointer direction='left' />
						</Row>
						<Row style={isMobile() ? {marginLeft: 16, marginRight: 16} : {}}>
							<Pointer direction='right' />
							<span>Play smart! Sacrifice points to double up the reward obtained from a correctly guessed game</span>
						</Row>
					</Home>
					<Center>
						<img src={footballGif} width={120} height={120} style={{marginTop: 24}} />
					</Center>
					<Footer>
						<ImgLinks>
							<a target='_blank' href="https://github.com/PedroBortolli/funtball" style={{cursor: 'poiinter'}}>
								<img src={GitHubLogo} width={48} height={48}/>
							</a>
							<a target='_blank' href="https://twitter.com/PedroBortolli" style={{cursor: 'poiinter'}}>
								<img src={TwitterLogo} width={48} height={48}/>
							</a>
						</ImgLinks>
						<Center style={{textAlign: 'center'}}>
							<span>Funtball is open source - feel free to contribute</span>
							<span>Also, follow me on Twitter for updates about Funtball</span>
						</Center>
					</Footer>
				</div>
			}
		</AppContainer>
	)
}

export default App;
