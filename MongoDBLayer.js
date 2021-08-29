const mongoose = require('mongoose');
const { input } = require('./logger');

mongoose.connect('mongodb://localhost/people')
        .then(() => console.log('Connected to DB.....'))
        .catch((err) => console.log('Could not connect to DB.....',err))

const namesSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String
});

const PeopleNames = mongoose.model('names',namesSchema);

async function getDocumentsCount() {
    return await PeopleNames.find().select().count();
}

async function addName(inputFN,inputLN) {
    const count = await getDocumentsCount();
    const name = new PeopleNames({
        id: count + 1,
        firstName: inputFN,
        lastName: inputLN
    });

    const result = await name.save();
    console.log(result);
    return result;
}

async function getName(inputFN,inputLN){
    return await PeopleNames.find({ firstName: inputFN, lastName: inputLN});
}

module.exports.addName = addName;
module.exports.getName = getName;