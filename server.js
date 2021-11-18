//Install express server
const express = require("express");
const path = require("path");
const app = express();
//Header secure
const helmet = require('helmet');
app.use(helmet.hsts());
app.use(helmet.referrerPolicy());
app.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString("hex");
  next();
});
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'", "*", "https:", "data:", "artmais-frontend.herokuapp.com", "https://artmais-frontend.herokuapp.com/", "artmais-backend.herokuapp.com", "https://artmais-backend.herokuapp.com", "https://boxicons.com/", "https://undraw.co/illustrations"],
      scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`, "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "*", "'unsafe-eval'", "https://fonts.googleapis.com", "https://boxicons.com/", "https://undraw.co/illustrations"],
      imgSrc: ["'self'", "*", "data:", "https://s3.amazonaws.com", "https://twitter.com", "https://pbs.twimg.com", "https://boxicons.com/", "https://undraw.co/illustrations"],
      fontSrc: ["'self'", "*", "https://fonts.gstatic.com", "https://boxicons.com/", "https://undraw.co/illustrations"],   
    },
  })
);
app.use(helmet.noSniff());
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(
  helmet.referrerPolicy({
    policy: ["no-referrer", "strict-origin-when-cross-origin"],
  })
);
app.use(
  helmet.expectCt({
    maxAge: 86400,
  })
);
helmet.dnsPrefetchControl();
helmet.permittedCrossDomainPolicies();
//Serve only the static files form the dist directory
// Serve only the static files form the dist directory
app.use(express.static("./dist/artmais-frontend"));
app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/artmais-frontend/" })
);
// Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 4200;
app.listen(PORT, function () { });