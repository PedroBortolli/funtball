import React from 'react'
import {Redirect} from 'react-router-dom'
import jwtDecode from 'jwt-decode'

function getCredentials() {
	try {
		const authJwt = localStorage.getItem('auth-jwt')
		const token = jwtDecode(authJwt)
		if (Date.now() > token.exp*1000) return undefined
		return token
	}
	catch (err) { return undefined }
}

function assertAuth() {
	const credentials = getCredentials()
	if (!credentials || credentials.exp*1000 < Date.now()) {
		console.log("redirecting")
		console.log(<Redirect to="/login" />)
		return <Redirect to="/login" />
	}
	return true 
}

export {getCredentials, assertAuth}