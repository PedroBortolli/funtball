import React, { useState, useEffect } from 'react'
import fetchApi from '../api/fetch'
import GameCard from '../components/game-card'
import Weeks from '../components/weeks'
import styled from 'styled-components'
import loading from '../utils/loading'
import useScreenSize from '../hooks/useScreenSize'
import {primaryColor} from '../utils/constants'
import {url} from '../utils/constants'
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'

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

let aborters = [new AbortController()]//, contentHeight

function Dashboard(props) {
	const [week, changeWeek] = useState(1) // TODO: begin at current week
	const [loaded, changeLoaded] = useState(false)
	const [schedule, updateSchedule] = useState([])
	const [width, height] = useScreenSize()
	const [streaks, setStreaks] = useState({})
	const [loadingGif, changeLoadingGif] = useState(loading())
	const [contentHeight, changeContentHeight] = useState(0)
	useEffect(() => {
		changeLoaded(false)
		if (schedule.length || week !== 1) {
			aborters[aborters.length-1].abort()
			aborters = [...aborters, new AbortController()]
		}
		const getSchedule = async () => {
			try {
				const result = await fetchApi('GET', `${url}/get-schedule/${week.toString()}`, aborters[aborters.length-1].signal)
				let games = [], promises = []
				Object.keys(result).forEach(game => {
					if (typeof result[game] === 'object') {
						const picks = fetchApi('GET', `${url}/get-pick/pedro/${result[game]['game_id']}`, aborters[aborters.length-1].signal)
						promises.push(picks)
						games.push(result[game])
					}
				})
				const allPicks = await Promise.all(promises)
				allPicks.forEach((picks, i) => {
					games[i] = {...games[i], ...picks}
				})
				updateSchedule(games)
				changeLoaded(true)
			} catch(err) {}
		}
		const getStreaks = async () => {
			try {
				let result = {}
				if (week > 1) result = await fetchApi('GET', `${url}/get-streak/pedro/${(week-1).toString()}`, aborters[aborters.length-1].signal)
				setStreaks(result)
			} catch(err) {}
		}
		changeLoadingGif(loading())
		getSchedule()
		getStreaks()
	}, [week])

	return (
		<div>
			<Center>
				<Weeks week={week} changeWeek={changeWeek} />
			</Center>

			<Center style={{marginBottom: 16}}>
				<h1 style={{color: primaryColor, fontWeight: 900}}>Week {week}</h1>
			</Center>

			{!loaded ? 
				<CenterScreen>
					<img alt='' src={loadingGif} width="80" height="80"/>
				</CenterScreen>
				:
			<Center>
				<Schedule width={width} height={height}>
					{schedule.map((game, i) => {
						return <div key={i} style={{borderBottom: '1px solid rgba(0, 0, 0, 0.1)', marginBottom: 10}}>
							<GameCard away={game['away_team']} home={game['home_team']} 
								date={game['game_date']} time={game['game_time']} game_id={game['game_id']}
								pick={game.pick} double={game.double} difference={game.difference} 
								pickPoints={game.pickPoints} differencePoints={game.differencePoints}
								streakHome={streaks[game['home_team']] || 0} streakAway={streaks[game['away_team']] || 0} 
								forceUpdate={props.update} />
						</div>
					})}
				</Schedule>
			</Center>
			}
		</div>
	)
}

export default Dashboard 