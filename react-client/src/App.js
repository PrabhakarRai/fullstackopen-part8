import React, { useEffect, useState } from 'react';
import { useApolloClient, useLazyQuery } from '@apollo/client';
import Notify from './components/Notify';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Recommend from './components/Recommend';
import Login from './components/Login';
import { WHO_IS_ME, FIND_BOOKS_BY_GENRE } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [recBooks, setRecBooks] = useState(null);

  const client = useApolloClient();
  const [getUser] = useLazyQuery(WHO_IS_ME, {
    onError: (err) => {
      console.log(err);
    },
    onCompleted: (d) => {
      setUserData(d.me);
    }
  });

  const [getRecBooks] = useLazyQuery(FIND_BOOKS_BY_GENRE, {
    onError: (err) => {
      console.log(err);
    },
    onCompleted: (d) => {
      setRecBooks(d.allBooks);
    }
  });

  const logout = () => {
    localStorage.removeItem('library-user-token');
    client.resetStore();
    setToken(null);
    setPage('authors');
  };
  
  useEffect(() => {
    if (userData) {
      getRecBooks({
        variables: {
          genreToSearch: userData.favoriteGenre,
        },
      });
    }
  }, [userData, getRecBooks]);
  
  useEffect(() => {
    setTimeout(() => setErrorMessage(null), 5000);
  }, [errorMessage]);

  useEffect(() => {
    const localToken = localStorage.getItem('library-user-token');
    if (localToken) {
      setToken(localToken);
      getUser();
    }
  }, [getUser]);

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
        getUser={getUser}
      />
      {userData && <Recommend
        show={page === 'recommend'}
        userData={userData}
        books={recBooks}
      />}
    </div>
  );
};

export default App;