
module.exports = {

    accountSettings: {
        passwordCriteria: {
            notEmpty: true,
            minLength: 4,
            maxLength: 100,
            //minSymbols: 0
            //minNumbers: 0
        },

        usernameCriteria: {
            notEmpty: true,
            minLength: 3,
            maxLength: 25,
            //allowSymbols: true | false, --DOES NOT INCLUDE spaces/underscores
            //allowNumbers: true | false,
            //allowUnderscore: true | false,
            //allowSpaces: true | false
        }
    }
}
