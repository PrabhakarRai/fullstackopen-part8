import React from 'react';

const Recommend = ({ show, userData, books }) => {  
  if (!show) {
    return null;
  }
  
  if (books && books.length > 0) {
    return (
      <div>
        <h2>Recommendations</h2>
        <div>Books in your favorite genre <b>{userData.favoriteGenre}</b></div>
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
        <div>No books found in your favorite genre: <b>{userData.favoriteGenre}</b>.</div>
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