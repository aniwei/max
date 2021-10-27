import { useState, useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const worker = new Worker(`./nodejs/worker/index.ts`, {
      type: 'module'
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>Run NodeJS In Browser</p>
      </header>
    </div>
  )
}

export default App
