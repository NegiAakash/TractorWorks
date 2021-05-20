const router = require('express').Router();
const mongoclient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const AdminModel = require('./models/adminModel');

// add a new admin account
router.post('/add', (req, res) => {

    console.log();
    console.log(`Creating admin object...`);
    const newAdmin = new AdminModel({
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        pwd: req.body.pwd
    });
    console.log(`Created admin object.`);

    console.log(`Saving admin object...`);
    newAdmin.save()
    .then(doc => {
        console.log(doc);
        console.log(`Saved admin object.`);
        res.sendStatus(200);
    })
    .catch(err => {
        // handle duplicate key error
        let msg = null;

        if(err.name === 'MongoError' && err.code === 11000)
        msg = 'EMAIL_ALREADY_REGISTERED';
        else
        msg = err.message;
        
        console.log(`Error while saving admin object :`);
        console.log(err.message);
        res.status(500).send(msg);
    })
})










// create a new admin
// router.post('/add', (req, res) => {
//     const email = req.body.email;

//     AdminModel.count({email: email})
//     .then(count => {
//         if(count === 0) {
//             const newAdmin = new AdminModel({
//                 email: email,
//                 fname: req.body.fname,
//                 pwd: req.body.pwd
//             })

//             newAdmin.save()
//             .then(response => {
//                 console.log(`Registered ${email} as an admin`);
//                 res.sendStatus(200);
//             })
//             .catch(err => {
//                 console.log(err.message);
//                 throw err;
//             })
//         }

//         else if(count === 1) {
//             throw new Error('EMAIL_ALREADY_REGISTERED');
//         }

//         else throw new Error('INTERNAL_ERROR');
//     })
//     .catch(err => {
//         if(err === 'EMAIL_ALREADY_REGISTERED')
//         console.log(`${email} is already registered as an admin.`);

//         else console.log(err.message);

//         res.status(500).send(err.message);
//     })
// })

// get all admins
router.get('/all', (req, res) => {
    AdminModel.find().select(['-_id', '-__v'])
    .then(docs => {
        res.status(200).send(docs);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
});

// login endpoint
router.get('/:email/:pwd', (req, res) => {
    const email = req.params.email;

    AdminModel.findOne({email: email})
    .then(doc => {
        if(doc === null) {
            console.log(`${email} : User is not registered`);
            throw 'unregistered_user';
        }

        AdminModel.findOne({email: email, pwd: req.params.pwd})
        .then(doc => {
            if(doc !== null) {
                console.log(`${email} logged in`);
                return res.sendStatus(200);
            }

            else if(doc === null) {
                throw 'invalid_password';
            }

            else throw 'internal_error';
        })
        .catch(err => {
            console.log(`Error thrown : ${err}`)

            if(err === 'invalid_password')
            return res.status(401).send(err);

            else if(err === 'internal_error')
            return res.status(500).send(err);
        })
    })
    .catch(err => {
        console.log(`Error thrown : ${err}`)
        
        if(err === 'unregistered_user')
        return res.status(401).send(err);

        else
        return res.sendStatus(500);
    })
});

// update email
router.put('/update/:email/pwd/:pwd/newEmail/:newEmail', (req, res) => {
    const email = req.params.email;
    const newEmail = req.params.newEmail;

    AdminModel.updateOne({email: email, pwd: req.params.pwd},
        {email: newEmail})
    .then(doc => {
        console.log(`Updated email for ${email} to ${newEmail}`);
        res.sendStatus(200);
    })
    .catch(err => {
        console.log(`Error while updating email for ${email}`);
        res.sendStatus(500);
    })
})

// update password
router.put('/update/:email/pwd/:pwd/newPwd/:newPwd', (req, res) => {
    const email = req.params.email;

    AdminModel.updateOne({email: email, pwd: req.params.pwd},
        {pwd: req.params.newPwd})
    .then(response => {
        console.log(response)
        if(response.ok === 1) {
            console.log(`Password updated for ${email}`);
            res.sendStatus(200);
        }
    })
    .catch(err => {
        console.log(`Error while updating password for ${email} \n${err.message}`);
        res.sendStatus(500);
    })
})

module.exports = router;
