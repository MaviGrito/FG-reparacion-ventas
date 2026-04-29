import React from 'react'
import ReactDOM from 'react-dom/client'
import './lib/i18n'
import './index.css'
import ErrorBoundary from './components/common/ErrorBoundary'
import AppRouter from './router/AppRouter'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  </React.StrictMode>,
)
