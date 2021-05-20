const mongoose = require('mongoose');
const CheckModel = require('./models/checkModel');

const host = 'mongodb://localhost:27017/';
const dbname = 'tractorworksdb';
const successString = 'f#869';

function connectdb() {
    mongoose.connect(`${host}${dbname}`,
    { useUnifiedTopology: true, useNewUrlParser: true })
    .catch(err => {
        console.log(`Error while connecting to database`);
        return;
    });

    const db = mongoose.connection;

    db.on('error', err => console.log(err))
    .once('open', () => {
        CheckModel.findOne({name: "key"})
        .then(doc => {
            let status = 1;

            if(doc === null || doc.value !== successString);
            else if(doc.value === successString)
            status = 0;

            if(status === 0)
            console.log(`Connected to database`);

            else {
                mongoose.connection.close();
                throw 'Error while connecting to database';
            }
        })
        .catch(err => console.log(err));
    })
}

module.exports = connectdb;