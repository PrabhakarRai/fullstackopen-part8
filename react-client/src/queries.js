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
