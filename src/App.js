import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SearchBooks from './SearchBooks';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';
import './App.css';

class App extends Component {
  state = {
    books: []
  };

  updateBook = (bookToUpdate, newShelf) => {
    let books = this.state.books || [];
    let isNewBook = true;
    books = books.map(book => {
      if (book.id === bookToUpdate.id) {
        book.shelf = newShelf;
        isNewBook = false;
      }
      return book;
    });
    if (isNewBook) {
      bookToUpdate.shelf = newShelf;
      books.push(bookToUpdate);
    }
    this.setState({ books });
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  render() {
    const { books } = this.state;
    const wantToRead = books.filter(book => book.shelf === 'wantToRead');
    const currentlyReading = books.filter(
      book => book.shelf === 'currentlyReading'
    );
    const read = books.filter(book => book.shelf === 'read');
    return (
      <div>
        <Route
          exact
          path="/"
          render={() =>
            <div className="list-books">
              <div className="list-books-title">
                <h1>My Book Shelf</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    books={currentlyReading}
                    title="Currently reading"
                    onBookUpdate={this.updateBook}
                  />
                  <BookShelf
                    books={wantToRead}
                    title="Want to read"
                    onBookUpdate={this.updateBook}
                  />
                  <BookShelf
                    books={read}
                    title="Read"
                    onBookUpdate={this.updateBook}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>}
        />
        <Route
          exact
          path="/search"
          render={() =>
            <SearchBooks
              booksInMyShelfs={books}
              onBookUpdate={this.updateBook}
            />}
        />
      </div>
    );
  }
}

export default App;
