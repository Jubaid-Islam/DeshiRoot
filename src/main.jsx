import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router.jsx'
import './index.css'
import ReactLenis from 'lenis/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReactLenis root options={{ lerp: 0.08, duration: 1 }}>
      <RouterProvider router={router} />
    </ReactLenis>
  </React.StrictMode>,
)