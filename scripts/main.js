var Library = function() {
  this.libraryURL = 'http://localhost:3002/library/';
};

Library.prototype._handleEventTrigger = function(sEvent, oData) {
  var oData = oData || {},
      event = new CustomEvent(sEvent, oData);
  document.dispatchEvent(event);
};

Library.prototype._handlePagination = function(currentPage, lastId, upDown) {
  var pages = $.ajax({
    url: this.libraryURL + 'page/' + currentPage + '/' + lastId + '/' + upDown,
    dataType: 'json',
    method: 'GET',
    success: data => {
      window.bookShelf = window.bookify(data);
      this._handleEventTrigger('objUpdate');
    }
  });
  return pages;
};

Library.prototype._handleGetBook = function() {
  var httpGet = $.ajax({
    url: this.libraryURL,
    dataType: 'json',
    method: 'GET',
    success: data => {
      window.bookShelf = window.bookify(data);
      this._handleEventTrigger('objUpdate');
    }
  });
  return httpGet;
};

Library.prototype._handleGetRandom = function() {
  var randomBookId = this.getRandomBook()._id,
      randomBook = $.ajax({
    url: this.libraryURL + randomBookId,
    dataType: 'json',
    method: 'GET',
    success: data => {
      return data;
    }
  });
  return randomBook;
};

Library.prototype._handleSearch = function(search) {
  var searchTable = $.ajax({
    url: this.libraryURL + 'search/' + search,
    dataType: 'json',
    method: 'GET',
    success: data => {
      window.bookShelf = window.bookify(data);
      this._handleEventTrigger('objUpdate');
    }
  });
  return searchTable;
};

Library.prototype._handleDeleteBook = function(id) {
  $.ajax({
    url: this.libraryURL + id,
    dataType: 'json',
    method: 'DELETE',
    success: data => {
      this._handleEventTrigger('objUpdate');
    }
  });
};

Library.prototype._handlePutBook = function(id, edit) {
  $.ajax({
    url: this.libraryURL + id,
    dataType: 'text',
    method: 'PUT',
    data: edit,
    success: data => {
      this._handleGetBook();
      this._handleEventTrigger('objUpdate');
    }
  });
};

Library.prototype.checkForDup = function(book) {
  for (var i = 0; i < window.bookShelf.length; i++) {
    if (window.bookShelf[i].title.indexOf(book.title) > -1) {
      return false;
    };
  };
  return true;
};

Library.prototype.addBooks = function(arrBooks) {
  var httpPost = $.ajax({
    url: this.libraryURL,
    dataType: 'json',
    method: 'POST',
    data: { books: arrBooks },
    success: data => {
      if (data.insertedCount) {
        window.bookShelf = window.bookShelf.concat(window.bookify(data));
        this._handleGetBook();
        this._handleEventTrigger('objUpdate');
      }
      return data.insertedCount;
    }
  });
  return httpPost;
};

Library.prototype.removeBookById = function(id) {
  var wasRemoved = false; 
  if (id) {
    for (var i = 0; i < window.bookShelf.length; i++) {
      if (window.bookShelf[i]._id === id) {
        window.bookShelf.splice(i, 1);
        this._handleDeleteBook(id);
        wasRemoved = true;
      };
    };
    return wasRemoved;
  };
  return wasRemoved;
};

Library.prototype.editBookById = function(id) {
  for (var i = 0; i < window.bookShelf.length; i++) {
    if (window.bookShelf[i]._id === id) {
      return window.bookShelf[i];
    };
  };
};

Library.prototype.removeBookByAuthor = function(authorName) {
  var wasRemoved = false;
  if (authorName) {
    for (var i = window.bookShelf.length - 1; i >= 0; i--) {
      if (window.bookShelf[i].author.toLowerCase() === authorName.toLowerCase().trim()) {
        this._handleDeleteBook(window.bookShelf[i]._id);
        window.bookShelf.splice(i, 1);
        this._handleEventTrigger('objUpdate');
        wasRemoved = true;
      };
    };
    return wasRemoved;
  };
  return wasRemoved;
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

// var book1 = new Book (cover, 'Eye of the World', 'Robert Jordan', 685, 'January 15, 1990');
// var book2 = new Book(cover, 'The Great Hunt', 'Robert Jordan', 600, 'November 15, 1990');
// var book3 = new Book(cover, 'The Phantom Tollbooth', 'Norton Juster', 255, 'February 8, 1961');
// var book4 = new Book(cover, 'The Lion, the Witch, and the Wardrobe', 'C.S. Lewis', 208, 'October 16, 1950');