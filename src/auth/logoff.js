import React from 'react'

function Logoff(props) {
	if (localStorage.getItem('auth-jwt')) localStorage.removeItem('auth-jwt')
	props.history.push('/')
	return <div>foo</div>
}

export default Logoff