import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom'
import App from './App'
import NotFound from './NotFound'
import Login from './auth/login'
import Logoff from './auth/logoff'
import Dashboard from './pages/dashboard'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import logo from './assets/funtball-logo.png'

const routing = (
	<BrowserRouter>
		<div>
			<img src={logo} width="50%" height="15%"/>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/test" component={App} />
				<Route path="/login" component={Login} />
				<Route path="/logoff" component={Logoff} />
				<Route path="/dashboard" component={Dashboard} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'))
serviceWorker.unregister();
