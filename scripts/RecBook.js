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
  var recBook = this.getRandomBook();
  if (recBook) {
    this.$container.modal('show');
    this.$container.find('.modal-body').html(this._createRecBook(recBook));
  } else {
    alert('Nothing in library!');
  };
  return false;
};

RecBook.prototype._createRecBook = function(recBook) {
  var div = document.createElement('div');
  $(div).addClass('col-md-12');
  for (var key in recBook) {
    var p = document.createElement('p');
    $(p).text(recBook[key]);
    div.append(p);
  };
  return div;
};

$(function() {
  window.gRecBook = new RecBook();
  window.gRecBook.init();
});