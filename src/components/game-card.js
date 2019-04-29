import React, {useState} from 'react'
import styled from 'styled-components'
import useScreenSize from '../hooks/useScreenSize'

function importAll(r) {
	let helmets = {}
	r.keys().forEach((item, index) => { helmets[item.replace('./', '')] = r(item) })
	return helmets
}

const helmets = importAll(require.context('../assets/helmets', false, /\.(png|jpe?g|svg)$/))

const Card = styled.div`
	width: 540px;
	height: 80px;
	border-bottom: 1px solid gray;
	transition: background-color 0.3s;
	&:hover { background-color: #c2c3c4 }
	display: grid;
	grid-template-columns: 40px 300px 200px;
	margin-bottom: 10px;
`

const Teams = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 30px;
	height: 100%;
`

const Options = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const Icon = styled.div`

`

function GameCard(props) {
	const [pick, changePick] = useState(null)
	//const [width, height] = useScreenSize()

	const setOpacity = (team) => {
		if (!pick || team === pick) return 1.0
		return 0.2
	}

	return (
		<Card style={{...props.style}}>
			{console.log(pick)}
			<Icon />
			<Teams>
				<img src={helmets[props.away + '.png']} width="72" height="72"
					style={{marginLeft: 6, cursor: 'pointer', opacity: setOpacity(props.away)}}
					onClick={() => changePick(props.away)}
				/>
				<p style={{fontSize: 11, marginTop: 16}}>{props.date.substr(0, 10)}&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;{props.time.substr(1, 4)} PM</p>

				<img src={helmets[props.home + '2.png']} width="72" height="72" 
					style={{marginRight: 6, cursor: 'pointer', opacity: setOpacity(props.home)}}
					onClick={() => changePick(props.home)}
				/>
			</Teams>
			<Options>
				<div>a</div>
				<div>b</div>
				<div>c</div>
			</Options>
		</Card>
	)
}

export default GameCard