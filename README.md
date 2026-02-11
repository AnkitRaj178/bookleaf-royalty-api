# BookLeaf Royalty API

# Tech Used
I used Node.js with Express to build a simple and clean REST API because it is easy to structure and suitable for implementing backend business logic. I also used the CORS package to allow requests for external testing as required. It is also best for external testing and ensure smooth communication between the frontend and backend.

# Assumptions
- Data is stored in-memory.
- I hardcode the seed data.
- Royalty earning is calculated from book sales.
- Each sale contains quantity and price and total earnings are calculated from these values.
- Minimum withdrawal amount is ₹500.
- I tested the withdrawals POST routes on postman.
- A withdrawal amount cannot exceed the author's current balance.
- No authentication was implemented since it was not mentioned in the requirements.
- Data resets when the server restarts.

# Time Spent
I spent around 7 hours working on this assessment which included designing the folder structure, implementing the API, adding validations, testing all cases and deploying the application on render.
