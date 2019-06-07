import React, { useState, useEffect } from 'react'
import fetchApi from '../api/fetch'
import GameCard from '../components/game-card'
import styled from 'styled-components'
import loading from '../utils/loading'
import useScreenSize from '../hooks/useScreenSize'
import {primaryColor} from '../utils/constants'

const url = 'http://localhost:5000/'
const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

const Schedule = styled.div`
	display: grid;
	grid-template-columns: repeat(${props => props.width ? (props.width < 988 ? 1 : 2) : 2}, 1fr);
	grid-column-gap: 42px;
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
	const [streaks, setStreaks] = useState({})
	useEffect(() => {
		changeLoaded(false)
		const getSchedule = async () => {
			const result = await fetchApi('GET', url + 'get-schedule/' + week.toString(), undefined)
			let games = [], promises = []
			Object.keys(result).forEach(game => {
				if (typeof result[game] === 'object') {
					const picks = fetchApi('GET', url + 'get-pick/' + 'pedro' + '/' + result[game]['game_id'], undefined)
					promises.push(picks)
					games.push(result[game])
				}
			})
			const allPicks = await Promise.all(promises)
			allPicks.forEach((picks, i) => {
				games[i] = {...games[i], ...picks}
			})
			setTimeout(() => {
				updateSchedule(games)
				changeLoaded(true)
			}, 500)
		}
		const getStreaks = async () => {
			if (week === 1) return
			const result = await fetchApi('GET', url + 'get-streak/pedro/' + (week-1).toString())
			setStreaks(result)
		}
		getSchedule()
		getStreaks()
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
								date={game['game_date']} time={game['game_time']} game_id={game['game_id']}
								pick={game.pick} double={game.double} difference={game.difference} 
								pickPoints={game.pickPoints} differencePoints={game.differencePoints}
								streakHome={streaks[game['home_team']] || 0} streakAway={streaks[game['away_team']] || 0} />
								{/*streakHome={typeof streaks[game['home_team']] !== 'undefined' ? Number(streaks[game['home_team']]) : 0}
					streakAway={typeof streaks[game['away_team']] !== 'undefined' ? Number(streaks[game['away_team']]) : 0} />*/}
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