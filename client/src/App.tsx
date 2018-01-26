import * as React from 'react';
import Room from './components/Room/Room';
import './App.less';

class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div className="App">
        <Room/>
      </div>
    );
  }
}

export default App;
