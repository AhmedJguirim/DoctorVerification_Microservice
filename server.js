const express = require("express");
const bodyParser = require("body-parser");
const submissionRouter = require("./routes/submissions.routes");
const verificationsRouter = require("./routes/Verifications.routes");
const swaggerSpec = require("./config/swaggerSpecs");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = process.env.PORT || 3001;

require("dotenv").config();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/submissions", submissionRouter);
app.use("/api/verifications", verificationsRouter);

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
  console.log("Swagger docs available on http://localhost:3600/api-docs");
});
