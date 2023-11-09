const router = require('express').Router();
const notesRoutes = require('./notes/notes.routes');
const userRoutes = require('./users/user.routes');


router.use('/users',userRoutes);
router.use('/notes',notesRoutes);

module.exports =router