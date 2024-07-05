const express = require('express');
const { getContacts } = require('../controllers/contactControllers.js');
const { createContact } = require('../controllers/contactControllers.js');
const { getContact } = require('../controllers/contactControllers.js');
const { updateContact } = require('../controllers/contactControllers.js');
const { deleteContact } = require('../controllers/contactControllers.js');
const validateToken = require('../../../ExpressEntry/mycontacts-backend/middleware/validateTokenHandler.js');

const router = express.Router();

router.use(validateToken);
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;