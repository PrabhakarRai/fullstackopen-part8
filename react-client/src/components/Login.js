import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../queries';

const Login = ({ show, setToken, setError, setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [ loginUser, result ] = useMutation(LOGIN_USER, {
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
      setError(err.graphQLErrors[0].message);
    },
    onCompleted: () => {
      setPage('authors');
    }
  });

  const submit = async (event) => {
    event.preventDefault();
    loginUser({
      variables: {
        username,
        password,
      }
    });
    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value;
      localStorage.setItem('library-user-token', token);
      setToken(token);
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Username:
          <input
            required={true}
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            required={true}
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
