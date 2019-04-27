import React from 'react'
import styled from 'styled-components'
import useScreenSize from '../hooks/useScreenSize'

const Card = styled.div`
	width: 300px;
	height: 80px;
	background-color: #7f8fa6;
`

const Teams = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 30px;
	height: 70%;
`

const Info = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 30%;
`

function GameCard(props) {
	console.log(props.away, props.home)
	//const [width, height] = useScreenSize()
	return (
		<Card style={{...props.style}}>
			<Teams>
				<p>{props.away}</p>
				<p style={{fontSize: 18}}>@</p>
				<p>{props.home}</p>
			</Teams>
			<Info>
				<p>{props.date.substr(0, 10)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.time.substr(1, 4)} PM</p>
			</Info>
		</Card>
	)
}

export default GameCard