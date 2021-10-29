//Install express server
const express = require('express');
const bodyParser = require('body-parser');
var forceSsl = require('force-ssl-heroku');
const csp = require('content-security-policy');
const sts = require('strict-transport-security');
const referrerPolicy = require('referrer-policy');
const permissionsPolicy = require('permissions-policy');
const helmet = require('helmet');

const app = express();

const cspPolicy = {
  'default-src': csp.SRC_ANY,
  'style-src': [
    csp.SRC_SELF,
    csp.SRC_USAFE_INLINE,
    'https://fonts.googleapis.com/',
    'https://use.typekit.net'
  ],
  'script-src': [
    csp.SRC_SELF,
    csp.SRC_USAFE_INLINE,
    csp.SRC_UNSAFE_EVAL,
    'https://fonts.googleapis.com/',
    'http://apis.google.com/',
    'http://connect.facebook.net/',
    '*.facebook.com'
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
    csp.SRC_DATA
  ]
};

const globalCSP = csp.getCSP(cspPolicy);

const globalSTS = sts.getSTS({ 'max-age': 31536000, 'includeSubDomains': true });

app.use(referrerPolicy({ policy: 'same-origin' }));
app.use(globalCSP);
app.use(globalSTS);
app.use(helmet.noSniff());
app.use(helmet.frameguard());
app.use(permissionsPolicy({
  features: {
    fullscreen: ['self']
  }
}));

app.use(express.static("./dist/artmais-frontend"));

app.use(bodyParser.json());

app.use(forceSsl);

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/artmais-frontend/" })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.filter = 404;
  next(err);
});

// HTTP listener
const PORT = process.env.PORT || 4200;
app.listen(PORT, function () {
  console.log('ArtMais running on port ' + PORT);
});

module.exports = app;