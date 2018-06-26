var Library = function() {
  this.bookShelf = new Array();
};

var Book = function(title, author, numberOfPages, publishDate) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.publishDate = new Date(publishDate);
};

Library.prototype.addBook = function(book) {
  for (var i = 0; i < this.bookShelf.length; i++) {
    if (this.bookShelf[i].title.indexOf(book.title) > -1) {
      return false;
    };
  };
  this.bookShelf.push(book);
  return true;
};

Library.prototype.removeBookByTitle = function(title) {
  for (var i = 0; i < this.bookShelf.length; i++) {
    if (this.bookShelf[i].title === title) {
      this.bookShelf.splice([i], 1);
      return true;
    };
  };
  return false;
};

Library.prototype.removeBookByAuthor = function(authorName) {
  for (var i = 0; i < this.bookShelf.length; i++) {
    if (this.bookShelf[i].author === authorName) {
      this.bookShelf.splice([i], 1);
      return true;
    };
  };
  return false;
};

Library.prototype.getRandomBook = function() {
  if (this.bookShelf.length === 0) {
    return null;
  };
  return this.bookShelf[Math.floor(Math.random()*this.bookShelf.length)];
};

Library.prototype.getBookByTitle = function(title) {
  var titleMatch = [];
  for (var i = 0; i < this.bookShelf.length; i++) {
    if (this.bookShelf[i].title.toLowerCase().match(title.toLowerCase()) !== null) {
      titleMatch.push(this.bookShelf[i]);
    };
  };
  return titleMatch;
};

Library.prototype.getBooksByAuthor = function(authorName) {
  var authorMatch = [];
  for (var i = 0; i < this.bookShelf.length; i++) {
    if (this.bookShelf[i].author.toLowerCase().match(authorName.toLowerCase()) !== null) {
      authorMatch.push(this.bookShelf[i]);
    };
  };
  return authorMatch;
};

Library.prototype.addBooks = function(books) {
  // Purpose: Takes multiple books, in the form of an array of book objects, and adds the objects to your books array.
  // Return: number of books successfully added, 0 if no books were added.
};

Library.prototype.getAuthors = function() {
  // Purpose: Find the distinct authors’ names from all books in your library.
  // Return: array of strings the names of all distinct authors, empty array if no books exist or if no authors exist.
};

Library.prototype.getRandomAuthorName = function() {
  // Purpose: Retrieves a random author name from your books collection.
  // Return: string author name, null if no books exist.
};

document.addEventListener('DOMContentLoaded', function() {
  window.gLibrary = new Library();
  gLibrary.addBook(book1);
  gLibrary.addBook(book2);
  gLibrary.addBook(book3);
});

var book1 = new Book('Eye of the World', 'Robert Jordan', 685, 'January 15, 1990');
var book2 = new Book('The Great Hunt', 'Robert Jordan', 600, 'November 15, 1990');
var book3 = new Book('The Phantom Tollbooth', 'Norton Juster', 255, 'February 8, 1961');
