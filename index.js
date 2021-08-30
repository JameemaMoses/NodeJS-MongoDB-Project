const http = require('http');
const url = require('url');
const database = require('./DataAccessLayer/MongoDBQueries');
const logger = require('./LoggingLayer/logger');

var HTTPModuleServer = http.createServer(async(req,res) => {
    try
    {
            const queryObjects = url.parse(req.url,true).query;
            let firstName = queryObjects.firstName || '';
            let lastName = queryObjects.lastName || '';
            if(firstName === '' && lastName === '') {
                res.statusCode = 400;
                res.write('Missing required fields: firstName and lastName');
                logger.error('Missing required fields: firstName and lastName')
                res.end();
                return;
            } else if(firstName === '') {
                res.statusCode = 400;
                res.write('Missing required fields: firstName');
                logger.error('Missing required fields: firstName');
                res.end();
                return;
            } else if(lastName === '') {
                res.statusCode = 400;
                res.write('Missing required fields: lastName');
                logger.error('Missing required fields: lastName');
                res.end();
                return;
            }
            else
            {
                //Che below code chaecks if the user exists in database
                const result = await database.getName(firstName, lastName);
                if(result.length === 0) {
                    //If user does not exist in database, add the first name and lastname to db
                    database.addName(firstName, lastName);
                    res.statusCode = 201;
                    res.write('Created New Record!');
                    logger.info(`Created new record with data: First Name: ${firstName} and Last Name: ${lastName} `);
                    res.end();
                    return;
                }
                else {
                    //If user exists in the database, display the first name and last name
                    res.write('firstName:' + result[0].firstName);
                    res.write('\n');
                    res.write('lastName:' + result[0].lastName);
                    logger.info(`Record Already Exists: First Name: ${result[0].firstName} and Last Name: ${result[0].lastName} `);
                    res.statusCode = 200;
                    res.end();
                    return;
                }
            }
        }
    catch(error)
    {
        logger.error(`${error}`);
    }
});

//const port = process.env.PORT || 4000;
HTTPModuleServer.listen(4000,logger.info('Listening on port 4000...'));
