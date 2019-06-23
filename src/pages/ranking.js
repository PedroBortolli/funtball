import React, { useState, useEffect } from 'react'
import fetchApi from '../api/fetch'
import styled from 'styled-components'
import loading from '../utils/loading'
import RankingTable from '../components/ranking-table'
import {url} from '../utils/constants'
import useScreenSize from '../hooks/useScreenSize'
import Switch from 'react-switch'
import '../components/css/toggle-switch.css'


const loadingGif = loading()

const Center = styled.div`
	display: flex;
	justify-content: center;
	height: calc(100vh - 100px);
	align-items: ${props => props.loaded ? '' : 'center'};
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
	const isMobile = () => {
		if (width < 800) return true
		return false
	}

	return <Center loaded={loaded}>
		{!loaded ? <img src={loadingGif} alt='' width="80" height="80" style={{marginBottom: 200}} /> :
		isMobile() ?
			<div>
				<FlexContainer>
					<span style={{fontWeight: _switch ? 100 : 900}}>Points</span>
					<Switch onChange={() => toggleSwitch(!_switch)} checked={_switch} 
						uncheckedIcon={false} checkedIcon={false} offColor={'#ffeac9'} onColor={'#ffeac9'}/>
					<span style={{fontWeight: _switch ? 900 : 100}}>Wins</span>
				</FlexContainer>
				<RankingContainer>
					{_switch ?
						<RankingTable ranking={winsRanking} title='Wins' />
						:
						<RankingTable ranking={pointsRanking} title='Points' />
					}
				</RankingContainer>
			</div>
		:
			<RankingContainer>
				<RankingTable ranking={pointsRanking} title='Points' />
				<RankingTable ranking={winsRanking} title='Wins' />
			</RankingContainer>
		}
	</Center>
}

export default Ranking