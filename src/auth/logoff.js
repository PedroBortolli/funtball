import React from 'react'
import {Redirect} from 'react-router-dom'

function Logoff() {
	if (localStorage.getItem('auth-jwt')) localStorage.removeItem('auth-jwt')
	window.location.reload(true)
	return <Redirect to="/" />
}

export default Logoff