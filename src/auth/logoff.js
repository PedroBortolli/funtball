import React from 'react'
import {Redirect} from 'react-router'

function Logoff() {
	if (localStorage.getItem('auth-jwt')) localStorage.removeItem('auth-jwt')
	return <Redirect to="/" />
}

export default Logoff