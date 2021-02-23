import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import Header from './components/Header'
import routes from './routes'

import './styles/index.sass'


class App extends React.Component {
  render = () =>
    <div className="App">
      <Router>
        <Header />
        <Switch>
          {routes.map(route =>
            <Route path={route.link}>
              {route.comp}
            </Route>
          )}
        </Switch>
      </Router>
    </div>
}


export default App
