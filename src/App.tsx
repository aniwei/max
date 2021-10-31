import { useState, useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const worker = new Worker(`/nodejs/runtime/index.ts`, {
      type: 'module'
    });

    worker.addEventListener(`message`, () => {
      debugger;
      worker.postMessage({

      })
    })
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
