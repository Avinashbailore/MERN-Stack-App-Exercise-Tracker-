const router = require('express').Router();

let Excercise = require('../models/exercise.model');


router.route('/').get((req, res) => {
    Excercise.find()
        .then(excercises => res.json(excercises))
        .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    console.log(duration,"dur");
    const date = Date.parse(req.body.date);


    const newUser = new Excercise({username, description, duration, date});

    newUser.save()
    .then( () => res.json('Exercise added'))
    .catch( (err) => res.status(400).json('Err', err));
});


router.route('/:id').get((req, res) => {
    Excercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch( (err) => console.log(err));
});

router.route('/:id').delete((req, res) => {
    Excercise.findByIdAndDelete(req.params.id)
        .then(() => res.json("Exercise Deleted"))
        .catch( (err) => res.status(400).json('Err', err));
});

router.route('/update/:id').post((req, res) => {
    Excercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username
            exercise.description = req.body.description
            exercise.duration = req.body.duration
            exercise.date = req.body.date

            exercise.save()
                .then(() => res.json('Exercise Update'))
        })
        .catch( (err) => res.status(400).json('Err', err));
});

module.exports = router