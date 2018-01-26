import * as React from 'react';
import './Chat.less';

class Chat extends React.Component {
  public render(): JSX.Element {
    return (
      <div id="chat">
        <div className="msg-box">1</div>
        <div className="type-box">2</div>
      </div>
    );
  }
}

export default Chat;
