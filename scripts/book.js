var Book = function(args) {
  this.cover = args.cover;
  this.title = args.title;
  this.author = args.author;
  this.numberOfPages = parseInt(args.numberOfPages);
  this.publishDate = new Date(String(args.publishDate)).getUTCFullYear();
};