const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000 || process.env.PORT;
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log("Server running on port ${PORT}"));
