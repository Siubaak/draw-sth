import * as React from 'react';
import Login from './components/Login/Login';
import './App.less';

class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div className="App">
        <Login/>
      </div>
    );
  }
}

export default App;
