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
import SingleProject from './pages/SingleProject'

import './styles/index.sass'
// import Test from './components/Test'


const App: React.FC = () =>
  <Router>
    <Provider>
      <div className='App'>
        <ScrollToTop>
          <Header />
          <div className='content'>
            <Switch>
              <Route path="/projects/:projectId" component={SingleProject} />
              {routes.map(route =>
                <Route
                  key={route.link}
                  path={route.link}
                  exact={route.link === '/'}
                >
                  {route.link === '/' ? route.comp : (
                    <div className='container'>
                      {route.comp}
                    </div>
                  )}
                </Route>
              )}
            </Switch>
          </div>
        </ScrollToTop>
      </div>
    </Provider>
  </Router>


export default App
