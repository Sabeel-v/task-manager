import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux' // Import Provider
import { store } from './redux/store' // Import your configured store
import { BrowserRouter } from 'react-router-dom' // Ensure Router is here too
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)