const { v1: uuid } = require('uuid');
const { count } = require('../models/author');
const Author = require('../models/author');
const Book = require('../models/book');
const { authors, books } = require('../utils/dummyData')

const resolvers = {
  Query: {
    bookCount: () => Book.estimatedDocumentCount(),
    allBooks: (root, args) => {
      // if (args.author !== undefined && args.genre !== undefined) {
      //   const booksByAuthor = books.filter((b) => b.author === args.author)
      //   return booksByAuthor.filter((b) => {
      //     for (genre of b.genres) {
      //       if (genre === args.genre) {
      //         return true;
      //       }
      //     }
      //   })
      // }
      // if (args.author !== undefined) {
      //   return books.filter((b) => b.author === args.author)
      // }
      // if (args.genre !== undefined) {
      //   return books.filter((b) => {
      //     for (genre of b.genres) {
      //       if (genre === args.genre) {
      //         return true;
      //       }
      //     }
      //   })
      // }
      return Book.find({}).populate('author', { name: 1, born: 1 });
    },
    authorCount: () => Author.estimatedDocumentCount(),
    allAuthors: () => {
      return Author.find({});
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        author = await author.save();
      }
      const book = new Book({ ...args, author: author._id });
      return (await book.save()).populate('author', {name: 1, born: 1}).execPopulate();
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