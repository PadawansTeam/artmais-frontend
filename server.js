//Install express server
const express = require("express");
const path = require("path");
const app = express();
//Header secure
const helmet = require('helmet');
app.use(helmet.hsts());
app.use(helmet.referrerPolicy());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'","https:","data:","artmais-frontend.herokuapp.com","https://artmais-frontend.herokuapp.com/"],
      scriptSrc: ["https://static.ads-twitter.com","https://www.google-analytics.com","'sha256-q2sY7jlDS4SrxBg6oq/NBYk9XVSwDsterXWpH99SAn0='"],
      imgSrc: ["'self'","https://s3.amazonaws.com","https://twitter.com https://pbs.twimg.com"],
      fontSrc: ["'self","https://fonts.gstatic.com"],
      styleSrc: ["'self'","https://fonts.googleapis.com"],
      frameAncestors: ["'none'"],
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
app.listen(PORT, function () {});