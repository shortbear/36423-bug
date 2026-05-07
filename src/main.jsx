import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BuggyComponent from './BuggyComponent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BuggyComponent />
  </StrictMode>,
)
