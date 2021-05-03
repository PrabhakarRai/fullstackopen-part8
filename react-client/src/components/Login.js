import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../queries';

const Login = ({ show, setToken, setError, setPage, getUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [ loginUser ] = useMutation(LOGIN_USER, {
    onError: (err) => {
      console.log(err.message);
      setError(err.message);
    },
    onCompleted: (result) => {
      const token = result.login.value;
      localStorage.setItem('library-user-token', token);
      setToken(token);
      setPage('authors');
      getUser();
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

  // useEffect(() => {
  //   if ( result.data ) {
  //     const token = result.data.login.value;
  //     localStorage.setItem('library-user-token', token);
  //     setToken(token);
  //   }
  // }, [result]) // eslint-disable-line

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
