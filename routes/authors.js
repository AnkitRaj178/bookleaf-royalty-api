const express = require("express");
const router = express.Router();

const {
  getAllAuthors,
  getAuthorById,
  getAuthorSales,
  getAuthorWithdrawals
} = require("../controllers/authorController");

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);
router.get("/:id/sales", getAuthorSales);
router.get("/:id/withdrawals", getAuthorWithdrawals);

module.exports = router;

