import './assets/main.css'

import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Users from './pages/User'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Users />
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
  <>
    <RouterProvider router={router} />
  </>
)
