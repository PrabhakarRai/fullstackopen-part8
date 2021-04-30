import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';

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