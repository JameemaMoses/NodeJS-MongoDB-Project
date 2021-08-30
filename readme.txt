 NodeJS - Project 2 - Connecting to Mongo DB - Build With Docker

Requirements Completed:
1. The webservice will add or retrieve a name using a MongoDB collection.
2. The Node.js server application listens on port 4000.
3. The webservice will accept two query string parameters: firstName and lastName   
4. Input is validated and an appropriate error message is displayed and status code is set as 400.
5. If the first and last name are not in the collection in a single record, record will be inserted.
The response status code is set as 201 and text indicating the record was created.
6. If the first and last name are in the collection in a single record.
The response status code is set as 200 and text is displayed as firstname and lastname.
7. The application is build using Docker and Docker compose.

How to run the application? - 
Without docker
1. Download the code.
2. Open it in VS code.
3. npm install
4. Install MongoDB
5. Change the mongodb connection string to below 
mongoose.connect('mongodb://localhost:27017/people')
        .then(() => console.log('Connected to DB.....'))
        .catch((err) => console.log('Could not connect to DB.....',err))
6. Run the below command:
node index.js or nodemon index.js

With docker
1. Download the code.
2. Open it in VS code
3. Install docker
4. Make sure mongodb connection string is as below :
mongoose.connect('mongodb://mongo:27017/people')
        .then(() => console.log('Connected to DB.....'))
        .catch((err) => console.log('Could not connect to DB.....',err))
5. Run docker-compose up
6. Run the service (http://localhost)
7. Stop the service (CTRL + C) and Run docker-compose down --rmi f all to delete the images.

Note:
Install nodemon globally to use it as below:
npm i g nodemon