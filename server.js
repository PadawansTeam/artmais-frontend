//Install express server
const express = require("express");
const path = require("path");

const app = express();

//Serve only the static files form the dist directory
app.use(express.static(`${__dirname}/dist/artmais-frontend/src/`));

app.get("/*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/artmais-frontend/src/index.html`));
});

// Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 4200;
app.listen(PORT, function () {});
