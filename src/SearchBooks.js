import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  };

  updateQuery = query => {
    if (query) {
      this.setState({
        query: query
      });
      this.search();
    } else {
      this.clearQuery();
    }
  };

  moveBookToShelf = (bookToMove, newShelf) => {
    let books = this.state.books || [];
    books.forEach(book => {
      if (book.id === bookToMove.id) {
        bookToMove.shelf = newShelf
        book = bookToMove
      }
    });
    this.setState({ books });
    if (this.props.onBookUpdate) {
      this.props.onBookUpdate(bookToMove, newShelf);
    }
  };

  search = () => {
    BooksAPI.search(this.state.query.trim(), 25).then(books => {
      if (!books || !Array.isArray(books)) {
        books = [];
      }
      let currentBooksMap = {};
      this.props.booksInMyShelfs.forEach(book => {
        currentBooksMap[book.id] = book;
      });

      books = books.map(book => {
        if (currentBooksMap[book.id]) {
          return currentBooksMap[book.id];
        } else {
          book.shelf = 'none';
          return book;
        }
      });

      this.setState({ books });
    });
  };

  clearQuery = () => {
    this.setState({
      query: '',
      books: []
    });
  };
  render() {
    const { books, query } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book =>
              <li key={book.id}>
                <Book book={book} onUpdate={this.moveBookToShelf} />
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchBooks;
