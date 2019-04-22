import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom'
import './index.css'
import App from './App'
import NotFound from './NotFound'
import * as serviceWorker from './serviceWorker'

const routing = (
	<BrowserRouter>
		<div>
			<Link to="/">Home</Link>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/test" component={App} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'))
serviceWorker.unregister();
