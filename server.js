/*
==========
| SERVER |
==================================================================================================================================

? @contributors:        
                        *- Aswathy Ajesh
                        *- Jordan Weston
                        *- Allen Bey
                        *- William Horn

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

-   

==================================================================================================================================
*/

/* -------------- */
/* Import Modules */
/* -------------- */
const express = require('express');
const routes = require('./controllers');

/* --------------------------------- */
/* Application Set-Up and Middleware */
/* --------------------------------- */
const app = express();

app.use(express.json());
app.use(express.static('public')); // front-end file system
app.use(express.urlencoded({extended: true})); // allow for nested objects in body requests

