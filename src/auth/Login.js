import React, { useReducer } from 'react'

function Login() {
	return <div>
		<input type="text" className="form-control" placeholder="Username"></input>
		<input type="password" className="form-control" placeholder="Password"></input>
		<button type="button" class="btn btn-light">Submit</button>
	</div>
}

export default Login