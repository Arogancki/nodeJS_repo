
const mongoose = require('mongoose')
    , CollectionManager = require('./CollectionManager')
    , config = require('../config')
    , people = new mongoose.Schema({
        name: String
    }, { versionKey: false })

class PeopleManager extends CollectionManager{
    parsePeople(peopleString){
        return typeof peopleString === typeof '' 
        ? peopleString.replace(/ *\([^)]*\) */g, "").split(', ')
        : []
    }
    getOrCreate(name){
        return super.createOrUpdate('name', name, {name})
    }
}

module.exports = new PeopleManager(mongoose.model(config.PEOPLE_DATABASE_NAME, people))