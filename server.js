//Install express server
const express = require("express");
const path = require("path");

const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//       "default-src": [
//         "'self'",
//         "https://padawans-auth-poc.herokuapp.com/",
//         "https://padawans-poc-frontend.herokuapp.com/",
//         "https://fonts.googleapis.com/",
//         "https://fonts.gstatic.com",
//         "https://securepubads.g.doubleclick.net/",
//       ],
//       "img-src": [
//         "'self'",
//         "https://padawans-poc-frontend.herokuapp.com/",
//         "*.googleapis.com",
//         "data:",
//       ],
//       "script-src": [
//         "'self'",
//         "https://padawans-poc-frontend.herokuapp.com/",
//         "https://cdnjs.cloudflare.com",
//       ],
//       "style-src": [
//         "'unsafe-inline'",
//         "'self'",
//         "https://fonts.googleapis.com",
//         "https://cdnjs.cloudflare.com",
//       ],
//     },
//   })
// );

// Serve only the static files form the dist directory
// app.use(express.static(`${__dirname}/dist/artmais-frontend/src/`));

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(`${__dirname}/dist/artmais-frontend/src/index.html`));
// });
// Serve only the static files form the dist directory
app.use(express.static("./dist/artmais-frontend/src/"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/artmais-frontend/src/" })
);

// Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 4200;
app.listen(PORT, function () {});
