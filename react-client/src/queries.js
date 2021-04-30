import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
query {
  allBooks {
    id,
    title,
    author,
    genres,
    published,
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
    published,
    author,
    genres,
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
      author,
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
    born
  }
}
`