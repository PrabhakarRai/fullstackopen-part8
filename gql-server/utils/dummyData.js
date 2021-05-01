const mongoose = require('mongoose');
const Book = require('../models/book');
const Author = require('../models/author');

let authors = [
  {
    name: 'Robert Martin',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    born: 1821,
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
  },
  { 
    name: 'Sandi Metz', // birthyear not known
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: mongoose.Types.ObjectId('608d1def7a8cd6040a579706'),
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: mongoose.Types.ObjectId('608d1def7a8cd6040a579706'),
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: mongoose.Types.ObjectId('608d1def7a8cd6040a579707'),
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: mongoose.Types.ObjectId('608d1def7a8cd6040a579709'),
    genres: ['refactoring', 'patterns'],
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: mongoose.Types.ObjectId('608d1def7a8cd6040a57970a'),
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: mongoose.Types.ObjectId('608d1def7a8cd6040a579708'),
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: mongoose.Types.ObjectId('608d1def7a8cd6040a579708'),
    genres: ['classic', 'revolution'],
  },
];

const saveBooks = async () => {
  const bookObjects = books.map((b) => new Book(b));
  await Book.insertMany(bookObjects);
};

const saveAuthors = async () => {
  const authorObjects = authors.map((a) => new Author(a));
  await Author.insertMany(authorObjects);
};

module.exports = { authors, saveAuthors, books, saveBooks };
