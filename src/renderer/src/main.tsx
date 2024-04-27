import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cart from './pages/Cart'
import Product from './pages/Product'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/product',
    element: <Product />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
