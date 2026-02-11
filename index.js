const express = require('express');
const cors = require('cors');

// Import routes
const authorRoutes = require('./routes/authors');
const withdrawalRoutes = require('./routes/withdrawals');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//test route to check if API is running or not
app.get('/', (req, res) => {
  res.json({message:"BookLeaf Royalty API is running"});
});

//routes 
app.use('/authors',authorRoutes);
app.use('/withdrawals',withdrawalRoutes);

//server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
