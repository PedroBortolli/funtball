import React from 'react'
import {Redirect} from 'react-router-dom'
import jwtDecode from 'jwt-decode'

async function getCredentials() {
	try {
		const authJwt = localStorage.getItem('auth-jwt')
		const token = await jwtDecode(authJwt)
		if (Date.now() > token.exp*1000) return undefined
		return token
	}
	catch (err) { return undefined }
}

function assertAuth() {
	const credentials = getCredentials()
	if (!credentials || credentials.exp*1000 < Date.now()) {
		return <Redirect to="/login" />
	}
	return true 
}

export {getCredentials, assertAuth}