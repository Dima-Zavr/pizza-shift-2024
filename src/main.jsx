import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { store } from "./store/store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Provider store={store}>
          <App />
      </Provider>
  </BrowserRouter>,
)
