import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import { Provider } from './components/Store'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import routes from './routes'

import './styles/index.sass'
// import Test from './components/Test'


const App: React.FC = () =>
  <Router>
    <Provider>
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
    </Provider>
  </Router>


export default App
