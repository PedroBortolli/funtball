import React, { useState, useEffect } from 'react'
import fetchApi from '../api/fetch'
import GameCard from '../components/game-card'
import styled from 'styled-components'
import loading from '../utils/loading'
import useScreenSize from '../hooks/useScreenSize'
import {primaryColor} from '../utils/constants'

const url = 'http://localhost:5000/get-schedule/'
const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

const Schedule = styled.div`
	display: grid;
	grid-template-columns: repeat(${props => props.width ? (props.width < 980 ? 1 : 2) : 2}, 1fr);
	grid-column-gap: 42px;
	//grid-row-gap: 8px;
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
	const [width, height] = useScreenSize()
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
						return <a key={wk} style={{color: primaryColor}}
						 onClick={() => changeWeek(wk)}>{wk}&nbsp;&nbsp;</a>
					})}
				</div>
			</Center>

			<Center style={{marginBottom: 16}}>
				<h1 style={{color: primaryColor, fontWeight: 900}}>Week {week}</h1>
			</Center>

			<Center>
				{!loaded ? <img src={loading()} width="80" height="80"/>
				:
				<Schedule width={width} height={height}>
					{schedule.map((game, i) => {
						return <div key={i}>
							<GameCard away={game['away_team']} home={game['home_team']} 
								date={game['game_date']} time={game['game_time']} />
							<hr style={{marginTop: -10}} />
						</div>
					})}
				</Schedule>
				}
			</Center>

		</div>
	)
}

export default Dashboard 