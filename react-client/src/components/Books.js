import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [books, setBooks] = useState(null);
  const result = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result]);


  if (!props.show) {
    return null;
  };

  if (result.loading) {
    return (
      <div>
        <h2>Books</h2>
        <p>loading books ...</p>
      </div>
    );
  }
  if (books) {
    return (
      <div>
        <h2>Books</h2>
        <table>
          <tbody>
            <tr>
              <th>
                Book Title
              </th>
              <th>
                Author
              </th>
              <th>
                Published
              </th>
            </tr>
            {books.map(a =>
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div>
      <h2>Books</h2>
      <p>Unable to load books.</p>
    </div>
  )
}

export default Books;