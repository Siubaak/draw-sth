import * as React from 'react';
import './Room.less';

class Room extends React.Component {
  public render(): JSX.Element {
    return (
      <div id="room">
        <div className="item" />
        <div className="item" />
        <div className="item" />
      </div>
    );
  }
}

export default Room;
