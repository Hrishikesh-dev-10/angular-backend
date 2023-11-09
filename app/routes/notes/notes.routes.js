const notesRoutes = require('express').Router();
const Controller = require('../../controller/notes/notes.controller');
const { verifyToken } = require('../../middleware/auth');

notesRoutes.post('/create',verifyToken,Controller.createNoteController);
notesRoutes.get('/getByUsers/:id',verifyToken,Controller.getNoteController);
notesRoutes.get('/getByID/:id',Controller.getNoteByIDController)
notesRoutes.delete('/deleteNote/:id',verifyToken,Controller.deleteNoteController);
notesRoutes.put('/updateNote',verifyToken,Controller.updateNoteController);

module.exports = notesRoutes;