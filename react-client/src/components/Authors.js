import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, SET_BORN_YEAR } from '../queries';

const AuthorBirthYearUpdate = ({ authors }) => {
  const [born, setBorn] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState(authors[0].name);
  const [ updateBirthYear ] = useMutation(SET_BORN_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS }],
  })
  const submit = (e) => {
    e.preventDefault();
    updateBirthYear({ variables: { name: selectedAuthor, born: Number(born) }});
    setBorn('');
  }

  const handleChange = (e) => {
    setSelectedAuthor(e.target.value);
  }
  
  return (
    <div>
      <h2>
        Set Birthyear
      </h2>
      <form onSubmit={submit}>
        <div>
          <label>
            Name
            <select value={selectedAuthor} onChange={handleChange}>
              {
                authors.map((a) => <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                )
              }
            </select>
          </label>
        </div>
        <div>
          Birth Year
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>Update Birthyear</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const [authors, setAuthors] = useState(null);
  const result = useQuery(ALL_AUTHORS);

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors);
    }
  }, [result]);

  if (!props.show) {
    return null
  };

  
  if (result.loading) {
    return (
      <div>
        <h2>Authors</h2>
        <p>Loading...</p>
      </div>
    );
  }
 
  if (authors) {
    return (
      <div>
        <h2>Authors</h2>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>
                Born
              </th>
              <th>
                Books
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
        <AuthorBirthYearUpdate authors={authors} />
      </div>
    )
  }

  return (
    <div>
      <h2>Authors</h2>
      <p>Unable to fetch authors.</p>
    </div>
  );
}

export default Authors;