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

RecBook.prototype._handleRecBook = async function() {
  var randomBook = await this._handleGetRandom(),
      recBook = new Book(randomBook);
  if (recBook) {
    this.$container.modal('show');
    this._createRecBook(recBook);
  } else {
    alert('Nothing in library!');
  };
  return false;
};

RecBook.prototype._createRecBook = function(recBook) {
  this.$container.find('.cover-img').attr('src', recBook.cover);
  this.$container.find('.rec-title').text('Title: ' + recBook.title);
  this.$container.find('.rec-author').text('Author: ' + recBook.author);
  this.$container.find('.rec-pages').text('Pages: ' + recBook.numberOfPages);
  this.$container.find('.rec-pub').text('Publish Date: ' + recBook.publishDate);
  return;
};

$(function() {
  window.gRecBook = new RecBook();
  window.gRecBook.init();
});