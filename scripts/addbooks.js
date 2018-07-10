var AddBooks = function(container) {
  Library.call(this);
  this._tempBookShelf = [];
  this.$container = container;
};

AddBooks.prototype = Object.create(Library.prototype);

AddBooks.prototype.init = function() {
  this._bindEvents();
};

AddBooks.prototype._bindEvents = function() {
  $('#add-book-button').on('click', $.proxy(this._handleModalOpen, this));
  $('#queue-button').on('click', $.proxy(this._queueBooks, this));
  $('#add-books-button').on('click', $.proxy(this._addToTable, this));
};

AddBooks.prototype._handleModalOpen = function() {
  this.$container.modal('show');
};

AddBooks.prototype._queueBooks = function() {
  var qBooks = $('#add-book-form').serializeArray(),
      qBooksToAdd = {},
      hasVal = true;
  $.each(qBooks, function(i, book) {
    book.value ? qBooksToAdd[book.name] = book.value : hasVal = false;
  });
  hasVal ? this._tempBookShelf.push(qBooksToAdd) : alert('Error: Please fill out all form fields!');
  $('.book-count').text(this._tempBookShelf.length);
  $('#add-book-form')[0].reset();
  return qBooksToAdd;
};

AddBooks.prototype._createTableElements = function() {
  var booksToAdd = gAddBooks.addBooks(this._queueBooks),
      tr = document.createElement('tr');
  $.each(booksToAdd, function(i, book) {
    var td = document.createElement('td');
    $(td).text(book[i]);
    tr.append(td);
  });
  return tr;
};

AddBooks.prototype._addToTable = function() {
  $('#book-table').find('tbody').html(this._createTableElements);
  this._tempBookShelf = [];
};

$(function() {
  window.gAddBooks = new AddBooks($('#add-book'));
  window.gAddBooks.init();
});