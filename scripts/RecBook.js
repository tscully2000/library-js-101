var RecBook = function() {
  Library.call(this);
  this.$container = $('#recommend-book');
};

RecBook.prototype = Object.create(Library.prototype);

RecBook.prototype.init = function() {
  this._bindEvents();
  return;
};

RecBook.prototype._bindEvents = function() {
  $('#recommend-wrap').find('#recommend-book-button').on('click', $.proxy(this._handleRecBook, this));
  return;
};

RecBook.prototype._handleRecBook = function() {
  var RecBook = this.getRandomBook();
  if (RecBook) {
    this.$container.modal('show');
    this.$container.find('.modal-body').html(this._createRecBookList(RecBook));
  } else {
    alert('Nothing in library!');
  };
  return false;
};

RecBook.prototype._createRecBookList = function(RecBook) {
  var ul = document.createElement('ul'),
      li = document.createElement('li');
  $(li).text(RecBook);
  ul.append(li);
  return ul;
};

$(function() {
  window.gRecBook = new RecBook();
  window.gRecBook.init();
});