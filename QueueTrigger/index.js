const mysql = require('mysql')
const path = require('path')
const fs = require('fs')

module.exports = async function (context, myQueueItem) {

    context.log('JavaScript queue trigger function processed work item', myQueueItem);

    const connection = mysql.createConnection({
        host: 'nscc-w0304263-mysql.mysql.database.azure.com',
        user: 'appuser',
        password: 'Hd6s#4hfjs758',
        database: 'Development',
        ssl: {
            ca: fs.readFileSync(__dirname + "/DigiCertGlobalRootCA.crt.pem")
        }
    })

    connection.connect()

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });

    connection.end()

};