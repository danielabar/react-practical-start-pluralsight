import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

// 3 simple function components that render a header
// all together in one file with App root component for simplicity
const Root = () => {
  return (
    <h2>Home component</h2>
  );
}

const Search = () => {
  return (
    <h2>Search component</h2>
  );
}

const List = () => {
  return (
    <h2>List component</h2>
  );
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/list">List</Link></li>
          </ul>
          <Switch>
            <Route exact path="/" component={Root} />
            <Route path="/search" component={Search} />
            <Route path="/list" component={List} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;