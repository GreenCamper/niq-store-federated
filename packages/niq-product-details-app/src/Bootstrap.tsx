import * as React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'

const rootElement = document.getElementById('root')
if (rootElement === null) throw new Error('Failed to find the root element')
const root = ReactDOMClient.createRoot(rootElement)

root.render(
  <React.Fragment>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </React.Fragment>,
)
