import React from 'react'
import { storiesOf } from '@storybook/react'
import GameCard from '../components/game-card'

storiesOf('Components', module)
	.add('Game card', () => {
		return <GameCard away="NYG" home="DAL" date="2019-09-09" time="4:25 PM"/>
	})