import React from 'react'
import styled from 'styled-components'
import useScreenSize from '../hooks/useScreenSize'
import {primaryColor} from '../utils/constants'
import { isMobile } from '../utils/modules'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import Slider from 'react-slick'
import './css/slider.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const weeks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
const weeksMobile = [[0], [1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12], [13, 14, 15, 16, 17]]

const Container = styled.div`
	> span {
		color: ${primaryColor};
		cursor: pointer;
		:hover {
			border-bottom: 2px solid ${primaryColor};
			font-weight: 900;
		}
	}
	> :not(:last-child) {margin-right: 12px}
	position: relative;
	z-index: 100;
`
const MobileContainer = styled.div`
	display: flex !important;
	justify-content: space-around;
`
const SliderContainer = styled.div`
	position: relative;
	z-index: 100;
	> div > svg {
		transform: scale(1.3);
		margin-top: 4px;
	}
`

function NavButton(props) {
	const {className, style, onClick} = props
	if (props.right) {
		return <FontAwesomeIcon className='slick-arrow' style={{...style, marginLeft: 16}} icon={faCaretRight} onClick={onClick} />
	}
	else return <FontAwesomeIcon className='slick-arrow' style={{...style, marginRight: 16}} icon={faCaretLeft} onClick={onClick} />
}

function Weeks({week, changeWeek}) {
	const [width] = useScreenSize()
	const settings = {
		dots: false,
		prevArrow: <NavButton week={week} />,
		nextArrow: <NavButton week={week} right />
	}

	return (
		isMobile(width) ?
			<SliderContainer>
				<Slider style={{width: 150}} {...settings}>
				{weeksMobile.map(batch => {
					return <MobileContainer>
						{batch.map(week => {
							return <span onClick={() => changeWeek(week)}>{week > 0 ? week : 'Pre-Season'}</span>
						})}
					</MobileContainer>
				})}
				</Slider>
			</SliderContainer>
			:
			<Container width={500}>
				{weeks.map(wk => {
					return <span key={wk} onClick={() => changeWeek(wk)}
							style={{fontWeight: wk === week && 900, cursor: wk === week && 'default',
							borderBottom: wk === week && '0'}}>{wk > 0 ? wk : 'Pre-Season'}</span>
				})}
			</Container>
	)
}

export default Weeks