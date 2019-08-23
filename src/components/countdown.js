import React, {useState, useEffect} from 'react'

function useCountdown(time) {
	const [timeLeft, changeTimeLeft] = useState(time)

	useEffect(() => {
		const interval = setInterval(() => {
			changeTimeLeft(current => {
				if (current <= 0) {
					clearInterval(interval)
					return 0
				}
				return current - 1000
			})
		}, 1000)

		return () => clearInterval(interval)
	}, [])


	const msToTime = ms => {
		let seconds = Math.floor((ms / 1000) % 60),
			minutes = Math.floor((ms / (1000 * 60)) % 60),
			hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
		hours = (hours < 10) ? '0' + hours : hours
		minutes = (minutes < 10) ? '0' + minutes : minutes
		seconds = (seconds < 10) ? '0' + seconds : seconds
		return hours + ':' + minutes + ':' + seconds
	}

	return [timeLeft, msToTime(timeLeft)]
}

export default useCountdown