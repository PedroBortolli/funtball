import React, { useState, useEffect } from 'react'
import fetchApi from '../api/fetch'
import styled from 'styled-components'
import loading from '../utils/loading'
import RankingTable from '../components/ranking-table'
import {url} from '../utils/constants'

const loadingGif = loading()

const Center = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 60px;
`

const RankingContainer = styled.div`
	display: flex;
	justify-content: center;
	> :not(:last-child) {margin-right: 64px;}
`


function Ranking() {
	const [ranking, setRanking] = useState([])
	const [loaded, changeLoaded] = useState(false)
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
	
	return <Center>
		{!loaded ? <img src={loadingGif} alt='' width="80" height="80"/> :
		<RankingContainer>
			<RankingTable ranking={pointsRanking} title='Points' />
			<RankingTable ranking={winsRanking} title='Wins' />
		</RankingContainer>
		}
	</Center>
}

export default Ranking