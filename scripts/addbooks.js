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
  $('#add-book-button').on('click', $.proxy(this._handleAddBooks, this));
};

AddBooks.prototype._handleAddBooks = function() {
  
  this.$container.modal('show');
};

$(function() {
  window.gAddBooks = new AddBooks($('#add-book'));
  window.gAddBooks.init();
});