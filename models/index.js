/*
    Table loader

    require the models directory to return an object with method 'loadTables' which initializes all models before they
    are used to ensure that they exist. This code was implemented to avoid the 'db.table does not exist' error, which seemed
    to occur if you required a model inside the callback of the 'sequelize.sync' method.

    -Will
*/

const loadTables = () => {
    require('./User');
}

module.exports = {
    loadTables
}

