const http = require('http');
const url = require('url');
const database = require('./MongoDBLayer');
const logger = require('./logger');

var HTTPModuleServer = http.createServer(async(req,res) => {
    try
    {
            const queryObjects = url.parse(req.url,true).query;
            let firstName = queryObjects.firstName || '';
            let lastName = queryObjects.lastName || '';
            if(firstName === '' && lastName === '') {
                res.statusCode = 400;
                res.write('Missing required fields: firstName and lastName');
                res.end();
                return;
            } else if(firstName === '') {
                res.statusCode = 400;
                res.write('Missing required fields: firstName');
                res.end();
                return;
            } else if(lastName === '') {
                res.statusCode = 400;
                res.write('Missing required fields: lastName');
                res.end();
                return;
            }
            else
            {
                firstName = firstName.toUpperCase();
                lastName = lastName.toUpperCase();
                const result = await database.getName(firstName, lastName);
                if(result.length === 0) {
                    database.addName(firstName, lastName);
                    res.statusCode = 201;
                    res.write('Created New Record!');
                    res.end();
                    return;
                }
                else {
                    res.write('firstName:' + result[0].firstName);
                    res.write('\n');
                    res.write('lastName:' + result[0].lastName);
                    res.statusCode = 200;
                    res.end();
                    return;
                }
            }
        }
    catch(error)
    {
        console.log('Error Message', error);
    }
});

const port = process.env.PORT || 4000;
HTTPModuleServer.listen(4000,console.log('Listening on port 4000...'));
