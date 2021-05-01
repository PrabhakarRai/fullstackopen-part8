const { v1: uuid } = require('uuid');
const { authors, books } = require('../utils/dummyData')

const resolvers = {
  Query: {
    bookCount: () => books.length,
    allBooks: (root, args) => {
      if (args.author !== undefined && args.genre !== undefined) {
        const booksByAuthor = books.filter((b) => b.author === args.author)
        return booksByAuthor.filter((b) => {
          for (genre of b.genres) {
            if (genre === args.genre) {
              return true;
            }
          }
        })
      }
      if (args.author !== undefined) {
        return books.filter((b) => b.author === args.author)
      }
      if (args.genre !== undefined) {
        return books.filter((b) => {
          for (genre of b.genres) {
            if (genre === args.genre) {
              return true;
            }
          }
        })
      }
      return books
    },
    authorCount: () => authors.length,
    allAuthors: () => {
      let authorsDetail = [];
      authors.forEach((a) => {
        let bookCount = books.reduce((ttlBooks, book) => {
          if(book.author === a.name) {
            return ttlBooks + 1;
          }
          return ttlBooks;
        }, 0);
        let authorDetail = { ...a, bookCount }
        authorsDetail.push(authorDetail);
      })
      return authorsDetail;
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      let authorInDb = false;
      for (a of authors) {
        if (a.name === book.author) {
          authorInDb = true;
          break;
        }
      }
      if (!authorInDb) {
        const newAuthor = { name: book.author, id: uuid() }
        authors = authors.concat(newAuthor);
      }
      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name);
      if (author) {
        author.born = args.setBornTo;
        authors = authors.map((a) => a.id === author.id ? author : a);
        return author;
      }
      return null;
    }
  }
}

module.exports = resolvers;