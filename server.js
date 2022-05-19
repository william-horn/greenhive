/*
==========
| SERVER |
==================================================================================================================================

? @collaborators:        
                        * Aswathy Ajesh
                        * Jordan Weston
                        * Allen Bey
                        * William Horn

? @doc-name:            server.js
? @doc-created:         05/17/2022
? @doc-modified:        05/18/2022

==================================================================================================================================

? @doc-info
==================
| ABOUT DOCUMENT |
==================================================================================================================================

This program file is responsible for handling the initialization of all back-end functionality and uses the Express.js server
framework to operate. learn more about Express.js here: https://expressjs.com/

==================================================================================================================================

? @doc-todo
=================
| DOCUMENT TODO |
==================================================================================================================================

todo:   create session data for preserving login info
        !Incomplete

todo:   add sequelize connection and sync it with server -Will [05/17/2022]
        *Completed -Will [05/18/2022]

todo:   import express-handlebars and set-up middleware -Will [05/17/2022]
        *Completed -Will [05/17/2022]

todo:   create 'views' folder w/ corresponding handlebars files for each route in 'controllers' -Will [05/17/2022]
        *Completed -Will [05/17/2022]

==================================================================================================================================
*/

/* ---------------------------- */
/* Import Environment Variables */
/* ---------------------------- */
require('dotenv').config();

/* -------------- */
/* Import Modules */
/* -------------- */
const express = require('express');
const sequelizeConnection = require('./config/sequelizeConnection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const expressHbs = require('express-handlebars');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_RESET_ON_LOAD = process.env.DB_RESET_ON_LOAD === 'true';

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelizeConnection
  })
};

app.use(session(sess));
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
            { username: 'test_user_0' },
            { username: 'test_user_1' },
        ]);
    }
});
