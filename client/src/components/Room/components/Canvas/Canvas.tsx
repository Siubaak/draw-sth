import * as React from 'react';
import { socket } from '../../../../common/socket';
import './Canvas.less';

interface Start {
  x: number;
  y: number;
  emit?: boolean;
}
interface Draw {
  x: number;
  y: number;
  color: string;
  emit?: boolean;
}

const chatWith: number = 306;
const chatHeight: number = 48;
const canvasSize: number = 768;

class Canvas extends React.Component {
  public state = {
    scale: window.innerWidth > canvasSize
      ? Math.min(window.innerWidth - chatWith, window.innerHeight - 4) / canvasSize
      : Math.min(window.innerWidth, window.innerHeight - chatHeight) / canvasSize,
  };
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private socket: SocketIOClient.Socket;
  // private curId: string;

  public componentDidMount(): void {
    this.canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.addEventListeners();
    this.initSocketIO();
  }
  public render(): JSX.Element {
    return (
      <canvas
        id="canvas"
        width={canvasSize}
        height={canvasSize}
        style={{
          width: canvasSize * this.state.scale,
          height: canvasSize * this.state.scale,
        }}
      >
        您的浏览器不支持 HTML5 canvas 标签。
      </canvas>
    );
  }
  private start(params: Start): void {
    let { x, y, emit = true } = params;
    x -= this.canvas.offsetLeft;
    y -= this.canvas.offsetTop;
    if (emit) {
      // if (this.socket.id && this.socket.id !== this.curId) {
      //   return;
      // }
      x /= this.state.scale;
      y /= this.state.scale;
      this.socket.emit('start', { x, y });
    }
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }
  private draw(params: Draw): void {
    let { x, y, color, emit = true } = params;
    x -= this.canvas.offsetLeft;
    y -= this.canvas.offsetTop;
    if (emit) {
      // if (this.socket.id && this.socket.id !== this.curId) {
      //   return;
      // }
      x /= this.state.scale;
      y /= this.state.scale;
      this.socket.emit('draw', { x, y, color });
    }
    this.ctx.lineTo(x, y);
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }
  private addEventListeners(): void {
    // For touch screen
    this.canvas.addEventListener('touchstart', (e: TouchEvent) => {
      const finger: Touch = e.changedTouches[0];
      this.start({ x: finger.pageX, y: finger.pageY });
    });
    this.canvas.addEventListener('touchmove', (e: TouchEvent) => {
      e.preventDefault();
      const finger: Touch = e.changedTouches[0];
      this.draw({ x: finger.pageX, y: finger.pageY, color: 'red' });
    });
    // For mouse
    let mouseDraw: boolean = false;
    this.canvas.addEventListener('mousedown', (e: MouseEvent) => {
      mouseDraw = true;
      this.start({ x: e.pageX, y: e.pageY });
    });
    this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      if (mouseDraw) {
        this.draw({ x: e.pageX, y: e.pageY, color: 'black' });
      }
    });
    this.canvas.addEventListener('mouseup', (e: MouseEvent) => mouseDraw = false);
    this.canvas.addEventListener('mouseleave', (e: MouseEvent) => mouseDraw = false);
    // For window resize
    window.addEventListener('resize', () => {
      this.setState({
        scale: window.innerWidth > canvasSize
          ? Math.min(window.innerWidth - chatWith, window.innerHeight - 4) / canvasSize
          : Math.min(window.innerWidth, window.innerHeight - chatHeight) / canvasSize,
      });
    });
  }
  private initSocketIO(): void {
    this.socket = socket;
    // this.socket.on('now', (msg: any) => this.curId = msg.id);
    this.socket.on('start', (msg: Start) => this.start({ ...msg, emit: false }));
    this.socket.on('draw', (msg: Draw) => this.draw({ ...msg, emit: false }));
  }
}

export default Canvas;
