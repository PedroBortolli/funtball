import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './App'
import NotFound from './NotFound'
import Login from './auth/login'
import Logoff from './auth/logoff'
import Dashboard from './pages/dashboard'
import Ranking from './pages/ranking'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import styled from 'styled-components'
import {getCredentials} from './auth/services'

const AppContainer = styled.div`
	height: 100%;
	width: 100%;
	font-family: "Bookman Old Style";
`

const verifyLogin = () => {
	const credentials = getCredentials()
	if (!credentials) browserHistory.push({
		pathname: '/login',
		state: 'You must log in to view this page'
	})
}

const routing = (	
	<AppContainer>
		<Router history={browserHistory}>
			<Route exact path="/" component={App}>
				<Route path="/login" component={() => <Login history={browserHistory} />} />
				<Route path="/logoff" component={() => <Logoff history={browserHistory} />} />
				<Route path="/dashboard" component={Dashboard} onEnter={() => verifyLogin()} />
				<Route path="/ranking" component={Ranking} />
				<Route component={NotFound} />
			</Route>
		</Router>
	</AppContainer>
)

ReactDOM.render(routing, document.getElementById('root'))
serviceWorker.unregister();
