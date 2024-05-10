import React from 'react'
import ReactDOM from 'react-dom/client'
import { Suspense, lazy } from "react";

const App = lazy(() => import('./App2.tsx'))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
)
