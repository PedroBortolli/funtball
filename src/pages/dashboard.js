import React, { useState, useEffect } from 'react'
import fetchApi from '../api/fetch'
import GameCard from '../components/game-card'
import styled from 'styled-components'
import loading from '../utils/loading'

const url = 'http://localhost:5000/get-schedule/'
const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
const Schedule = styled.div``

function Dashboard() {
	const [week, changeWeek] = useState(2) // TODO: begin at current week
	const [loaded, changeLoaded] = useState(false)
	const [schedule, updateSchedule] = useState([])
	useEffect(() => {
		changeLoaded(false)
		const getSchedule = async () => {
			const result = await fetchApi('GET', url + week.toString(), undefined)
			let games = []
			Object.keys(result).forEach(game => {
				if (typeof result[game] === 'object') games.push(result[game])
			})
			updateSchedule(games)
			changeLoaded(true)
		}
		getSchedule()
	}, [week])

	return (
		<div>
			{weeks.map(wk => {
				return <a key={wk} onClick={() => changeWeek(wk)}>{wk} &nbsp;</a>
			})}
			<h1>Week {week}</h1>
			{!loaded ? <img src={loading()} width="80" height="80"/>
			:
			<Schedule>
				{schedule.map((game, i) => {
					return <GameCard key={i} away={game['away_team']} home={game['home_team']} 
							date={game['game_date']} time={game['game_time']} />
				})}
			</Schedule>
			}
			
		</div>
	)
}

export default Dashboard 