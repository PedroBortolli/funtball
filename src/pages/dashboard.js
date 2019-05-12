import React, { useState, useEffect } from 'react'
import fetchApi from '../api/fetch'
import GameCard from '../components/game-card'
import styled from 'styled-components'
import loading from '../utils/loading'

const url = 'http://localhost:5000/get-schedule/'
const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

const Schedule = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 20px;
`

const Center = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
`

function Dashboard() {
	const [week, changeWeek] = useState(1) // TODO: begin at current week
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
			setTimeout(() => {
				updateSchedule(games)
				changeLoaded(true)
			}, 500)
		}
		getSchedule()
	}, [week])

	return (
		<div>
			<Center>
				<div>
					{weeks.map(wk => {
						return <a key={wk} onClick={() => changeWeek(wk)}>{wk}&nbsp;&nbsp;</a>
					})}
				</div>
			</Center>

			<Center>
				<h1 style={{color: '#b5370e'}}>Week {week}</h1>
			</Center>

			<Center>
				{!loaded ? <img src={loading()} width="80" height="80"/>
				:
				<Schedule>
					{schedule.map((game, i) => {
						return <GameCard key={i} away={game['away_team']} home={game['home_team']} 
								date={game['game_date']} time={game['game_time']} />
					})}
				</Schedule>
				}
			</Center>

		</div>
	)
}

export default Dashboard 