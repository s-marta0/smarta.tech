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
        <div className="content">
          <div className="container">
            <Switch>
              {routes.map(route =>
                <Route
                  key={route.link}
                  path={route.link}
                  exact={route.link === "/"}
                >
                  {route.comp}
                </Route>
              )}
            </Switch>
          </div>
        </div>
      </Router>
    </div>
}


export default App
