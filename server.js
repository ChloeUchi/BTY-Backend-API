const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");

// Connect Database
connectDB();

const app = express();

// Security & Body Parser
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

app.use(errorHandler);

app.get("/", (req, res) => {
  res.redirect("/api-docs/");
});
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = app;
