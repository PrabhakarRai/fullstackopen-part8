## Sample Queries
```
query getBookCount {
  bookCount
}

query getAuthorCount {
  authorCount
}

query getAllBooks {
  allBooks {
    id,
    title,
    author {
      id,
      name,
      born,
      bookCount
    },
    published,
    genres
  }
}

query getBooksByGenre {
  allBooks(genre: "refactoring") {
    id,
    title,
    author {
      id,
      name,
      born,
      bookCount
    },
    published,
    genres
  }
}

query getBooksByAuthor {
  allBooks(author: "Prabhakar Rai") {
    id,
    title,
    author {
      id,
      name,
      born,
      bookCount
    },
    published,
    genres
  }
}

query getBooksByAuthorWithGenre {
  allBooks(
    author: "Prabhakar Rai",
    genre: "health"
  ) {
    id,
    title,
    author {
      id,
      name,
      born,
      bookCount
    },
    published,
    genres
  }
}

query getAllAuthors {
  allAuthors {
    id,
    name,
    born,
    bookCount
  }
}

mutation addBook {
  addBook(
    title: "New Non Mealthy Lifestyle",
    published: 2019,
    author: "Bhide",
    genres: ["health", "yoga"]
  ) {
    title,
    author {
      name,
      born,
      bookCount
    }
    id,
    published,
    genres
  }
}

mutation editBornYearOfAuthor {
  editAuthor(
    name: "Sandi Metz"
    setBornTo: 1997
  ) {
    name,
    born,
    bookCount,
    id
  }
}
```