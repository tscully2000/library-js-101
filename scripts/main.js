var Library = function(instanceKey) {
  this.bookShelf = new Array();
  this.keyInstance = instanceKey;
};

var Book = function(title, author, numberOfPages, publishDate) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.publishDate = new Date(publishDate);
};

Library.prototype.validateInput = function(input) {
  if (input && input !== '') {
    return true;
  } else {
    return false;
  };
};

Library.prototype.addBook = function(book) {
  if (this.validateInput(book)) {
    for (var i = 0; i < this.bookShelf.length; i++) {
      if (this.bookShelf[i].title.indexOf(book.title) > -1 || Array.isArray(book)) {
        return false;
      };
    };
    this.bookShelf.push(book);
    this.setObject(instanceKey);
    return true;
  };
  return false;
};

Library.prototype.addBooks = function(books) {
  if (this.validateInput(books)) {
    var bookCount = 0;
    for (var i = 0; i < books.length; i++) {
      if (this.addBook(books[i]) && Array.isArray(books)) {
        bookCount++;
      };
    };
    this.setObject(instanceKey);
    return bookCount;
  };
  return false;
};

Library.prototype.removeBookByTitle = function(title) {
  if (this.validateInput(title)) {
    for (var i = 0; i < this.bookShelf.length; i++) {
      if (this.bookShelf[i].title.toLowerCase() === title.toLowerCase().trim()) {
        this.bookShelf.splice([i], 1);
        return true;
      };
    };
    return false;
  };
  return false;
};

Library.prototype.removeBookByAuthor = function(authorName) {
  if (this.validateInput(authorName)) {
    for (var i = this.bookShelf.length - 1; i >= 0; i--) {
      if (this.bookShelf[i].author.toLowerCase() === authorName.toLowerCase().trim()) {
        this.bookShelf.splice([i], 1);
        var result = true;
      } else {
        result = false;
      };
    };
    return result;
  };
  return false;
};

Library.prototype.getBookByTitle = function(title) {
  if (this.validateInput(title)) {
    var titleMatch = [];
    for (var i = 0; i < this.bookShelf.length; i++) {
      if (this.bookShelf[i].title.toLowerCase().indexOf(title.toLowerCase().trim()) > -1) {
        titleMatch.push(this.bookShelf[i]);
      };
    };
    return titleMatch;
  };
  return false;
};

Library.prototype.getBooksByAuthor = function(authorName) {
  if (this.validateInput(authorName)) {
    var authorMatch = [];
    for (var i = 0; i < this.bookShelf.length; i++) {
      if (this.bookShelf[i].author.toLowerCase().indexOf(authorName.toLowerCase().trim()) > -1) {
        authorMatch.push(this.bookShelf[i]);
      };
    };
    return authorMatch;
  };
  return false;
};

Library.prototype.getAuthors = function() {
  var currentBooks = [];
  for (var i = 0; i < this.bookShelf.length; i++ ) {
    currentBooks.push(this.bookShelf[i].author);
  };
  var distinctAuthors = currentBooks.filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });
  return distinctAuthors;
};

Library.prototype.getRandomBook = function() {
  if (this.bookShelf.length === 0) {
    return null;
  };
  return this.bookShelf[Math.floor(Math.random()*this.bookShelf.length)];
};

Library.prototype.getRandomAuthorName = function() {
  if (this.bookShelf.length === 0) {
    return null;
  };
  return this.getRandomBook().author;
};

Library.prototype.setObject = function(instanceKey) {
  localStorage.setItem(instanceKey, JSON.stringify(this.bookShelf));
  return true;
};

Library.prototype.getObject = function(instanceKey) {
  // var myShelf = [];
  // for (var i = 0; i < this.bookShelf.length; i++) {
  //   myShelf.push(new Book(JSON.parse(localStorage.getItem(instanceKey))));
  // };
  // return myShelf;
  return JSON.parse(localStorage.getItem(this.keyInstance));
};

document.addEventListener('DOMContentLoaded', function(instanceKey) {
  window.gLibrary = new Library('myLibrary');
  // gLibrary.addBook(book1);
  // gLibrary.addBook(book2);
  // gLibrary.addBook(book3);
  if (localStorage.length > 0) {
    gLibrary.bookShelf = gLibrary.getObject(instanceKey);
  };
});

var book1 = new Book ('Eye of the World', 'Robert Jordan', 685, 'January 15, 1990');
var book2 = new Book('The Great Hunt', 'Robert Jordan', 600, 'November 15, 1990');
var book3 = new Book('The Phantom Tollbooth', 'Norton Juster', 255, 'February 8, 1961');
var bookArr = [book1, book2, book3];