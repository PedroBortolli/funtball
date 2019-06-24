import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {primaryColor} from '../utils/constants'
import fetchApi from '../api/fetch'
import loading from '../utils/loading'
import streakIcon from '../assets/streak-icon.png'
import useScreenSize from '../hooks/useScreenSize'
import {url} from '../utils/constants'

function importAll(r) {
	let helmets = {}
	r.keys().forEach((item, index) => { helmets[item.replace('./', '')] = r(item) })
	return helmets
}

const helmets = importAll(require.context('../assets/helmets', false, /\.(png|jpe?g|svg)$/))

const Card = styled.div`
	width: 462px;
	height: 94px;
	transition: background-color 0.3s;
	&:hover { background-color: #eaeaea }
	display: grid;
	grid-template-columns: 44px 260px 158px;
	zoom: ${props => props.scale};
	-moz-transform: scale(${props => props.scale});
`

const Picker = styled.select`
	outline: none;
	border: none !important;
	-webkit-box-shadow: none !important;
	-moz-box-shadow: none !important;
	box-shadow: none !important;
	color: ${primaryColor} !important;
	background: none !important;
	font-size: 18px !important;
	font-family: "Bookman Old Style" !important;
	font-weight: 700 !important;
	cursor: pointer;
	width: 86px !important;
`

const Teams = styled.div`
	display: grid;
	grid-template-columns: 6px 72px 104px 72px 6px;
	grid-template-rows: 66px 22px;
	grid-template-areas: ". awayTeam info homeTeam ."
						". awayStreak . homeStreak .";
	font-size: 30px;
	
`

const Options = styled.div`
	display: grid;
	grid-template-rows: 74px 20px;
	grid-template-areas: "buttons"
						"info";
`

const Icon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	color: #e5a212;
	font-weight: 900;
	height: 74px;
`

const Center = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${primaryColor};
`

const Buttons = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	> * {
		padding-left: 8px;
		padding-right: 8px;
	}
	color: ${primaryColor};
	font-weight: 700;
	font-size: 18px;
	grid-area: "buttons";
	
`

function GameCard(props) {
	const [pick, changePick] = useState(null)
	const [double, changeDouble] = useState(false)
	const [pointsDifference, changePointsDifference] = useState(null)
	const [saving, changeSaving] = useState(false)
	const [originalPick, changeOriginalPick] = useState(null)
	const [originalDouble, changeOriginalDouble] = useState(false)
	const [originalDifference, changeOriginalDifference] = useState(null)
	const [allowSameSave, changeAllowSameSave] = useState(true)
	const [width] = useScreenSize()
	useEffect(() => {
		if (typeof props.pick !== 'undefined') {
			changePick(props.pick)
			changeOriginalPick(props.pick)
		}
		if (typeof props.double !== 'undefined') {
			changeDouble(props.double)
			changeOriginalDouble(props.double)
		}
		if (typeof props.difference !== 'undefined') {
			changePointsDifference(props.difference)
			changeOriginalDifference(props.difference)
		}
	}, [])

	const calcPoints = () => {
		if (typeof props.pickPoints !== 'undefined') {
			let actualPoints = props.pickPoints
			if (typeof props.differencePoints !== 'undefined')
				actualPoints += props.differencePoints
			return actualPoints * (props.double ? 2 : 1)
		}
		let achievablePoints = 0
		if (pick) {
			achievablePoints = 10
			if (pointsDifference) achievablePoints += ((30-pointsDifference)/5)
			achievablePoints += props.streakAway + props.streakHome
			if (double) achievablePoints *= 2
		}
		return achievablePoints
	}

	const setOpacity = (team) => {
		if (!pick || team === pick) return 1.0
		return 0.2
	}
	
	const hasGameFinished = () => typeof props.pickPoints !== 'undefined'

	const getBackgroundColor = () => {
		if (typeof props.pickPoints === 'undefined') return 'white'
		if (props.pickPoints) return '#dbfccc'
		return '#f7b4b4'
	}

	const selectionDiffers = () => {
		return pick !== originalPick || double !== originalDouble || pointsDifference !== originalDifference
	}

	const isDifferenceCorrect = () => {
		if (typeof props.differencePoints === 'undefined' || !props.differencePoints) return false
		return true
	}

	const enableSave = () => {
		if (!selectionDiffers()) return allowSameSave
		return true
	}

	const savePick = async () => {
		if (enableSave()) {
			changeSaving(true)
			try {
				await fetchApi('POST', `${url}/make-pick`, undefined, {
					username: 'pedro',
					gameId: props['game_id'],
					pick: pick ? (pick === props.home ? true : false) : null,
					double: double,
					difference: pointsDifference
				})
				props.forceUpdate()
			} catch(err) { console.log('Error saving prediction: ', err) }
			setTimeout(() => {
				changeOriginalPick(pick)
				changeOriginalDouble(double)
				changeOriginalDifference(pointsDifference)
				changeAllowSameSave(false)
				changeSaving(false)
			}, 300)
		}
	}

	const getScale = () => {return Math.min(width/462.0, 1.0)}
	const pts = calcPoints()
	const iconStyle = hasGameFinished() ? {color: '#44893b'} : {}

	return (
		saving ?
			<div style={{width: Math.min(462, width), minHeight: 94*getScale(), maxHeight: 94*getScale()}}>
				<Center>
					<p>Saving</p>
				</Center>
				<Center style={{marginTop: -20}}>
					<img alt='' src={loading()} width="60" height="60"/>
				</Center>
			</div>
		:
		<Card scale={getScale()} style={{...props.style, backgroundColor: getBackgroundColor()}}>
			<Icon style={iconStyle}>
				{pts > 0 && `+ ${pts}`}
			</Icon>
			<Teams>
				<img alt='' src={helmets[props.away + '.png']} width="72" height="72" style={{cursor: 'pointer', 
					opacity: setOpacity(props.away), gridArea: 'awayTeam', transition: 'opacity 0.3s'}}
					onClick={() => changePick(props.away)} className="awayTeam"
				/>

				<Center style={{gridArea: 'info', fontSize: 11}}>
					<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
						<div>{props.date.substr(0, 10)}</div>
						<div>{props.time.substr(0, 5)}</div>
					</div>
				</Center>

				<img alt='' src={helmets[props.home + '2.png']} width="72" height="72" style={{cursor: 'pointer', 
					opacity: setOpacity(props.home), gridArea: 'homeTeam', transition: 'opacity 0.3s'}}
					onClick={() => changePick(props.home)}
				/>

				<Center style={{fontSize: 16, paddingTop: 8, gridArea: 'awayStreak'}}>
					{Array(props.streakAway).fill(0).map((foo, i) => {
						return <img key={i} alt='' src={streakIcon} width="12" height="12" style={{opacity: 0.8}} />
					})}
				</Center>

				<Center style={{fontSize: 16, paddingTop: 8, gridArea: 'homeStreak'}}>
					{Array(props.streakHome).fill(0).map((foo, i) => {
						return <img key={i} alt='' src={streakIcon} width="12" height="12" style={{opacity: 0.8}} />
					})}
				</Center>
			</Teams>
			<Options>
				{selectionDiffers() &&
				<div style={{fontSize: 14, fontWeight: 900, color: '#c69a29', gridArea: 'info', 
							display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
					Unsaved changes&nbsp;<span aria-labelledby="jsx-a11y/accessible-emoji" role="img">⚠️</span>
				</div>
				}
				{typeof props.pickPoints !== 'undefined' &&
					<div style={{gridArea: 'info', paddingLeft: 40, marginTop: -16, 
						color: isDifferenceCorrect() ? '#44893b' : 'red'}}>
						{isDifferenceCorrect() ? '✓' : '✖'}
					</div>
				}
				<Buttons>
					<Picker className="form-control" value={pointsDifference ? '< ' + pointsDifference.toString() : '-'}
						onChange={(e) => changePointsDifference(Number((e.target.value).substring(e.target.value.indexOf('<')+2)))}>
						{!pointsDifference &&
						<option key="n/a_option" style={{display: 'none'}}>&nbsp;&nbsp;&nbsp; -</option>
						}
						<option key={5}>&nbsp;&nbsp;{'< ' + 5}</option>
						{[10, 15, 20, 25].map(x => {
							return <option key={x}>{'< ' + x}</option>
						})}

					</Picker>

					<div style={{cursor: 'pointer', background: double ? primaryColor : '', opacity: double ? 1.0 : 0.4,
						color: double ? 'white' : primaryColor, transition: 'background 0.3s, opacity 0.3s'}} 
						onClick={() => changeDouble(!double)}>2x</div>

					<div style={{cursor: enableSave() && 'pointer', opacity: enableSave() ? 1.0 : 0.4}} onClick={() => savePick()}>
						✔
					</div>
				</Buttons>
			</Options>
		</Card>
	)
}

export default GameCard