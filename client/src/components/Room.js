import React, { Component } from 'react'
import io from 'socket.io-client'
import './Room.less'

const canvasSize = 768

class Room extends Component {
  state = {
    scale: Math.min(window.innerWidth / canvasSize, 1),
  }
  start = ({ x, y, emit = true }) => {
    if (emit) {
      if (this.socket.id && this.socket.id !== this.curId) return
      x /= this.state.scale
      y /= this.state.scale
      this.socket.emit('start', { x, y })
    }
    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
  }
  draw = ({ x, y, color, emit = true }) => {
    if (emit) {
      if (this.socket.id && this.socket.id !== this.curId) return
      x /= this.state.scale
      y /= this.state.scale
      this.socket.emit('draw', { x, y, color })
    }
    this.ctx.lineTo(x, y)
    this.ctx.strokeStyle = color
    this.ctx.stroke()
  }
  clear = ({ emit = true }) => {
    this.canvas.clear()
  }
  addEventListeners = () => {
    // For touch screen
    this.canvas.addEventListener('touchstart', e => {
      const finger = e.changedTouches[0]
      this.start({ x: finger.pageX, y: finger.pageY })
    })
    this.canvas.addEventListener('touchmove', e => {
      e.preventDefault()
      const finger = e.changedTouches[0]
      this.draw({ x: finger.pageX, y: finger.pageY, color: 'red' })
    })
    // For mouse
    let mouseDraw = false
    this.canvas.addEventListener('mousedown', e => {
      mouseDraw = true
      this.start({ x: e.pageX, y: e.pageY })
    })
    this.canvas.addEventListener('mousemove', e => {
      if (mouseDraw) this.draw({ x: e.pageX, y: e.pageY, color: 'black' })
    })
    this.canvas.addEventListener('mouseup', e => mouseDraw = false)
    this.canvas.addEventListener('mouseleave', e => mouseDraw = false)
    // For window resize
    window.addEventListener('resize', () => {
      this.setState({ scale: Math.min(window.innerWidth / canvasSize, 1) })
    })
  }
  initSocketIO = () => {
    this.socket = io('http://192.168.1.120:7001')
    this.socket.on('now', msg => this.curId = msg.id)
    this.socket.on('start', msg => this.start({ ...msg, emit: false }))
    this.socket.on('draw', msg => this.draw({ ...msg, emit: false }))
  }
  componentDidMount() {
    this.canvas = document.querySelector('#canvas')
    this.ctx = this.canvas.getContext('2d')
    this.addEventListeners()
    this.initSocketIO()
  }
  render() {
    return (
      <div id='room'>
        <canvas
          id='canvas'
          width={canvasSize}
          height={canvasSize}
          style={{
            width: canvasSize * this.state.scale,
            height: canvasSize * this.state.scale,
          }}
        >
          您的浏览器不支持 HTML5 canvas 标签。
        </canvas>
      </div>
    )
  }
}

export default Room
