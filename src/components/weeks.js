import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import useScreenSize from '../hooks/useScreenSize'
import {primaryColor} from '../utils/constants'
import { isMobile } from '../utils/modules'
import Slider from 'react-slick'
import './css/slider.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
const weeksMobile = [[1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12], [13, 14, 15, 16, 17]]

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
`

function NavButton(props) {
	const {className, style, onClick} = props
	let arrow = '<'
	if (props.right) arrow = '>'
	const margin = arrow === '<' ? 'marginRight' : 'marginLeft'
	return (
		<span className='slick-arrow' style={{...style, [margin]: 16}} onClick={onClick}>
			{arrow}
		</span>
	)
}

function Weeks({week, changeWeek}) {
	const [width] = useScreenSize()
	const [settings, changeSettings] = useState({dots: false})
	const [dummy, updateNav] = useState(0)
	useEffect(() => {
		changeSettings({
			dots: false,
			prevArrow: <NavButton week={week} />,
			nextArrow: <NavButton week={week} right />
		})
	}, [dummy])

	return (
		isMobile(width) ?
			<SliderContainer>
				<Slider style={{width: 150}} {...settings}>
				{weeksMobile.map((batch, i) => {
					return <MobileContainer>
						{weeksMobile[i].map(week => {
							return <span onClick={() => changeWeek(week)}>{week}</span>
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
							borderBottom: wk === week && '0'}}>{wk}</span>
				})}
			</Container>
	)
}

export default Weeks