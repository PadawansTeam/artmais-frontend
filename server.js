//Install express server
const express = require("express");
const path = require("path");
const app = express();
//Serve only the static files form the dist directory
// Serve only the static files form the dist directory
app.use(express.static("./dist/artmais-frontend"));
app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/artmais-frontend/" })
);
// Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 4200;
app.listen(PORT, function () {});

//Header secure
const referrerPolicy = require('referrer-policy');
const helmet = require('helmet');
app.use(referrerPolicy({ policy: 'same-origin' }));
app.use(helmet.noSniff());

