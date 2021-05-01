## Deployed at
[Heroku](https://gql-prrai.herokuapp.com/)

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
  allBooks(author: "Bhide") {
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
    title: "New Non Mealthy Lifestyle Awesome",
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

query whoIsMe {
  me {
    username,
    favoriteGenre,
    id
  }
}

mutation createUser {
  createUser(
    username: "root",
    favoriteGenre: "hacking",
  ) {
    username,
    favoriteGenre,
    id
  }
}

mutation login {
  login(
    username: "root",
    password: "topsecret",
  ) {
    value
  }
}
```

## Authorization Header Required for Mutations
```
{
  "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJmYXZvcml0ZUdlbnJlIjoiaGFja2luZyIsImlkIjoiNjA4ZDdjZTMwNWY0ZjQwNDE0MWNmMzIzIiwiaWF0IjoxNjE5ODg2MjI3fQ.BGkZCegAJ6EML5no7KQhyA2ixrrRqx7LWwjOJkdkbZM"
}
```