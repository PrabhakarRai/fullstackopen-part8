import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
query {
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
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    id,
    name,
    born,
    bookCount,
  }
}
`

export const FIND_BOOKS_BY_AUTHOR = gql`
query findBooksbyAuthor($nameToSearch: String!) {
  allBooks(author: $nameToSearch) {
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
`

export const FIND_BOOKS_BY_GENRE = gql`
query findBooksbyGenre($genreToSearch: String!) {
  allBooks(genre: $genreToSearch) {
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
`

export const WHO_IS_ME = gql`
query whoIsMe {
  me {
    username,
    favoriteGenre,
    id
  }
}
`

export const ADD_BOOK = gql`
mutation addBook(
    $title: String!,
    $published: Int!,
    $author: String!,
    $genres: [String!]!
  ) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres,
    ) {
      title,
      published,
      author {
        name,
        born,
        bookCount
      },
      id,
      genres,
    }
}
`

export const SET_BORN_YEAR = gql`
mutation setBornYear(
  $name: String!,
  $born: Int!
) {
  editAuthor(name: $name, setBornTo: $born) {
    name,
    id,
    born,
    bookCount,
  }
}
`

export const LOGIN_USER = gql`
mutation login(
  $username: String!,
  $password: String!
) {
  login(
    username: $username,
    password: $password,
  ) {
    value
  }
}
`