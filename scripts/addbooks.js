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
};

AddBooks.prototype._handleModalOpen = function() {
  this.$container.modal('show');
};

AddBooks.prototype._createTable = function(books) {
  this.$container.find('.add-book-form')
};

AddBooks.prototype._queueBooks = function() {
  var qBooks = $('#add-book-form').serializeArray();
  var qBooksToAdd = {};
  var hasVal = true;
  $.each(qBooks, function(i, book) {
    if (book.value) {
      qBooksToAdd[book.name] = book.value;
    };
    hasVal = false;
  });
  if (hasVal) { 
    this._tempBookShelf.push(qBooksToAdd); 
  };
  console.log("Error please fill out all inputs")
  return hasVal;
};

$(function() {
  window.gAddBooks = new AddBooks($('#add-book'));
  window.gAddBooks.init();
});