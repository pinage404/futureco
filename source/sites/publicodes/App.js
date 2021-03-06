import RulePage from 'Components/RulePage'
import React, { Suspense, Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import 'Ui/index.css'
import Provider from '../../Provider'
import Route404 from 'Components/Route404'
import RulesList from '../mon-entreprise.fr/pages/Documentation/RulesList'
import sitePaths from './sitePaths'
import Landing from './Landing'
import Simulateur from './Simulateur'
import About from './About'
import Contribution from './Contribution'
import TopBar from './TopBar'
import Scenarios from './Scenarios'
import { StoreProvider } from './StoreContext'

let Studio = React.lazy(() => import('./Studio'))

class App extends Component {
	render() {
		return (
			<Provider
				basename="publicodes"
				rulesConfig={{
					fetch: {
						repo: 'laem/futureco-data',
						filePath: 'co2.yaml'
					}
				}}
				sitePaths={sitePaths()}
				reduxMiddlewares={[]}>
				<StoreProvider>
					<div className="ui__ container">
						<TopBar />
						<Switch>
							<Route exact path="/" component={Landing} />
							<Route path="/documentation/:name+" component={RulePage} />
							<Route path="/documentation" component={RulesList} />
							<Route path="/simulateur/:name+" component={Simulateur} />
							<Route path="/contribuer/:input?" component={Contribution} />
							<Route path="/scénarios" component={Scenarios} />
							<Route path="/à-propos" component={About} />
							<Route
								path="/studio"
								component={() => (
									<Suspense fallback={<div>Chargement de l'éditeur ...</div>}>
										<Studio />
									</Suspense>
								)}
							/>
							<Route component={Route404} />
						</Switch>
					</div>
				</StoreProvider>
			</Provider>
		)
	}
}

let devMode = process.env.NODE_ENV !== 'production'
export default devMode
	? do {
			let { hot } = require('react-hot-loader')
			hot(module)(App)
	  }
	: App
