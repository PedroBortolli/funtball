import React, { useState, useEffect } from 'react'
import fetchApi from '../api/fetch'
import styled from 'styled-components'
import loading from '../utils/loading'
import RankingTable from '../components/ranking-table'

const url = 'http://localhost:5000/'
const loadingGif = loading()

const Center = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 60px;
`


function Ranking() {
	const [ranking, setRanking] = useState([])
	const [loaded, changeLoaded] = useState(false)
	useEffect(() => {
		const fetchRanking = async () => {
			const beginReq = + new Date()
			const usersPoints = await fetchApi('GET', url + 'get-all-points')
			setRanking(usersPoints.ranking)
			const endReq = + new Date()			
			setTimeout(() => {
				changeLoaded(true)
			}, Math.max(1, 500-(endReq-beginReq)))
		}
		fetchRanking()
	}, [])
	ranking.sort((a, b) => {return b.pts - a.pts})
	
	return <Center>
		{!loaded ? <img src={loadingGif} alt='' width="80" height="80"/> :
		<RankingTable ranking={ranking} title='Points' />
		}
	</Center>
}

export default Ranking