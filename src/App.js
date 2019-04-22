import React, { useReducer } from 'react';
import './App.css'

function App() {
	const [state, update] = useReducer((state, action) => {
		switch(action.type) {
			case 'add':
				return {
					...state,
					[action.key]: action.value
				}
			case 'remove':
				let newState = {...state}
				if (action.key in newState)
					delete newState[action.key]
				return newState
			default:
		}
	}, {})
	
	return (
		<div>
			<h1>Hi!</h1>
			<button onClick={() => update({type: 'add', key: 'Key', value: 'Test'})}>Click!</button>
			<br/>
			<button onClick={() => update({type: 'add', key: 'Key', value: '123'})}>Click!</button>
			<br/>
			<button onClick={() => update({type: 'remove', key: 'Key'})}>Remove...</button>
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<h3>{JSON.stringify(state)}</h3>
			</div>
		</div>
	)
}

export default App;
