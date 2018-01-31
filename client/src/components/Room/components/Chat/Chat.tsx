import * as React from 'react';
import './Chat.less';

class Chat extends React.Component {
  public state = {
    msg: '',
    msgList: [
      { id: '1', name: '测试', msg: '哈哈哈哈' },
      { id: '2', name: '测试', msg: '哈哈哈哈' },
      { id: '3', name: '测试', msg: '哈哈哈哈' },
      { id: '4', name: '测试', msg: '哈哈哈哈' },
      { id: '5', name: '测试', msg: '哈哈哈哈' },
      { id: '6', name: '测试', msg: '哈哈哈哈' },
      { id: '7', name: '测试', msg: '哈哈哈哈' },
    ]
  };
  public componentDidMount(): void {
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
      const newMsgList = [ ...this.state.msgList ];
      newMsgList.unshift({
        id: '0',
        name: '哈哈',
        msg: this.state.msg,
      });
      this.setState({
        msg: '',
        msgList: newMsgList,
      });
    }
  }
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ msg: e.target.value });
  }
}

export default Chat;
