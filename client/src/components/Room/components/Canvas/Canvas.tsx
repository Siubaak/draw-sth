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
  private mouseDraw: boolean = false;
  // private curId: string;

  public componentDidMount(): void {
    this.canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.socket = socket;

    // this.socket.on('now', (msg: any) => this.curId = msg.id);
    this.socket.on('start', (msg: Start) => this.start({ ...msg, emit: false }));
    this.socket.on('draw', (msg: Draw) => this.draw({ ...msg, emit: false }));

    window.addEventListener('resize', () => {
      this.setState({
        scale: window.innerWidth > canvasSize
          ? Math.min(window.innerWidth - chatWith, window.innerHeight - 4) / canvasSize
          : Math.min(window.innerWidth, window.innerHeight - chatHeight) / canvasSize,
      });
    });
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
        // touch
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        // mouse
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.cancelMouseDraw}
        onMouseLeave={this.cancelMouseDraw}
      >
        您的浏览器不支持 HTML5 Canvas 标签。
      </canvas>
    );
  }
  private start(params: Start): void {
    let { x, y, emit = true } = params;
    if (emit) {
      // if (this.socket.id && this.socket.id !== this.curId) {
      //   return;
      // }
      x /= this.state.scale;
      y /= this.state.scale;
      this.socket.emit('start', { x, y });
    }
    x -= this.canvas.offsetLeft;
    y -= this.canvas.offsetTop;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }
  private draw(params: Draw): void {
    let { x, y, color, emit = true } = params;
    if (emit) {
      // if (this.socket.id && this.socket.id !== this.curId) {
      //   return;
      // }
      x /= this.state.scale;
      y /= this.state.scale;
      this.socket.emit('draw', { x, y, color });
    }
    x -= this.canvas.offsetLeft;
    y -= this.canvas.offsetTop;
    this.ctx.lineTo(x, y);
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }
  private handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const finger: Touch = e.changedTouches[0];
    this.start({ x: finger.pageX, y: finger.pageY });
  }
  private handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const finger: Touch = e.changedTouches[0];
    this.draw({ x: finger.pageX, y: finger.pageY, color: 'red' });
  }
  private handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    this.mouseDraw = true;
    this.start({ x: e.pageX, y: e.pageY });
  }
  private handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (this.mouseDraw) {
      this.draw({ x: e.pageX, y: e.pageY, color: 'black' });
    }
  }
  private cancelMouseDraw = (e: React.MouseEvent<HTMLCanvasElement>) => this.mouseDraw = false;
}

export default Canvas;
