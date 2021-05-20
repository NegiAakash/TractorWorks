const router = require('express').Router();
const brandModel = require('./models/brandModel');
const tractorModel = require('./models/tractorModel');

// add a new tractor
router.post('/add', (req, res) => {
    const name = req.body.name;
    const brand_id = req.body.brand_id;
    const availability = req.body.availability;

    // checking if brand exists or not
    brandModel.countDocuments({_id: brand_id})
    .then(count => {
        if(count === 0)
        throw new Error('BRAND_DOES_NOT_EXIST');

        else if(count != 1)
        throw new Error('INTERNAL_ERROR');
    })
    .catch(err => {
        console.log('\n');
        console.log(err.message);
        res.status(400).send(err.message);
    })

    tractorModel.countDocuments({
        name: {$regex: new RegExp(name,'i')},
        brand_id: brand_id
    })
    .then(count => {

        if(count === 0) {
            const newTractor = new tractorModel({
                name: name,
                brand_id: brand_id,
                availability: availability
            })

            newTractor.save()
            .then(tractor => {
                console.log(`Saved details for Tractor : ${tractor.name}`);
                console.log();
                console.log(tractor);
                res.sendStatus(200);
            })
            .catch(err => {
                console.log('\n'+err.message);
                res.status(500).send('ERROR_SAVING_DETAILS');
            })
        }

        else if(count === 1) 
        throw new Error('TRACTOR_OBJECT_ALREADY_EXISTS');

        else
        throw new Error('INTERNAL_ERROR');
    })
    .catch(err => {
        console.log('\n'+err.message);
        res.status(500).send(err.message);
    })
})

// fetch all tractors
router.get('/all', (req, res) => {
    tractorModel.find()
    .then(tractors => {
        console.log(`Fetched all tractors`);
        res.status(200).send(tractors);
    })
    .catch(err => {
        console.log(`Error while fetching all tractors`);
        res.status(500).send('INTERNAL_ERROR');
    })
})

// fetch a specific tractor by id
router.get('/:id', (req, res) => {
    tractorModel.countDocuments({_id: req.params.id})
    .then(count => {
        if(count === 0) 
        throw new Error('TRACTOR_OBJECT_DOES_NOT_EXIST');

        else if(count === 1) {
            tractorModel.find({_id: req.params.id})
            .then(tractor => {
                console.log(`Fetched tractor : ${tractor.name}`);
                res.status(200).send(tractor);
            })
            .catch(err => {
                console.log(err.message);
                res.status(500).send(err.message);
            })
        }

        else
        throw new Error('INTERNAL_ERROR');
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).send(err.message);
    })
})

// fetch tractors by name regex
router.get('/name/:name', (req, res) => {
    tractorModel.find({name: {$regex: new RegExp(req.params.name, 'i')}})
    .then(tractors => {
        res.status(200).send(tractors);
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).send(err.message);
    });
})

// fetch all tractors by brand_id
router.get('/brand_id/:id', (req, res) => {
    tractorModel.countDocuments({brand_id: req.params.id})
    .then(count => {
        if(count === 0) 
        throw new Error('NO_OBJECTS_FOR_THIS_ID');

        else if(count >= 1) {
            tractorModel.find({brand_id: req.params.id})
            .then(tractors => {
                console.log(`Fetched tractors for brand_id : ${req.params.id}`);
                res.status(200).send(tractors);
            })
            .catch(err => {
                console.log(err.message);
                res.status(500).send(err.message);
            })
        }

        else
        throw new Error('INTERNAL_ERROR');
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).send(err.message);
    })
})

//update a tractor object by id
router.put('/:update', (req, res) => {
    const id = req.body._id;
    const brand_id = req.body.brand_id;
    const availability = req.body.availability;

    tractorModel.countDocuments({_id: id})
    .then(count => {

        if(count === 1) {
            brandModel.countDocuments({_id: brand_id})
            .then(count => {
                if(count === 0)
                throw new Error('BRAND_DOES_NOT_EXIST');

                else if(count === 1) {
                    tractorModel.updateOne({_id: id}, {
                        name: req.body.name,
                        brand_id: brand_id,
                        availability: availability
                    })
                    .then(doc => {
                        console.log('\n');
                        console.log(`Successfully updated details for id : ${id}`);
                        res.sendStatus(200);
                    })
                }

                else
                throw new Error('INTERNAL_ERROR');
            })
            .catch(err => {
                console.log('\n');
                console.log(err.message);
                res.status(500).send(err.message);
            })
            
        }

        else if(count === 0) 
        throw new Error('TRACTOR_OBJECT_DOES_NOT_EXIST');

        else
        throw new Error('INTERNAL_ERROR');
    })
    .catch(err => {
        console.log('\n');
        console.log(err.message);
        res.status(500).send(err.message);
    })
})

// delete a tractor object by id
router.delete('/remove/:id', (req, res) => {
    const id = req.params.id;
    let status = null;

    tractorModel.deleteOne({_id: id})
    .then(doc => {
        console.log();
        console.log(doc);

        if(doc.ok === 1 && doc.deletedCount === 1)
        res.sendStatus(200);

        else if(doc.n === 0) {
            status = 400;
            throw new Error('OBJECT_DOES_NOT_EXIST');
        }

        else {
            status = 500;
            throw new Error('INTERNAL_ERROR');
        }
    })
    .catch(err => {
        console.log();
        console.log(err.message);
        res.status(status).send(err.message);
    })
})

module.exports = router;