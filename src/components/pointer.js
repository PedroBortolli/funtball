import React from 'react'
import styled from 'styled-components'
import {secondaryColor} from '../utils/constants'

const Css = styled.div`
	> div {
		width: 120px;
		height: 44px;
		position: relative;
		background: ${secondaryColor};
		transform: ${props => props.direction === 'right' ? 'scaleX(1)' : 'scaleX(-1)'};
	}
	> div:after {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		width: 0;
		height: 0;
		border-left: 22px solid white;
		border-top: 22px solid transparent;
		border-bottom: 22px solid transparent;
	}
	> div:before {
		content: "";
		position: absolute;
		right: -22px;
		bottom: 0;
		width: 0;
		height: 0;
		border-left: 22px solid ${secondaryColor};
		border-top: 22px solid transparent;
		border-bottom: 22px solid transparent;		
	}
`

const Container = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	z-index: -1;
`

export default function Pointer(props) {
	return <Container>
		<Css direction={props.direction || 'right'}>
			<div className='pointer' />
		</Css>
	</Container>
}