const mongoose = require('mongoose');

//Connection string to databas
mongoose.connect('mongodb://mongo:27017/people')
        .then(() => console.log('Connected to DB.....'))
        .catch((err) => console.log('Could not connect to DB.....',err))

//Creating a Schema
const namesSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String
});

//Creating a model
const PeopleNames = mongoose.model('names',namesSchema);

//Method to retrive total number of documents in a collection
async function getDocumentsCount() {
    return await PeopleNames.find().select().count();
}

//Method to add first name and last name of a user
async function addName(inputFN,inputLN) {
    const count = await getDocumentsCount();
    const name = new PeopleNames({
        id: count + 1,
        firstName: inputFN,
        lastName: inputLN
    });

    const result = await name.save();
    return result;
}

//Method to check if the user exists in the collection based on given first name and last name
async function getName(inputFN,inputLN){
    return await PeopleNames.find({ firstName: inputFN, lastName: inputLN});
}

module.exports.addName = addName;
module.exports.getName = getName;