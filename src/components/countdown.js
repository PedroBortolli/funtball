import React, {useState, useEffect} from 'react'
import i18n from '../utils/i18n'

const DAY = 86400000

function Countdown(props) {
	const date = props.props.date, time = props.props.time, pickPoints = props.props.pickPoints
	const left = new Date(`${date.substr(0, 10)} ${time.substr(0, 5)} EST`) - 4800000 - new Date()
	const [timeLeft, changeTimeLeft] = useState(left)

	useEffect(() => {
		const interval = setInterval(() => {
			changeTimeLeft(current => {
				if (current <= 0) {
					clearInterval(interval)
					return 0
				}
				if (current <= 1000) props.changeChoosable(false)
				return current - 1000
			})
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const hasGameFinished = () => typeof pickPoints !== 'undefined'

	const msToTime = ms => {
		let seconds = Math.floor((ms / 1000) % 60),
			minutes = Math.floor((ms / (1000 * 60)) % 60),
			hours = Math.floor((ms / (1000 * 60 * 60)))
		hours = (hours < 10) ? '0' + hours : hours
		minutes = (minutes < 10) ? '0' + minutes : minutes
		seconds = (seconds < 10) ? '0' + seconds : seconds
		return hours + ':' + minutes + ':' + seconds
	}

	return (
		timeLeft < 2*DAY &&
		<div style={{gridArea: 'info', marginRight: 8, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: 8}}>
			<span style={{fontSize: 14, fontWeight: 900, color: '#d61609'}}>
				{timeLeft > 0 ? <span>{i18n('Locks in')} &nbsp;{msToTime(timeLeft)}</span> : !hasGameFinished() ? <span>{i18n('Game locked!')}</span> : ''}
			</span>
		</div>
	)
}

export default Countdown