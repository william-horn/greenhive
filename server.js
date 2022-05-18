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
? @doc-modified:        05/17/2022

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

todo:   add sequelize connection and sync it with server -Will [05/17/2022]
        !Incomplete

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
const { engine: renderEngine } = require('express-handlebars');
const routes = require('./controllers');

/* --------------------------------- */
/* Application Set-Up and Middleware */
/* --------------------------------- */
// app set-up
const app = express();
const PORT = process.env.PORT || 3000;

// app middleware/network
app.use(express.json());                        // allow requests to accept json 
app.use(express.static('public'));              // front-end file system
app.use(express.urlencoded({extended: true}));  // allow for nested objects in body requests

// internal routes
app.use(routes);

// render engine
app.engine('handlebars', renderEngine());
app.set('view engine', 'handlebars');

/* ------------ */
/* Start Server */
/* ------------ */
app.listen(PORT, err => {
    if (err) throw err;
    console.log('Server running on port:', PORT);
});
