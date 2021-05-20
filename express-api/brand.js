const router = require('express').Router();
const BrandModel = require('./models/brandModel');

// add a new brand
router.post('/add', (req, res) => {
    const name = req.body.name.trim();

    BrandModel.countDocuments({name: {$regex : new RegExp(name, 'i')}})
    .then(count => {
        
        if(count === 0) {
            const contactList = req.body.contacts;
            let contacts = [];

            for(i=0; i<contactList.length; i++) {
                const contact = contactList[i].trim();

                if(!contact.match(/^[0-9]{10}$/))
                throw new Error('INVALID_CONTACT');

                if(!contacts.includes(contact))
                contacts.push(contact);
            }

            const newBrand = new BrandModel({
                name: name,
                contacts: contacts
            })

            newBrand.save()
            .then(brand => {
                console.log(`Brand details saved for ${brand.name}`);
                res.sendStatus(200);
            })
            .catch(err => {
                console.log(err.message);
                res.status(500).send('ERROR_SAVING_DETAILS: '+err.message);
            })
        }

        else if(count === 1)
        throw new Error('BRANDNAME_ALREADY_EXISTS');

        else
        throw new Error('INTERNAL_ERROR');
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).send(err.message);
    })
})

// get all brands
router.get('/all', (req, res) => {
    BrandModel.find()
    .then(brands => {
        console.log(`Fetched all brands`)
        res.status(200).send(brands)
    })
    .catch(err => {
        console.log(`Error while fetching data for all brands : ${err.message}`);
        res.sendStatus(500);
    })
})

// get one particular brand
router.get('/:name', (req, res) => {
    const name = req.params.name;

    BrandModel.countDocuments({name: {$regex : new RegExp(name, 'i')}})
    .then(count => {
        console.log(`\ncount: ${count}`);
        if(count === 1) {
            BrandModel.find({name: {$regex : new RegExp(name, 'i')}})
            .then(brand => {
                console.log(`Fetched brand ${name}`);
                res.status(200).send(brand);
            })
            .catch(err => {
                const msg = err.message;
                console.log(`Error while fetching brand ${brand}`);
                console.log(`${msg}`);
                res.status(500).send('ERROR_FETCHING_RECORD');
            })
        }

        else if(count === 0)
        throw new Error('BRAND_DOES_NOT_EXIST');

        else
        throw new Error('INTERNAL_ERROR');
    })
    .catch(err => {
        console.log('\nError while fetching brand');
        console.log(err.message);
        res.status(500).send(err.message);
    })
})

// update brand details
router.post('/update/:name', (req, res) => {
    const name = req.params.name.trim();

    BrandModel.countDocuments({name: {$regex : new RegExp(name, 'i')}})
    .then(count => {
        
        if(count === 1) {
            const contactList = req.body.contacts;
            let contacts = [];

            for(i=0; i<contactList.length; i++) {
                const contact = contactList[i];

                if(!contact.trim().match(/[0-9]{10}/))
                throw new Error('INCORRECT_CONTACT');

                if(!contacts.includes(contact))
                contacts.push(contact);
            }

            BrandModel.updateOne({name: name}, {
                name: req.body.name,
                contacts: contacts
            })
            .then(doc => {
                console.log('\n');
                console.log(`Successfully saved details for ${name}`);
                res.status(200).send(doc);
            })
            .catch(err => {
                console.log('\n');
                console.log(`Error while updating details for ${name}`);
                console.log(err.message);
                res.status(500).send(err.message);
            })
        }

        else if(count === 0)
        throw new Error('BRAND_DOES_NOT_EXISTS');

        else
        throw new Error('INTERNAL_ERROR');
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).send(err.message);
    })
})

// delete brand
router.delete('/remove/:name', (req, res) => {
    const name = req.params.name;

    BrandModel.countDocuments({name: {$regex: new RegExp('^'+name+'$', 'i')}})
    .then(count => {
        if(count === 1) {
            BrandModel.deleteOne({name: {$regex: new RegExp('^'+name+'$', 'i')}})
            .then(doc => {
                console.log(`Successfully deleted brand ${name}`);
                res.sendStatus(200);
            })
            .catch(err => {
                console.log(`Error while deleting Brand ${name} : ${err.message}`);
                res.status(500).send(err.message);
            })
        }

        else if(count === 0) {
            throw new Error('BRAND_DOES_NOT_EXIST');
        }

        else {
            throw new Error('INTERNAL_ERROR');
        }
    })
    .catch(err => {
        let status;
        console.log(`Error while deleting Brand ${name} : ${err.message}`);

        if(err.message === 'BRAND_DOES_NOT_EXIST')
        status = 400;
        else
        status = 500;

        res.status(status).send(err.message);
    })
})

module.exports = router;
