import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom'
import App from './App'
import NotFound from './NotFound'
import Login from './auth/Login'
import Logoff from './auth/Logoff'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.css'

const routing = (
	<BrowserRouter>
		<div>
			<Link to="/">Home</Link>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/test" component={App} />
				<Route path="/login" component={Login} />
				<Route path="/logoff" component={Logoff} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'))
serviceWorker.unregister();
