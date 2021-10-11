require('dotenv').config()


exports.config = {
    server: process.env.SERVER,  
        authentication: {
            type: 'default',
            options: {
                userName: process.env.NAME , 
                password: process.env.PASSWORD
            }
        },
        options: {
            encrypt: true,
            database: 'hs_data'  
        }
}
