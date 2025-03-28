require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/home-routes");
const imageRoutes = require("./routes/images-routes");
const connectToDB = require("./database/db");

app = express();
PORT = process.env.PORT;
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/images", imageRoutes);

(async function () {
  try {
    await connectToDB(); // Wait for the database connection to complete
    app.listen(PORT, () => {
      console.log(`Node server started at port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Error connecting to the database:",
      error.stack || error.message
    );
  }
})();
