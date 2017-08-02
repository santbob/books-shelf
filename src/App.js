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

  updateBook = (bookToUpdate, newShelf) => {
    let bookShelfs = this.state.bookShelfs
    let books = bookShelfs[bookToUpdate.shelf].filter((book) => {
        return book.id !== bookToUpdate.id
    })
    bookShelfs[bookToUpdate.shelf] = books
    bookToUpdate.shelf = newShelf;
    bookShelfs[newShelf].push(bookToUpdate)
    this.setState({bookShelfs})
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
                   <BookShelf books={bookShelfs['currentlyReading']} title="Currently reading" onBookUpdate={this.updateBook} />
                   <BookShelf books={bookShelfs['wantToRead']} title="Want to read" onBookUpdate={this.updateBook} />
                   <BookShelf books={bookShelfs['read']} title="Read" onBookUpdate={this.updateBook} />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route exact path="/search" render={() => (
          <SearchBooks onBookUpdate={this.updateBook}/>
        )} />
      </div>
    );
  }
}

export default App;
