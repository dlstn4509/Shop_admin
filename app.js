/************* global require *************/
require('./modules/dotenv-init')();
const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');
const passport = require('passport');
const passportModule = require('./passport');
const method = require('./middlewares/method-mw');
const logger = require('./middlewares/morgan-mw');
const session = require('./middlewares/session-mw');
const locals = require('./middlewares/locals-mw');
const { isAdmin } = require('./middlewares/auth-mw');
const { sequelize } = require('./models');

/*************** sequelize init **************/
require('./modules/sequelize-init')(sequelize);

/*************** server init **************/
require('./modules/server-init')(app, process.env.PORT);

/*************** helmet init **************/
app.use(helmet({ contentSecurityPolicy: false }));

/*************** static init **************/
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'storages')));

/************** view engine ***************/
app.set('view engine', 'ejs');
app.set('views', './views');
app.locals.pretty = true;

/*************** middleware ***************/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(method());
app.use(session(app));

/**************** passport ****************/
passportModule(passport);
app.use(passport.initialize());
app.use(passport.session());

/***************** locals *****************/
app.use(locals);

/*************** logger init **************/
app.use(logger);

/*************** router init **************/
const adminRouter = require('./routes/admin');
const apiRouter = require('./routes/api');

app.use('/admin', isAdmin(7), adminRouter);
app.use('/api', apiRouter);

/**************** error init **************/
const _404Router = require('./routes/error/404-router');
const _500Router = require('./routes/error/500-router');

app.use(_404Router);
app.use(_500Router);
