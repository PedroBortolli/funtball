import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom'
import App from './App'
import NotFound from './NotFound'
import Login from './auth/login'
import Logoff from './auth/logoff'
import Dashboard from './pages/dashboard'
import Header from './components/header'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import styled from 'styled-components'

const AppContainer = styled.div`
	height: 100%;
	width: 100%;
	margin-left: 20%;
	margin-right: 20%;
	font-family: "Bookman Old Style";
`



const routing = (
	<BrowserRouter>
		<AppContainer>
			<Header key={Math.random()} />
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/test" component={App} />
				<Route path="/login" component={Login} />
				<Route path="/logoff" component={Logoff} />
				<Route path="/dashboard" component={Dashboard} />
				<Route component={NotFound} />
			</Switch>
		</AppContainer>
	</BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'))
serviceWorker.unregister();
