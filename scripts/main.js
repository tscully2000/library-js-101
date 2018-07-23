var Library = function() {
  this.key = 'myLibrary';
  this.libraryURL = 'http://localhost:3002/library';
};

Library.prototype._handleEventTrigger = function(sEvent, oData) {
  var oData = oData || {},
      event = new CustomEvent(sEvent, oData);
  document.dispatchEvent(event);
};

Library.prototype._handleGetBook = function() {
  $.ajax({
    url: this.libraryURL,
    dataType: 'json',
    method: 'GET',
    success: data => {
      window.bookShelf = data;
      this._handleEventTrigger('objUpdate');
    }
  });
  return window.bookShelf;
};

Library.prototype.checkForDup = function(book) {
  for (var i = 0; i < window.bookShelf.length; i++) {
    if (window.bookShelf[i].title.indexOf(book.title) > -1) {
      return false;
    };
  };
  return true;
};

Library.prototype.addBook = function(book) {
  if (this.checkForDup(book)) {
    window.bookShelf.push(book);
    // this.setObject();
    return true;
  };
  return false;
};

Library.prototype.addBooks = function(books) {
  var bookCount = 0;
  for (var i = 0; i < books.length; i++) {
    if (this.addBook(books[i])) {
      bookCount++;
    };
  };
  this._handleEventTrigger('objUpdate');
  return bookCount;
};

Library.prototype.removeBookByTitle = function(title) {
  var wasRemoved = false; 
  if (title) {
    for (var i = 0; i < window.bookShelf.length; i++) {
      if (window.bookShelf[i].title.toLowerCase() === title.toLowerCase().trim()) {
        window.bookShelf.splice(i, 1);
        wasRemoved = true;
      };
    };
    // this.setObject();
    this._handleEventTrigger('objUpdate');
    return wasRemoved;
  };
  return wasRemoved;
};

Library.prototype.removeBookByAuthor = function(authorName) {
  var result = false;
  if (authorName) {
    for (var i = window.bookShelf.length - 1; i >= 0; i--) {
      if (window.bookShelf[i].author.toLowerCase() === authorName.toLowerCase().trim()) {
        window.bookShelf.splice(i, 1);
        result = true;
      };
    };
    // this.setObject();
    this._handleEventTrigger('objUpdate');
    return result;
  };
  return result;
};

Library.prototype.removeAllBooks = function() {
  window.bookShelf = [];
  localStorage.setItem(this.key, []);
  return true;
};

Library.prototype.getBookByTitle = function(title) {
  if (title) {
    var titleMatch = [];
    for (var i = 0; i < window.bookShelf.length; i++) {
      if (window.bookShelf[i].title.toLowerCase().indexOf(title.toLowerCase().trim()) > -1) {
        titleMatch.push(window.bookShelf[i]);
      };
    };
    return titleMatch;
  };
  return false;
};

Library.prototype.getBooksByAuthor = function(authorName) {
  if (authorName) {
    var authorMatch = [];
    for (var i = 0; i < window.bookShelf.length; i++) {
      if (window.bookShelf[i].author.toLowerCase().indexOf(authorName.toLowerCase().trim()) > -1) {
        authorMatch.push(window.bookShelf[i]);
      };
    };
    return authorMatch;
  };
  return false;
};

Library.prototype.getPubDate = function(pubDate) {
  if (pubDate) {
    var pubMatch = [];
    for (var i = 0; i < window.bookShelf.length; i++) {
      if (window.bookShelf[i].publishDate === parseInt(pubDate)) {
        pubMatch.push(window.bookShelf[i]);
      };
    };
    return pubMatch;
  };
  return false;
};

Library.prototype.getNumPage = function(numPage) {
  if (numPage) {
    var pageMatch = [];
    for (var i = 0; i < window.bookShelf.length; i++) {
      var totalPages = window.bookShelf[i].numberOfPages;
      if (totalPages >= parseInt(numPage) - 50 && totalPages <= parseInt(numPage) + 50) {
        pageMatch.push(window.bookShelf[i]);
      }; 
    };
    return pageMatch;
  };
  return false;
};

Library.prototype.searchShelf = function(args) {
  if (args) {
    var foundBooks = this.getBookByTitle(args).concat(this.getBooksByAuthor(args), this.getPubDate(args), this.getNumPage(args));
    if (foundBooks.length < 1) {
      alert('No books found.');
      return false;
    };
    var filteredBooks = foundBooks.filter(function(value, index, self) {
      return self.indexOf(value) === index;
    });
    window.bookShelf = filteredBooks;
    this._handleEventTrigger('objUpdate');
    return;
  };
  return false;
};

Library.prototype.getAuthors = function() {
  var currentBooks = [];
  for (var i = 0; i < window.bookShelf.length; i++ ) {
    currentBooks.push(window.bookShelf[i].author);
  };
  var distinctAuthors = currentBooks.filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });
  return distinctAuthors;
};

Library.prototype.getRandomBook = function() {
  if (window.bookShelf.length === 0) {
    return null;
  };
  return window.bookShelf[Math.floor(Math.random()*window.bookShelf.length)];
};

Library.prototype.getRandomAuthorName = function() {
  if (window.bookShelf.length === 0) {
    return null;
  };
  return this.getRandomBook().author;
};

// Library.prototype.setObject = function() {
//   localStorage.setItem(this.key, JSON.stringify(window.bookShelf));
//   return true;
// };

// Library.prototype.getObject = function() {
//   var myShelf = [];
//   if (localStorage.length > 0) {
//     var books = JSON.parse(localStorage.getItem(this.key));
//     for (var i = 0; i < books.length; i++) {
//       myShelf.push(new Book(books[i]));
//     };
//     return window.bookShelf = myShelf;
//   };
//   return myShelf;
// };

// var book1 = new Book (cover, 'Eye of the World', 'Robert Jordan', 685, 'January 15, 1990');
// var book2 = new Book(cover, 'The Great Hunt', 'Robert Jordan', 600, 'November 15, 1990');
// var book3 = new Book(cover, 'The Phantom Tollbooth', 'Norton Juster', 255, 'February 8, 1961');
// var book4 = new Book(cover, 'The Lion, the Witch, and the Wardrobe', 'C.S. Lewis', 208, 'October 16, 1950');
// var bookArr = [book1, book2, book3, book4];