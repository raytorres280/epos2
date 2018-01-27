import * as React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Main from './Main'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
      
    );
  }
}

export default App;