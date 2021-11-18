//Install express server
const express = require("express");
const path = require("path");
const app = express();
//Header secure
const helmet = require('helmet');
const csp = require('content-security-policy');
const cspPolicy = {
  'default-src': csp.SRC_ANY,
  'style-src': [
      csp.SRC_SELF,
      csp.SRC_USAFE_INLINE,
      'https://fonts.googleapis.com/',
      'https://use.typekit.net',
      'https://fonts.googleapis.com',
      'https://boxicons.com/',
      'https://undraw.co/illustrations',
      'https://static.ads-twitter.com',
      'self'


  ],
  'script-src': [
      csp.SRC_SELF,
      csp.SRC_USAFE_INLINE,
      csp.SRC_UNSAFE_EVAL,
      'https://fonts.googleapis.com/',
      'http://apis.google.com/',
      'http://connect.facebook.net/',
      '*.facebook.com',
      'self'
  ],
  'connect-src': csp.SRC_ANY,
  'child-src': [
      csp.SRC_SELF,
      'https://apis.google.com',
      'https://facebook.com',
      'https://www.googleapis.com/',
      'https://accounts.google.com/'
  ],
  'img-src': [
      csp.SRC_ANY,
      csp.SRC_DATA,
      'data:"',
      'https://s3.amazonaws.com',
      'https://twitter.com',
      'https://pbs.twimg.com',
      'https://boxicons.com/',
      'https://undraw.co/illustrations'

  ]
};
const globalCSP = csp.getCSP(cspPolicy);
app.use(globalCSP);
app.use(helmet.hsts());
app.use(helmet.referrerPolicy());
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