require("dotenv").config();
const express = require("express");
const app = express();
const ticket_routes = require("./routes/ticket.routes");

app.use(express.json());
app.use("/api/tickets", ticket_routes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = app;
