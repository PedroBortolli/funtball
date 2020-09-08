import React, {useState} from 'react'
import styled from 'styled-components'
import {primaryColor} from '../utils/constants'
import i18n from '../utils/i18n';

const Title = styled.div`
	background-color: #912300;
	width: 300px;
	height: 36px;
	display: flex;
	align-items: center;
	> div {
		color: #ffffff;
		font-size: 20px;
		margin-left: 20px;
	}
`

const Table = styled.div`
	width: 300px;
	> :nth-child(even) {
		background-color: #f8f8f8;
	}
	> div {
		display: flex;
		justify-content: space-between;
		> :last-child {margin-right: 16px;}
		height: 40px;
		color: ${primaryColor}
	}
	border: 1px solid #912300;
    margin-bottom: 48px;
`

const RankName = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	> p {margin-top: 6px;}
	> :first-child {
		margin-left: 16px;
		margin-right: 12px;
	}
`

const Pages = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 16px;
	> :not(:last-child) {margin-right: 8px;}
	> p {color: ${primaryColor};}
`

function RankingTable({ranking = [], title = 'Ranking', username = null, itemsPer = 100}) {
	const [page, changePage] = useState(1)

    //console.log(ranking instanceof Array)
	const entries = []
	ranking.forEach((user, i) => {
		entries.push(<div key={i+1} style={{fontWeight: user.username === username ? 900: 400}}>
			<RankName>
				<div>{i+1}.</div>
				<div style={{fontSize: user.username.length > 20 ? 12 : 16}}>
					{user.username}
				</div>
			</RankName>
			<div style={{display: 'flex', alignItems: 'center'}}>
				{title === i18n('Points') ? user.pts : `${user.wins}-${user.losses}`}
			</div>
		</div>)
	})
	const totalPages = Math.ceil(entries.length / itemsPer)
	const disableButton = {
		pointerEvents: 'none',
		opacity: 0.3
	}

	return <div>
		<Title>
			<div>{title}</div>
		</Title>
		<Table>
			{entries.slice((page-1)*itemsPer, page*itemsPer).map(entry => {return entry})}
		</Table>
		{/*
		<Pages>
			{Array(totalPages).fill(0).map((foo, i) => {
				return <p key={i+1} style={i+1 === page ? disableButton : {cursor: 'pointer'}} 
						onClick={() => changePage(i+1)}>{i+1}</p>
			})}
		</Pages>
		*/}
	</div>
}

export default RankingTable