import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

const App = () => {
  const [page, setPage] = useState('authors');

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('add_book')}>Add Book</button>
      </div>
      <Authors
        show={page === 'authors'}
      />
      <Books
        show={page === 'books'}
      />
      <NewBook
        show={page === 'add_book'}
      />
    </div>
  );
};

export default App;