var RecAuthor = function() {
  Library.call(this);
  this.$container = $('#recommend-author');
};

RecAuthor.prototype = Object.create(Library.prototype);

RecAuthor.prototype.init = function() {
  this._bindEvents();
  return;
};

RecAuthor.prototype._bindEvents = function() {
  $('#recommend-wrap').find('#recommend-author-button').on('click', $.proxy(this._handleRecAuthor, this));
  return;
};

RecAuthor.prototype._handleRecAuthor = function() {
  var recAuthor = this.getRandomAuthorName();
  if (recAuthor.length) {
    this.$container.modal('show');
    this.$container.find('.modal-body').html(this._createRecAuthorList(recAuthor));
  } else {
    alert('Nothing in library!');
  };
  return false;
};

RecAuthor.prototype._createRecAuthorList = function(recAuthor) {
  var ul = document.createElement('ul'),
      li = document.createElement('li');
  $(li).text(recAuthor);
  ul.append(li);
  return ul;
};

$(function() {
  window.gRecAuthor = new RecAuthor();
  window.gRecAuthor.init();
});