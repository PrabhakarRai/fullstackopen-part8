import React, { useState } from 'react';

const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuhtor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  if (!props.show) {
    return null
  };

  const submit = async (event) => {
    event.preventDefault();
    // TODO: add book to the server
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