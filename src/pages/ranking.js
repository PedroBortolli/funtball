import React, { useState, useEffect } from 'react'
import fetchApi from '../api/fetch'
import styled from 'styled-components'
import loading from '../utils/loading'
import RankingTable from '../components/ranking-table'
import i18n from '../utils/i18n'
import {url} from '../utils/constants'
import { isMobile } from '../utils/modules'
import useScreenSize from '../hooks/useScreenSize'
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
	const [ranking, setRanking] = useState([])
	const [loaded, changeLoaded] = useState(false)
	const [_switch, toggleSwitch] = useState(false)
	const [width] = useScreenSize()
	useEffect(() => {
		const fetchRanking = async () => {
			const beginReq = + new Date()
			const usersPoints = await fetchApi('GET', `${url}/get-all-points`)
			setRanking(usersPoints.ranking)
			const endReq = + new Date()			
			setTimeout(() => {
				changeLoaded(true)
			}, Math.max(1, 500-(endReq-beginReq)))
		}
		fetchRanking()
	}, [])
	const pointsRanking = [...ranking.sort((a, b) => {return b.pts - a.pts})]
	const winsRanking = [...ranking.sort((a, b) => {return b.wins - a.wins})]

	return <Center loaded={loaded}>
		<h2>Ranking</h2>
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
						<RankingTable ranking={winsRanking} title={i18n('Wins')} />
						:
						<RankingTable ranking={pointsRanking} title={i18n('Points')} />
					}
				</RankingContainer>
			</div>
		:
			<RankingContainer>
				<RankingTable ranking={pointsRanking} title={i18n('Points')} />
				<RankingTable ranking={winsRanking} title={i18n('Wins')} />
			</RankingContainer>
		}
	</Center>
}

export default Ranking