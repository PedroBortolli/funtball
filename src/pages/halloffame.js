import React, { useState, useEffect } from 'react'
import fetchApi from '../api/fetch'
import styled from 'styled-components'
import loading from '../utils/loading'
import RankingTable from '../components/ranking-table'
import i18n from '../utils/i18n'
import {url} from '../utils/constants'
import { isMobile } from '../utils/modules'
import useScreenSize from '../hooks/useScreenSize'
import { getCredentials } from '../auth/services'
import Switch from 'react-switch'
import '../components/css/toggle-switch.css'


const loadingGif = loading()

const Center = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	height: calc(100vh - 100px);
	align-items: ${props => props.loaded ? '' : 'center'};
	> h2 {
		margin-bottom: 32px;
	}
`
const RankingContainer = styled.div`
	display: flex;
	justify-content: center;
	> :not(:last-child) {margin-right: 64px;}
`
const FlexContainer = styled.div`
	display: flex;
	justify-content: center;
	> :nth-child(2) {
		margin: 0px 16px 0px 16px;
	}
	margin-bottom: 24px;
`
const CenterScreen = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
`

function Ranking() {
	const [loaded, changeLoaded] = useState(false)
	const [_switch, toggleSwitch] = useState(false)
	const [username, setUsername] = useState(null)
	const [width] = useScreenSize()
	const [hof, setHof] = useState([])
	useEffect(() => {
		const getHof = async () => {
			const beginReq = + new Date()
			const hof19 = await fetchApi('GET', `${url}/hall-of-fame/2019`)
			setHof(Object.keys(hof19).reduce((tot, cur) => {
				if (hof19[cur].username) tot.push(hof19[cur])
				return tot
			}, []))
			const endReq = + new Date()
			setTimeout(() => {
				changeLoaded(true)
			}, Math.max(1, 500-(endReq-beginReq)))
		}
		const getUser = async () => {
			const user = await getCredentials()
			if (user && user.username) setUsername(user.username)
		}
		getHof()
		getUser()
	}, [])

	const pointsRanking = [...hof.sort((a, b) => {return b.pts - a.pts})]
	const winsRanking = [...hof.sort((a, b) => {return b.wins - a.wins})]

	return <Center loaded={loaded}>
		<h2 style={{marginBottom: 8}}>{i18n('Hall of Fame')}</h2>
		<p>{i18n('Check results from previous Funtball seasons')}</p>
		<h3 style={{marginTop: 16, marginBottom: 16}}>2019</h3>
		{!loaded ? 
			<CenterScreen>
				<img src={loadingGif} alt='' width="80" height="80" /> 
			</CenterScreen>
		:
		isMobile(width) ?
			<div>
				<FlexContainer>
					<span style={{fontWeight: _switch ? 100 : 900}}>{i18n('Points')}</span>
					<Switch onChange={() => toggleSwitch(!_switch)} checked={_switch} 
						uncheckedIcon={false} checkedIcon={false} offColor={'#ffeac9'} onColor={'#ffeac9'}/>
					<span style={{fontWeight: _switch ? 900 : 100}}>{i18n('Wins')}</span>
				</FlexContainer>
				<RankingContainer>
					{_switch ?
						<RankingTable ranking={winsRanking} title={i18n('Wins')} username={username} />
						:
						<RankingTable ranking={pointsRanking} title={i18n('Points')} username={username} />
					}
				</RankingContainer>
			</div>
		:
			<RankingContainer>
				<RankingTable ranking={pointsRanking} title={i18n('Points')} username={username} />
				<RankingTable ranking={winsRanking} title={i18n('Wins')} username={username} />
			</RankingContainer>
		}
	</Center>
}

export default Ranking