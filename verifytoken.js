const jwt = require("jsonwebtoken");
require('dotenv').config(); 

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFyZHJhIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzYyNTAxNjIyLCJleHAiOjE3NjI1MDE2ODJ9.cqwRF0sMzJ8mmEoMkUYQPOPfkE959f8NmsJqdSOKvoQ"; // your token

try {
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log("✅ Valid token:", decoded);
} catch (err) {
  console.log("❌ Invalid or expired token:", err.message);
}
