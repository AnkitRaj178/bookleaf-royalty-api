const authors = require("../data/authors");
const withdrawals = require("../data/withdrawals");

const { calculateCurrentBalance } = require("../utils/calculations");

exports.createWithdrawal = (req, res) => {
  const { author_id, amount } = req.body;

  const author = authors.find(a => a.id === author_id);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  if (amount < 500) {
    return res
      .status(400)
      .json({ error: "Minimum withdrawal amount is ₹500" });
  }

  const currentBalance = calculateCurrentBalance(author_id);
  if (amount > currentBalance) {
    return res
      .status(400)
      .json({ error: "Withdrawal amount exceeds current balance" });
  }

  const withdrawal = {
    id: withdrawals.length + 1,
    author_id,
    amount,
    status: "pending",
    created_at: new Date().toISOString()
  };

  withdrawals.push(withdrawal);

  res.status(201).json({
    id: withdrawal.id,
    author_id,
    amount,
    status: withdrawal.status,
    new_balance: calculateCurrentBalance(author_id)
  });
};
