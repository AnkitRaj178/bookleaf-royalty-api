const authors = require("../data/authors");
const withdrawals = require("../data/withdrawals");

const {
  calculateTotalEarnings,
  calculateCurrentBalance,
  getAuthorBooksDetail,
  getAuthorSales
} = require("../utils/calculations");

// get all authors details
exports.getAllAuthors = (req, res) => {
  const result = authors.map(author => ({
    id: author.id,
    name: author.name,
    total_earnings: calculateTotalEarnings(author.id),
    current_balance: calculateCurrentBalance(author.id)
  }));

  res.json(result);
};

// get author details by author id
exports.getAuthorById = (req, res) => {
  const authorId = parseInt(req.params.id);
  const author = authors.find(a => a.id === authorId);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const books = getAuthorBooksDetail(authorId);

  res.json({
    id: author.id,
    name: author.name,
    email: author.email,
    total_books: books.length,
    total_earnings: calculateTotalEarnings(authorId),
    current_balance: calculateCurrentBalance(authorId),
    books
  });
};

// get author sales details by author id
exports.getAuthorSales = (req, res) => {
  const authorId = parseInt(req.params.id);
  const author = authors.find(a => a.id === authorId);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const sales = getAuthorSales(authorId);
  res.json(sales);
};

// get author withdrawal details by author id
exports.getAuthorWithdrawals = (req, res) => {
  const authorId = parseInt(req.params.id);
  const author = authors.find(a => a.id === authorId);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const authorWithdrawals = withdrawals
    .filter(w => w.author_id === authorId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  res.json(authorWithdrawals);
};
