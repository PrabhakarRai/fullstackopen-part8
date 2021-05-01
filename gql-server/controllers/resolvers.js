const jwt = require('jsonwebtoken');
const { UserInputError, AuthenticationError } = require('apollo-server');
const Author = require('../models/author');
const Book = require('../models/book');
const User = require('../models/user');
const { SECRET } = require('../utils/config');

const resolvers = {
  Query: {
    bookCount: () => Book.estimatedDocumentCount(),
    allBooks: async (root, args) => {
      if (args.author !== undefined && args.genre !== undefined) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          return Book.find({ genres:
            { $elemMatch : {
              $eq : args.genre,
            } }, author: author._id,
          }).populate('author', { name: 1, born: 1, bookCount: 1 });
        }
        return [];
      }
      if (args.author !== undefined) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          return Book.find({ author: author._id })
          .populate('author', { name: 1, born: 1, bookCount: 1 });
        }
        return [];
      }
      if (args.genre !== undefined) {
        return Book.find({ genres:
          { $elemMatch : {
            $eq : args.genre,
          } }
        }).populate('author', { name: 1, born: 1, bookCount: 1 });
      }
      return Book.find({}).populate('author', { name: 1, born: 1, bookCount: 1 });
    },
    authorCount: () => Author.estimatedDocumentCount(),
    allAuthors: () => Author.find({}),
    me: (root, args, { currentUser }) => {
      return currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author, bookCount: 1 });
      } else {
        author.bookCount += 1;
      }
      try {
        author = await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      let book = new Book({ ...args, author: author._id });
      try {
        book = await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return book
        .populate('author', { name: 1, born: 1, bookCount: 1 })
        .execPopulate();
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      let author = await Author.findOne({ name: args.name });
      if (author) {
        author.born = args.setBornTo;
        author = await author.save();
        return author;
      }
      return null;
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      });
      return user.save()
        .catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'topsecret' ) {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        username: user.username,
        favoriteGenre: user.favoriteGenre,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, SECRET) }
    }
  }
}

module.exports = resolvers;