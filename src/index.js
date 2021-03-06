import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import axios from 'axios'

import App from './App'
import configureStore from './Redux/configureStore'
import rootSaga from './Redux/rootSaga'

const store = configureStore()
store.runSaga(rootSaga)

axios.defaults.baseURL = 'http://localhost:3100'
axios.defaults.headers.post['Content-Type'] = 'application/json'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
