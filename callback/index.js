const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express()

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// Runs before each requests
app.use((req, res, next) => {
  console.log("\nIncoming");
  next()
})

app.use(routes);

app.use((req, res, next) => {
  console.log("--------------------------------------------------------------------------");
  next()
})

const server = app.listen(3000, err => {
  console.log(`Server listenig at ${server.address().address}:${server.address().port}`);
})
