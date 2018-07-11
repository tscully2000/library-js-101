var Book = function(args) {
  this.cover = 'Im a cover!';
  this.title = args.title;
  this.author = args.author;
  this.numberOfPages = parseInt(args.numberOfPages);
  this.publishDate = new Date(args.publishDate).getUTCFullYear();
};