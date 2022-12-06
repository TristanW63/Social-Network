const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThought);

router
    .route('/:thoughtId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUSer);

module.exports = router;