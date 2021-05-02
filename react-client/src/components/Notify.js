import React from 'react';

const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null;
  }
  return (
    <div style={{
        color: 'white',
        fontSize: '20px',
        padding: '10px',
        margin: '5px',
        width: '100%',
        backgroundColor: 'gray',
      }}>
      {errorMessage}
    </div>
  );
};

export default Notify;
