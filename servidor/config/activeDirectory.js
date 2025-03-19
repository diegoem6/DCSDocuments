const ActiveDirectory = require('activedirectory2');
require('dotenv').config({ path: 'variables.env' });

const config = {
    url: process.env.AD_URL,
    baseDN: process.env.AD_BASE_DN,
    username: process.env.AD_USERNAME,
    password: process.env.AD_PASSWORD,
    attributes: {
        user: [
            'sAMAccountName',
            'mail',
            'displayName',
            'memberOf'
        ]
    }
};

const ad = new ActiveDirectory(config);

module.exports = ad; 