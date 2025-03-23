function createLibraryManager() {
  const books = new Map();
  return {
    addBook(bookId, title, author, category, copiesAvaible, totalCopies) {
      if (books.has(bookId)) {
        console.log("book id already exists");
        return;
      }
      books.set(bookId, {
        title,
        author,
        category,
        copiesAvaible,
        totalCopies,
        rating: [],
      });
    },
    updateCopies(bookId, newCopiesAvaible) {
      if (!books.has(bookId)) {
        console.log("book not found");
        return;
      }
      let book = books.get(bookId);
      book.copiesAvaible = newCopiesAvaible;
      books.set(bookId, book);
    },
    addRating(bookId, rating) {
      if (!books.has(bookId)) {
        console.log("book not found");
        return;
      }

      if (rating < 1 || rating > 5) {
        console.log("rating betwee 1 and 5");
        return;
      }
      let book = books.get(bookId);
      book.ratings.push(rating);
      books.set(bookId, book);
    },
    getBookDetails(bookId) {
      return books.get(bookId) || "book not found";
    },
    getOutOfStockBooks() {
      return Array.from(books.values()).filter(
        (book) => book.copiesAvaible === 0
      );
    },
    getCategoryBreakdown() {
      return Array.from(books.values())
        .filter((book) => book.copiesAvaible === 0)
        .map((book) => book.category);
    },
  };
}
module.exports = createLibraryManager;
