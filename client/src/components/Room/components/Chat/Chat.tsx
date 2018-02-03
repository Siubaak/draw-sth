import * as React from 'react';
import { socket } from '../../../../common/socket';
import './Chat.less';

interface Msg {
  id: string;
  name: string;
  msg: string;
}
interface State {
  msg: string;
  msgList: Msg[];
}

class Chat extends React.Component {
  public state: State = {
    msg: '',
    msgList: [],
  };
  private socket: SocketIOClient.Socket;
  public componentDidMount(): void {
    this.initSocketIO();
    window.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        this.handleSend();
      }
    });
  }
  public render(): JSX.Element {
    return (
      <div id="chat">
        <div className="type-box">
          <input className="input-box" value={this.state.msg} onChange={this.handleChange}/>
          <button className="send-button" onClick={this.handleSend}>发送</button>
        </div>
        <div className="msg-box">
        {
          this.state.msgList.map((msg, index) =>
            <div key={index}>{msg.name}：{msg.msg}</div>
          )
        }
        </div>
      </div>
    );
  }
  private handleSend = () => {
    if (this.state.msg.length) {
      const newMsgList: Msg[] = [ ...this.state.msgList ];
      const newMsg: Msg = {
        id: this.socket.id,
        name: this.socket.id.substring(0, 3),
        msg: this.state.msg,
      };
      newMsgList.unshift(newMsg);
      this.setState({
        msg: '',
        msgList: newMsgList,
      });
      this.socket.emit('send', newMsg);
    }
  }
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ msg: e.target.value });
  }
  private initSocketIO(): void {
    this.socket = socket;
    this.socket.on('send', (msg: Msg) => {
      const newMsgList: Msg[] = [ ...this.state.msgList ];
      newMsgList.unshift(msg);
      this.setState({ msgList: newMsgList });
    });
  }
}

export default Chat;
