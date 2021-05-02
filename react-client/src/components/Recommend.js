import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_BOOKS_BY_GENRE, WHO_IS_ME } from '../queries';

const Recommend = (props) => {
  const [books, setBooks] = useState(null);
  const { data: userData } = useQuery(WHO_IS_ME, {
    onError: (err) => {
      console.log(err);
    }
  });
  const favoriteGenre = userData?.me?.favoriteGenre;
  const result = useQuery(FIND_BOOKS_BY_GENRE, {
    skip: !favoriteGenre,
    variables: {
      genreToSearch: favoriteGenre,
    }
  })

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result, favoriteGenre, userData]);

  if (!props.show) {
    return null;
  };

  if (result.loading) {
    return (
      <div>
        <h2>Recommendations</h2>
        <p>loading recommended books ...</p>
      </div>
    );
  }

  if (books && books.length > 0) {
    return (
      <div>
        <h2>Recommendations</h2>
        <div>Books in your favorite genre <b>{favoriteGenre}</b></div>
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
  if (books) {
    return (
      <div>
        <h2>Recommendations</h2>
        <div>No books found in your favorite genre: <b>{favoriteGenre}</b>.</div>
      </div>
    )
  }
  return (
    <div>
      <h2>Recommendations</h2>
      <p>Unable to load recommended books.</p>
    </div>
  )
}

export default Recommend;