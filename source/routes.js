import React from 'react'
import { Route, IndexRoute, Link } from 'react-router'
import Layout from './containers/Layout'
import Home from './containers/Home'
import Rule from './components/Rule'
import SimulationCDD from './components/SimulationCDD'
import SimulationNet from './components/SimulationNet'
import CDDIntro from './components/CDDIntro'


let RouteNotFound = () =>
  <div style={{color: '#333350', margin: '15% auto', width: '15em', textAlign: 'center'}}>
    <h2>
      On peut facilement se perdre dans la législation...
    </h2>
    <Link to="/">
    {/* TODO: credits for the image to add: https://thenounproject.com/term/treasure-map/96666/ */}
      <img style={{margin: '3%'}} width="250px" src={require('./images/map-directions.png')} />
      Revenir en lieu sûr
    </Link>
  </div>


export default (
  <Route path="/" component={Layout}>
    <Route path="regle/:name" component={Rule} />
    <Route path="cdd-intro" component={CDDIntro} />
    <Route path="cdd" component={SimulationCDD} />
    <Route path="net" component={SimulationNet} />
    <IndexRoute component={Home} />
    <Route path="*" component={RouteNotFound} />
  </Route>
)
