import React, { Component } from 'react';
import logo from './logo.svg';
import { Route } from 'react-router-dom'
import ListBookShelf from './ListBookShelf'
import SearchBooks from './SearchBooks'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <ListBookShelf />
        )} />
        <Route exact path="/search" render={() => (
          <SearchBooks />
        )} />
      </div>
    );
  }
}

export default App;
