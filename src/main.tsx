import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import AuthRouter from './router/helper/authRouter'
import './style.css'
import { initVChartSemiTheme } from '@visactor/vchart-semi-theme'

// initialization
initVChartSemiTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </BrowserRouter>
  </StrictMode>
)
