const mysql = require('mysql')
const path = require('path')
const fs = require('fs')

module.exports = async function (context, myQueueItem) {

    context.log('JavaScript queue trigger function processed work item', myQueueItem);

    const connection = mysql.createConnection({
        host: 'nscc-w0304263-mysql.mysql.database.azure.com',
        user: 'appuser',
        password: process.env['db_password'],
        database: 'Development',
        ssl: {
            ca: fs.readFileSync(__dirname + "/DigiCertGlobalRootCA.crt.pem")
        }
    })

    connection.connect()

    connection.query("insert into persons(name) values (?);", [myQueueItem], function (error, results, fields) {
        if (error) throw error;
    });

    connection.end()

};