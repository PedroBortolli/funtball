import React from 'react'
import styled from 'styled-components'
import useScreenSize from '../hooks/useScreenSize'

function importAll(r) {
	let helmets = {}
	r.keys().forEach((item, index) => { helmets[item.replace('./', '')] = r(item) })
	return helmets
}

const helmets = importAll(require.context('../assets/helmets', false, /\.(png|jpe?g|svg)$/))

const Card = styled.div`
	width: 300px;
	height: 80px;
	border-bottom: 1px solid gray;
`

const Teams = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 30px;
	height: 100%;
`


function GameCard(props) {
	//const [width, height] = useScreenSize()
	return (
		<Card style={{...props.style}}>
			<Teams>
				<img src={helmets[props.away + '.png']} width="72" height="72" style={{marginLeft: 6}} />
				<p style={{fontSize: 11, marginTop: 16}}>{props.date.substr(0, 10)}&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;{props.time.substr(1, 4)} PM</p>
				<img src={helmets[props.home + '2.png']} width="72" height="72" style={{marginRight: 6}}/>
			</Teams>
		</Card>
	)
}

export default GameCard