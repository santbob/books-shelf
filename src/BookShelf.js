import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
	updateBook = (book, newShelf) => {
		if (this.props.onUpdateBook) {
			this.props.onUpdateBook(book, newShelf)
		}
	}

	render() {
		const {books, title} = this.props;
		return (
			<div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                	<ol className="books-grid">
				        {books.map((book) => (
				        	<li key={book.id}>
                            	<Book book={book} onUpdate={this.updateBook}/>
                        	</li>
				        ))}
			    	</ol>
                </div>
            </div>
		)
	}
}

export default BookShelf;