const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3600;

app.use(express.json());
app.use(cors());

/* api */

app.use("/api", require("./Api Routes/PostUserRouter"));
app.use("/api", require("./Api Routes/GetUsers"));
app.use("/api", require("./Api Routes/DeleteUser"));
app.use("/api", require("./Api Routes/UpdateUser"));

/*  */

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
