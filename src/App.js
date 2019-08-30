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
import selection from './assets/selection.gif'
import streakExample from './assets/streak-example.PNG'
import differencePts from './assets/difference-pts.png'

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
const Container = styled.div`
	height: 100%;
`
const Rules = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	.selectionGif {
		margin-bottom: 16px;
		width: 350px;
		height: 206px;
	}
	> * p, p {
		margin-left: 12px;
		margin-right: 12px;
		text-align: center;
		word-break: break-word;
		max-width: 640px;
	}
	.differencePoints {
		margin-bottom: 8px;
		width: 350px;
		height: 66px;
	}
	.streakExample {
		width: 350px;
		height: 69px;
		margin: 4px 0px 8px;
	}
`
const Text = styled.div`
	margin-top: 24px;
	margin-bottom: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
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

	const fullContainer = {display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}
	const fullFooter = {flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column'}

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
					credentials ?
					<Rules>
						<h2>{i18n('How to play')}</h2>
						<p>{i18n('Basics of Funtball')}</p>

						<Text>
							<p>
								<b>{i18n('Pick')}: </b>
								{i18n(`Gain +10 points if the team you picked wins the game.`)}
							</p>
							<p>
								<b>{i18n('Score difference')}: </b>
								{i18n('Choose the difference between the points scored by the winning team and losing team. If the actual points difference is smaller than what you chose you get points. For example, in the demonstration below we select "< 15". That means we score points if the Seahawks beat the Bengals by 14 points or less. Smaller differences lead to more points scored, may you win.')}
							</p>
							<img className="differencePoints" src={differencePts} />
							<p style={{marginTop: 8}}>
								<b>{i18n('Double points')}: </b>
								{i18n('If you select this option you instantly lose 15 points from your total Funtball score. Then, if the team you picked wins you get the 15 points back and double up the points gained by your entire pick.')}
							</p>
						</Text>

						<img className="selectionGif" src={selection} />

						<p><b>{i18n('Tip')}: </b>{i18n('As you make your pick, a points preview will be displayed on the left, telling the amount of points you get if you are right about your entire selection.')}</p>

						<hr style={{width: '100%', marginBottom: 28}} />

						<p>{i18n('Another way to score points is by win streaking the results of a given team.')}</p>
						<p>{i18n("For example, if two weeks ago you picked the Patriots to win and they did, and last week you picked them to lose and they did, you are now in a 2 games streak for the Patriots. That means that if you get the verdict of the next Patriots' game right again you get +2 extra points for that. Streaks stack up to 3 only.")}</p>

						<img className="streakExample" src={streakExample} />

						<p>{i18n('The two footballs below the Patriots helmet indicate that your current streak is 2.')}</p>
					</Rules>
					:
					<Container style={!isMobile(width) ? fullContainer : {}}>
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
						<div style={!isMobile(width) ? fullFooter : {}}>
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
						</div>
					</Container>
				}
			</div>
		</AppContainer>
	)
}

export default App;
