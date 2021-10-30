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
const sts = require('strict-transport-security');
const referrerPolicy = require('referrer-policy');
const permissionsPolicy = require('permissions-policy');
const helmet = require('helmet');

const globalSTS = sts.getSTS({ 'max-age': 31536000, 'includeSubDomains': true });

app.use(referrerPolicy({ policy: 'same-origin' }));
app.use(globalSTS);
app.use(helmet.noSniff());
app.use(helmet.frameguard());
app.use(permissionsPolicy({
  features: {
      fullscreen: ['self']
  }
}));