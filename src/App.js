import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends Component {

  state = {
    bookShelfs: {
      read: [],
      wantToRead: [],
      currentlyReading: []
    }
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let bookShelfs = {
        read: [],
        wantToRead: [],
        currentlyReading: []
      }
      books.forEach((book) => {
        if (bookShelfs[book.shelf]) {
          bookShelfs[book.shelf].push(book)
        }
      });
      this.setState({bookShelfs})
    })
  }
  render() {
    const {bookShelfs} = this.state;

    return (
      <div>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
                <h1>My Book Shelf</h1>
            </div>
            <div className="list-books-content">
                <div>
                   <BookShelf books={bookShelfs['currentlyReading']} title="Currently reading" />
                   <BookShelf books={bookShelfs['wantToRead']} title="Want to read" />
                   <BookShelf books={bookShelfs['read']} title="Read" />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route exact path="/search" render={() => (
          <SearchBooks />
        )} />
      </div>
    );
  }
}

export default App;
