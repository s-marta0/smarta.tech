import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import routes from './routes'

import './styles/index.sass'


const App: React.FC = () =>
  <Router>
    <div className='App'>
      <ScrollToTop>
        <Header />
        <div className='content'>
          <div className='container'>
            <Switch>
              {routes.map(route =>
                <Route
                  key={route.link}
                  path={route.link}
                  exact={route.link === '/'}
                >
                  {route.comp}
                </Route>
              )}
            </Switch>
          </div>
        </div>
      </ScrollToTop>
    </div>
  </Router>


export default App
