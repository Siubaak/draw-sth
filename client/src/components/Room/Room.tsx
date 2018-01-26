import * as React from 'react';
import Canvas from './components/Canvas/Canvas';
import Chat from './components/Chat/Chat';
import './Room.less';

class Room extends React.Component {
  public render(): JSX.Element {
    return (
      <div id="room">
        <Canvas />
        <Chat />
      </div>
    );
  }
}

export default Room;
