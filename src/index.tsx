import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import consoleSineWave from './utils/consoleSineWave'
import initIntense from './utils/intense'


consoleSineWave()
initIntense()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
