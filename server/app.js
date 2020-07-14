require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');

const userRouter = require('./routes/users.route');
const PORT = process.env.PORT || 3002;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: 'anhem1nha',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    },
  })
);
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use(morgan('dev'));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});