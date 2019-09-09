import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Select, {components} from 'react-select'
import {primaryColor} from '../utils/constants'
import fetchApi from '../api/fetch'
import loading from '../utils/loading'
import Countdown from './countdown'
import streakIcon from '../assets/streak-icon.png'
import useScreenSize from '../hooks/useScreenSize'
import i18n from '../utils/i18n'
import {url} from '../utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import './css/game-card.css'

function importAll(r) {
	let helmets = {}
	r.keys().forEach((item, index) => { helmets[item.replace('./', '')] = r(item) })
	return helmets
}

const helmets = importAll(require.context('../assets/helmets', false, /\.(png|jpe?g|svg)$/))

const Card = styled.div`
	width: 480px;
	height: 94px;
	transition: background-color 0.3s;
	&:hover { background-color: #eaeaea }
	display: grid;
	grid-template-columns: 44px 260px 176px;
	zoom: ${props => props.scale};
	-moz-transform: scale(${props => props.scale});
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
	justify-content: flex-start;
	> * {
		padding-left: 8px;
		padding-right: 8px;
	}
	color: ${primaryColor};
	font-weight: 700;
	font-size: 18px;
	grid-area: "buttons";
	width: 176px;
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
	const [loadingGif, changeLoading] = useState(loading())
	const [choosable, changeChoosable] = useState(new Date(`${props.date.substr(0, 10).replace(/-/g, '/')} ${props.time.substr(0, 5)} GMT-0500`) - 4800000 - new Date() > 0)
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
			let actualPoints = props.pickPoints + (props.streakAway || 0) + (props.streakHome || 0)
			if (typeof props.differencePoints !== 'undefined')
				actualPoints += props.differencePoints
			if (!props.pickPoints) return props.double ? -15 : 0
			return actualPoints * (props.double ? 2 : 1)
		}
		let achievablePoints = 0
		if (pick) {
			achievablePoints = 10
			if (pointsDifference) achievablePoints += ((30-pointsDifference)/5)
			achievablePoints += props.streakAway + props.streakHome
			if (double) achievablePoints *= 2
		}
		console.log(achievablePoints, double)
		return achievablePoints
	}

	const setOpacity = (team) => {
		if (!pick || team === pick) return 1.0
		return 0.2
	}

	const hasGameFinished = () => typeof props.pickPoints !== 'undefined'

	const getBackgroundColor = () => {
		if (props.pickPoints > 0) return '#dbfccc'
		if (props.pickPoints === 0) return '#f7b4b4'
		if (isChoosable() === 'none') return 'rgba(0, 0, 0, 0.15)'
		return 'white'
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
					username: props.authToken.username,
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
				changeLoading(loading())
				changeSaving(false)
			}, 300)
		}
	}

	const selectOptions = [
		{value: 5, label: '< 5'},
		{value: 10, label: '< 10'},
		{value: 15, label: '< 15'},
		{value: 20, label: '< 20'},
		{value: 25, label: '< 25'},
	]
	const defaultSelectValue = {value: pointsDifference ? `< ${pointsDifference}` : '-',
								label: pointsDifference ? `< ${pointsDifference}` : '-'}
	const getScale = () => {return Math.min(width/480.0, 1.0)}
	const pts = calcPoints()
	const iconStyle = hasGameFinished() ? {color: pts > 0 ? '#44893b' : '#de0206'} : {}

	const ValueContainer = ({ children, ...props }) => {
		let pos = 'flex-end', minWidth = 35
		if (children[0].props.data.value === '-') pos = 'center'
		if (children[0].props.data.value === '< 5') minWidth = 47
		else if (children[0].props.data.value === '-') minWidth = 65
		return (
			components.ValueContainer && (
				<components.ValueContainer {...props}>
					<div style={{minWidth: minWidth, display: 'flex', justifyContent: pos}}>
						{children}
					</div>
				</components.ValueContainer>
			)
		)
	}

	const isChoosable = () => {
		if (!choosable || hasGameFinished()) return 'none'
		return 'auto'
	}
	
	const getUserDate = () => {
		const utcDate = new Date(`${props.date.substr(0, 10).replace(/-/g, '/')} ${props.time.substr(0, 5)} GMT-0500`).toLocaleString("en-US", {timeZone: "UTC"})
		const offset = new Date().getTimezoneOffset() + 60
		if (utcDate) {
			const date = new Date(new Date(utcDate).getTime() - offset * 60 * 1000)
			if (date) {
				const d = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`, t = date.toTimeString().substr(0, 5)
				return [d, t]
			}
		}
		return [null, null]
	}

	const [formattedDate, formattedTime] = getUserDate()
	return (
		saving ?
			<div style={{width: Math.min(480, width), minHeight: 94*getScale(), maxHeight: 94*getScale(),
						display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
				<span>{i18n('Saving')}</span>
				<img alt='' src={loadingGif} width={Math.min(60, 60*getScale())} height={Math.min(60, 60*getScale())} />
			</div>
		:
		<Card scale={getScale()} style={{...props.style, backgroundColor: getBackgroundColor(), pointerEvents: isChoosable()}}>
			<Icon style={iconStyle}>
				{pts !== 0 && `${pts > 0 ? '+': '‒'} ${Math.abs(pts)}`}
			</Icon>
			<Teams>
				<img alt='' src={helmets[props.away + '.png']} width="72" height="72" style={{cursor: 'pointer', 
					opacity: setOpacity(props.away), gridArea: 'awayTeam', transition: 'opacity 0.3s'}}
					onClick={() => changePick(props.away)} className="awayTeam"
				/>

				<Center style={{gridArea: 'info', fontSize: 11}}>
					<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
						<div>{formattedDate}</div>
						<div>{formattedTime}</div>
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
			<Options style={{cursor: pick ? 'auto' : 'not-allowed'}}>
				{selectionDiffers() ?
					<div style={{fontSize: 13, fontWeight: 900, color: '#c69a29', gridArea: 'info', marginRight: 8,
								display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
						{i18n('Unsaved changes')}&nbsp;<span aria-labelledby="jsx-a11y/accessible-emoji" role="img">⚠️</span>
					</div>
					:
					<Countdown props={props} changeChoosable={changeChoosable} />
				}
				{typeof props.pickPoints !== 'undefined' &&
					<div style={{gridArea: 'info', paddingLeft: 38, marginTop: -12, 
						color: isDifferenceCorrect() ? '#44893b' : 'red'}}>
						{isDifferenceCorrect() ?
							<FontAwesomeIcon icon={faCheck} style={{width: 24}} />
							:
							<FontAwesomeIcon icon={faTimes} style={{width: 24}} />
						}
					</div>
				}
				<Buttons style={{pointerEvents: !choosable ? 'none' : pick ? 'auto' : 'none', opacity: pick ? 1 : 0.3}}>
					<Select options={selectOptions} style={{cursor: 'pointer'}} value={defaultSelectValue} menuPlacement="auto"
							onChange={e => changePointsDifference(e.value)} components={{ValueContainer}} isSearchable={false} />

					<div style={{cursor: 'pointer', background: double ? primaryColor : '', opacity: double ? 1.0 : 0.4,
						color: double ? 'white' : primaryColor, transition: 'background 0.3s, opacity 0.3s'}} 
						onClick={() => changeDouble(!double)}>2x</div>

					<FontAwesomeIcon icon={faCheck} onClick={() => savePick()} style={{cursor: enableSave() && 'pointer', 
					 opacity: enableSave() ? 1.0 : 0.4, width: 42, marginLeft: 4}} />
				</Buttons>
			</Options>
		</Card>
	)
}

export default GameCard