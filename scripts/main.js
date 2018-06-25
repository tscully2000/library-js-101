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
  // Purpose: Return a random book object from your books array.
  // Return: book object if you find a book, null if there are no books.
};

Library.prototype.getBookByTitle = function(title) {
  // Purpose: Return all books that completely or partially matches the string title passed into the function.
  // Return: array of book objects if you find books with matching titles, empty array if no books are found.
};

Library.prototype.getBooksByAuthor = function(authorName) {
  // Purpose: Finds all books where the author’s name partially or completely matches the authorName argument passed to the function.
  // Return: array of books if you find books with match authors, empty array if no books match.
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
});

var book1 = new Book('Eye of the World', 'Robert Jordan', 685, 'January 15, 1990');
var book2 = new Book('The Great Hunt', 'Robert Jordan', 600, 'November 15, 1990');
