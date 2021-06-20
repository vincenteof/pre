import React, { useState } from 'react'
import { render } from 'react-dom'
import './style.scss'

const getUserModule = () => import('./common/userAPI')

function App() {
  const [loaded, setLoaded] = useState(false)
  return (
    <div>
      <div className="txt">hello</div>
      <button
        onClick={() =>
          getUserModule().then(({ getUsers }) => {
            getUsers().then((json) => {
              setLoaded(true)
              console.log(json)
            })
          })
        }
      >
        load
      </button>
      <span>{loaded ? '已加载' : '未加载'}</span>
    </div>
  )
}

render(<App />, document.getElementById('root'))
