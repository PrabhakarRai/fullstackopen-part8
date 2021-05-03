import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, FIND_BOOKS_BY_GENRE } from '../queries';

const NewBook = ({ show, setError, userData, getRecBooks }) => {
  const [title, setTitle] = useState('');
  const [author, setAuhtor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [ createBook ] = useMutation(ADD_BOOK, {
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
      setError(err.graphQLErrors[0].message);
    },
    onCompleted: () => {
      getRecBooks({
        variables: {
          genreToSearch: userData.favoriteGenre,
        },
      });
    }
  });

  if (!show) {
    return null
  };

  const submit = async (event) => {
    event.preventDefault();
    if (genres.length > 0) {
      createBook({
        variables: {
          title,
          author,
          genres,
          published: Number(published),
        },
        refetchQueries: [
          { query: ALL_BOOKS },
          { query: ALL_AUTHORS },
          {
            query: FIND_BOOKS_BY_GENRE,
            variables: {
              genreToSearch: userData.favoriteGenre,
            },
          }
        ],
      });
    } else {
      createBook({
        variables: {
          title,
          author,
          genres,
          published: Number(published),
        },
        refetchQueries: [
          { query: ALL_BOOKS },
          { query: ALL_AUTHORS },
        ],
      });
    }

    setTitle('');
    setPublished('');
    setAuhtor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          Published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          Genre
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">Add Genre</button>
        </div>
        <div>
          Genres: {genres.join(', ')}
        </div>
        <button type='submit'>Create Book</button>
      </form>
    </div>
  );
};

export default NewBook;