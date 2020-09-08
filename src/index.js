import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './App'
import NotFound from './NotFound'
import Login from './auth/login'
import Logoff from './auth/logoff'
import Signup from './auth/signup'
import ConfirmEmail from './auth/confirm-emai'
import Dashboard from './pages/dashboard'
import Ranking from './pages/ranking'
import ResetPassword from './auth/reset-password'
import 'bootstrap/dist/css/bootstrap.css'
import {getCredentials} from './auth/services'
import HallOfFame from './pages/halloffame'

const verifyLogin = () => {
	const credentials = getCredentials()
	if (!credentials) browserHistory.push({
		pathname: '/login',
		state: 'You must log in to view this page'
	})
}

const routing = (
	<Router history={browserHistory}>
		<Route exact path="/" component={App}>
			<Route path="/login" component={() => <Login history={browserHistory} />} />
			<Route path="/logoff" component={() => <Logoff history={browserHistory} />} />
			<Route path="/dashboard" component={Dashboard} onEnter={() => verifyLogin()} />
			<Route path="/signup" component={() => <Signup history={browserHistory} />} />
			<Route path="/confirm-email" component={ConfirmEmail} />
			<Route path="/ranking" component={Ranking} />
			<Route path="/reset-password" component={ResetPassword} />
			<Route path="/hall-of-fame" component={HallOfFame} />
			<Route component={NotFound} />
		</Route>
	</Router>
)

ReactDOM.render(routing, document.getElementById('root'))
