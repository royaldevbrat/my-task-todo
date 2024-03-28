const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require('mongoose');
const port = process.env.PORT || 3333;
const app = express();
const routes = require('./routes/taskRoute');

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on('open', () => console.log("DB Connection successful"));
mongoose.connection.on('error', err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/api', routes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log("Server listening on port: "+ port);
});

