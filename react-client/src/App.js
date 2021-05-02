import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import Notify from './components/Notify';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Recommend from './components/Recommend';
import Login from './components/Login';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.removeItem('library-user-token');
    client.resetStore();
    setPage('authors');
  };

  useEffect(() => {
    setTimeout(() => setErrorMessage(null), 5000);
  }, [errorMessage]);
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        { token && <button onClick={() => setPage('recommend')}>Recommended</button>}
        { token && <button onClick={() => setPage('add_book')}>Add Book</button>}
        {!token && <button onClick={() => setPage('login')}>Login</button>}
        { token && <button onClick={logout}>Logout</button> }
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors
        show={page === 'authors'}
        setError={setErrorMessage}
      />
      <Books
        show={page === 'books'}
      />
      <NewBook
        show={page === 'add_book'}
        setError={setErrorMessage}
      />
      <Login
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken}
        setError={setErrorMessage}
      />
      <Recommend
        show={page === 'recommend'}
      />
    </div>
  );
};

export default App;