/*
==========
| SERVER |
==================================================================================================================================

? @collaborators:        
                        * Aswathy Ajesh
                        * Allen Bey
                        * William Horn

? @doc-name:            server.js
? @doc-created:         05/17/2022
? @doc-modified:        05/19/2022

==================================================================================================================================

? @doc-info
==================
| ABOUT DOCUMENT |
==================================================================================================================================

This program file is responsible for handling the initialization of all back-end functionality and uses the Express.js server
framework to operate. learn more about Express.js here: https://expressjs.com/

Database management is handled by the Sequelize ORM library.

==================================================================================================================================

? @doc-todo
=================
| DOCUMENT TODO |
==================================================================================================================================

todo:   create session data for preserving login info
        *Completed -Aswathy [05/18/2022]

todo:   add sequelize connection and sync it with server -Will [05/17/2022]
        *Completed -Will [05/18/2022]

todo:   import express-handlebars and set-up middleware -Will [05/17/2022]
        *Completed -Will [05/17/2022]

todo:   create 'views' folder w/ corresponding handlebars files for each route in 'controllers' -Will [05/17/2022]
        *Completed -Will [05/17/2022]

==================================================================================================================================
*/

/* -------------- */
/* Import Modules */
/* -------------- */
// one-off's
require('dotenv').config();

// modules
const express = require('express');
const sequelizeConnection = require('./config/sequelizeConnection');
const expressSession = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(expressSession.Store);
const expressHbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

/* ------------------------- */
/* App Set-Up and Middleware */
/* ------------------------- */
const app = express();
const PORT = process.env.PORT || 3000;
const DB_RESET_ON_LOAD = process.env.DB_RESET_ON_LOAD === 'true';

// global middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(expressSession({
  secret: 'xcj90p74uhgft8dgazs',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelizeConnection
  })
}));

// routes should be the last middleware called
app.use(routes);

// app view engine
app.engine('handlebars', expressHbs.create({ helpers }).engine);
app.set('view engine', 'handlebars');

/* ------------ */
/* Start Server */
/* ------------ */
sequelizeConnection.sync({ force: DB_RESET_ON_LOAD }).then(() => {
    app.listen(PORT, err => {
        if (err) throw err;
        console.log('Server running on port:', PORT);
    });

    // seed the database (test code)
    if (DB_RESET_ON_LOAD) {
        require('./models/User').bulkCreate([
            { username: 'test_user_0', password: 'test123', page_visits: 1 },
            { username: 'test_user_1', password: 'test123', page_visits: 1 },
        ]);
    }
});
