var AllAuthors = function(container) {
  Library.call(this);
  this.$container = $('#show-all-authors');
};

AllAuthors.prototype = Object.create(Library.prototype);

AllAuthors.prototype.init = function() {
  this._bindEvents();
  return;
};

AllAuthors.prototype._bindEvents = function() {
  $('#show-all').find('#all-authors-button').on('click', $.proxy(this._handleAllAuthors, this));
  return;
};

AllAuthors.prototype._handleAllAuthors = function() {
  var authors = this.getAuthors();
  if (authors.length) {
    this.$container.modal('show');
    this.$container.find('.modal-body').html(this._createAuthorList(authors));
  } else {
    alert('Nothing in library!');
  };
  return false;
};

AllAuthors.prototype._createAuthorList = function(authors) {
  var ul = document.createElement('ul');
  for (var i = 0; i < authors.length; i++) {
    var li = document.createElement('li');
    $(li).text(authors[i]);
    ul.append(li);
  };
  return ul;
};

$(function() {
  window.gAllAuthors = new AllAuthors();
  window.gAllAuthors.init();
});