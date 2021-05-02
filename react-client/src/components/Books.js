import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [books, setBooks] = useState(null);
  const [filteredBooks, setFilterdBooks] = useState(null);
  const [allGenres, setAllGenres] = useState([]);
  const [genreFilter, setGenreFilter] = useState('');
  const result = useQuery(ALL_BOOKS);

  const filterBooks = () => {
    if (genreFilter === '') {
      setFilterdBooks(books.map((b) => b));
      return;
    }
    setFilterdBooks(books.filter((b) => {
      for (let g of b.genres) {
        if (g === genreFilter) {
          return true;
        }
      }
      return false;
    }));
  };

  const getAllGenres = () => {
    if (books === null) {
      setAllGenres([]);
      return;
    }
    setAllGenres(books.reduce((gs, b) => {
      let totalGenresTillNow = gs.map((a) => a);
      for (let g of b.genres) {
        if(!totalGenresTillNow.includes(g)) {
          totalGenresTillNow.push(g);
        }
      }
      return totalGenresTillNow;
    }, []))
  }
  
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result]);
  
  useEffect(() => {
    if (books) {
      filterBooks();
      getAllGenres();
    } // eslint-disable-next-line
  }, [books]); 

  useEffect(() => {
    if (books) {
      filterBooks();
    } // eslint-disable-next-line
  }, [genreFilter]);

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
        <h3>Apply Filter</h3>
        {
          allGenres.map((g) => {
            return (<button key={g} onClick={() => setGenreFilter(g)}>
              {g}
            </button>)
          })
        }
        <button onClick={() => setGenreFilter('')}>Clear Filter</button>
        { genreFilter !== '' && <div>Showing resutls in Genre <b>{genreFilter}</b></div>}
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
            {filteredBooks.map(a =>
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