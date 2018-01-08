import React, { Component } from 'react'
import Room from './components/Room'
import io from 'socket.io-client'
import './App.less'

const canvasSize = 768

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Room/>
      </div>
    )
  }
}

export default App
