var AllBooks = function() {
  Library.call(this);
  this.$container = $('#show-all-books');
};

AllBooks.prototype = Object.create(Library.prototype);

AllBooks.prototype.init = function() {
  this._bindEvents();
  return;
};

AllBooks.prototype._bindEvents = function() {
  $('#show-all').find('#all-books-button').on('click', $.proxy(this._handleAllBooks, this));
  return;
};

AllBooks.prototype._handleAllBooks = function() {
  var books = [];
  for (var i = 0; i < window.bookShelf.length; i++) {
    books.push(window.bookShelf[i].title)
  };
  if (books.length) {
    this.$container.modal('show');
    this.$container.find('.modal-body').html(this._createBookList(books));
  } else {
    alert('Nothing in library!');
  };
  return false;
};

AllBooks.prototype._createBookList = function(books) {
  var ul = document.createElement('ul');
  for (var i = 0; i < books.length; i++) {
    var li = document.createElement('li');
    $(li).text([i]);
    ul.append(li);
  };
  return ul;
};

$(function() {
  window.gAllBooks = new AllBooks();
  window.gAllBooks.init();
});