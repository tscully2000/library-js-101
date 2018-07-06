var AllAuthors = function(container) {
  this.$container = container;
  Library.call(this);
};

AllAuthors.prototype = Object.create(Library.prototype);

AllAuthors.prototype.init = function() {
  this.getObject();
  this._bindEvents();
};

AllAuthors.prototype._bindEvents = function() {
  $('.all-authors-button').on('click', $.proxy(this._handleAllAuthors, this));
};

AllAuthors.prototype._handleAllAuthors = function() {
  var authors = this.getAuthors();
  if (authors.length) {
    this.$container.modal('show');
    this.$container.find('.modal-body').html(this._createAuthorList(authors));
  } else {
    alert('Nothing in library!');
  }
  return false;
};

AllAuthors.prototype._createAuthorList = function(authors) {
  var ul = document.createElement('ul');
  for (var i = 0; i < authors.lengh; i++) {
    var li = document.createElement('li');
    $(li).text(authors[i]);
    ul.append(li);
  }
  return ul;
}

$(function() {
  window.gAllAuthors = new AllAuthors('#show-all-authors');
  window.gAllAuthors.init();
});