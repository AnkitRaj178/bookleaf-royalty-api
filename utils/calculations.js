const authors = require("../data/authors");
const books = require("../data/books");
const sales = require("../data/sales");
const withdrawals = require("../data/withdrawals");

//Get all books by author 
function getBooksByAuthor(authorId) {
  return books.filter(book => book.author_id === authorId);
}

// Get all sales for a specific book

function getSalesByBook(bookId) {
  return sales.filter(sale => sale.book_id === bookId);
}

//Calculate total earnings for an author

function calculateTotalEarnings(authorId) {
  const authorBooks = getBooksByAuthor(authorId);
  let totalEarnings = 0;

  authorBooks.forEach(book => {
    const bookSales = getSalesByBook(book.id);
    const totalSold = bookSales.reduce(
      (sum, sale) => sum + sale.quantity,
      0
    );
    totalEarnings += totalSold * book.royalty_per_sale;
  });

  return totalEarnings;
}

//Calculate total withdrawals by an author
 
function calculateTotalWithdrawals(authorId) {
  return withdrawals
    .filter(w => w.author_id === authorId)
    .reduce((sum, w) => sum + w.amount, 0);
}

//Calculate current balance for every author

function calculateCurrentBalance(authorId) {
  return calculateTotalEarnings(authorId) - calculateTotalWithdrawals(authorId);
}

//Get detail of books data for an author with total solld and total royalty

function getAuthorBooksDetail(authorId) {
  const authorBooks = getBooksByAuthor(authorId);

  return authorBooks.map(book => {
    const bookSales = getSalesByBook(book.id);
    const totalSold = bookSales.reduce(
      (sum, sale) => sum + sale.quantity,
      0
    );

    return {
      id: book.id,
      title: book.title,
      royalty_per_sale: book.royalty_per_sale,
      total_sold: totalSold,
      total_royalty: totalSold * book.royalty_per_sale
    };
  });
}

 //Get all sales for an author sorted with latest sale
 
function getAuthorSales(authorId) {
  const authorBooks = getBooksByAuthor(authorId);
  const bookMap = {};

  authorBooks.forEach(book => {
    bookMap[book.id] = book;
  });

  return sales
    .filter(sale => bookMap[sale.book_id])
    .map(sale => ({
      book_title: bookMap[sale.book_id].title,
      quantity: sale.quantity,
      royalty_earned: sale.quantity * bookMap[sale.book_id].royalty_per_sale,
      sale_date: sale.sale_date
    }))
    .sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));
}

module.exports = { calculateTotalEarnings, calculateCurrentBalance, getAuthorBooksDetail, getAuthorSales };
