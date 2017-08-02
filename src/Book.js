import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'


class Book extends Component {

    handleChange = (e) => {
        const book = this.props.book
        const newShelf = e.target.value

        BooksAPI
            .update(book, newShelf)
            .then(() => {
                if (this.props.onUpdate) {
                    this.props.onUpdate(book, newShelf)
                }
            })
    }

	render () {
        const { book } = this.props;
		return (
			<div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={this.handleChange}>
                            <option value="" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
		)
	}
}

export default Book;
