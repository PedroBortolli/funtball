import React, {useState} from 'react'
import styled from 'styled-components'
import useScreenSize from '../hooks/useScreenSize'
import test from '../assets/test.png'

function importAll(r) {
	let helmets = {}
	r.keys().forEach((item, index) => { helmets[item.replace('./', '')] = r(item) })
	return helmets
}

const helmets = importAll(require.context('../assets/helmets', false, /\.(png|jpe?g|svg)$/))

const Card = styled.div`
	width: 400px;
	height: 80px;
	border-bottom: 1px solid gray;
	transition: background-color 0.3s;
	&:hover { background-color: #c2c3c4 }
	display: grid;
	grid-template-columns: 40px 260px 100px;
	margin-bottom: 10px;
`

const Teams = styled.div`
	
	display: grid;
	grid-template-columns: 6px 72px 104px 72px 6px;
	grid-template-rows: 66px 14px;
	grid-template-areas: ". awayTeam info homeTeam ."
						". awayStreak . homeStreak .";
	font-size: 30px;
	
`

const Options = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-left: 16px;
`

const Icon = styled.div`

`

const Center = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

function GameCard(props) {
	const [pick, changePick] = useState(null)
	const [double, changeDouble] = useState(false)
	//const [width, height] = useScreenSize()

	const setOpacity = (team) => {
		if (!pick || team === pick) return 1.0
		return 0.2
	}

	return (
		<Card style={{...props.style}}>
			<Icon />
			<Teams> {/*style={{backgroundImage: `url(${test})`, backgroundSize: 'cover'}}>*/}
				<img src={helmets[props.away + '.png']} width="72" height="72"
					style={{cursor: 'pointer', opacity: setOpacity(props.away), gridArea: 'awayTeam'}}
					onClick={() => changePick(props.away)} className="awayTeam"
				/>

				<Center style={{gridArea: 'info', fontSize: 11}}>
					<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
						<div>{props.date.substr(0, 10)}</div>
						<div>{props.time.substr(1, 4)} PM</div>
					</div>
				</Center>

				<img src={helmets[props.home + '2.png']} width="72" height="72" 
					style={{cursor: 'pointer', opacity: setOpacity(props.home), gridArea: 'homeTeam'}}
					onClick={() => changePick(props.home)}
				/>

				<Center style={{fontSize: 16, gridArea: 'awayStreak'}}>+++</Center>
				<Center style={{fontSize: 16, gridArea: 'homeStreak'}}>---</Center>
			</Teams>
			<Options style={{color: '#b5370e', fontWeight: '700', fontSize: 18}}>
				<div style={{cursor: 'pointer', background: double ? '#b5370e' : 'white', 
					color: double ? 'white' : '#b5370e'}} onClick={() => changeDouble(!double)}>2x</div>
				<div>▼</div>
				<div>✔</div>
			</Options>
		</Card>
	)
}

export default GameCard