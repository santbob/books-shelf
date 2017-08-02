import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
	state = {
		query: '',
		books: []
	}

	updateQuery = (query) => {
		query = query.trim();
		if(query) {
			this.setState({
				query: query.trim()
			})
			this.search()
		} else {
			this.clearQuery()
		}
	}

	search = () => {
		BooksAPI.search(this.state.query, 25).then((books) => {
			books = books || []
	      	this.setState({books})
	    })
	}

	clearQuery = () => {
		this.setState({
			query: '',
			books: []
		})
	}
	render() {
		const { books, query } = this.state
		return (
			<div className="search-books">
            	<div className="search-books-bar">
            		<Link className="close-search" to="/">Close</Link>
              		<div className="search-books-input-wrapper">
                		<input 
                			type="text"
                			placeholder="Search by title or author"
                			value={query}
                			onChange={(event) => this.updateQuery(event.target.value)} />
              		</div>
            	</div>
            	<div className="search-books-results">
              		<ol className="books-grid">
              			{books.map((book) => (
				        	<li key={book.id}>
                            	<Book book={book} />
                        	</li>
				        ))}
              		</ol>
            	</div>
			</div>
		)
	}
}

export default SearchBooks;