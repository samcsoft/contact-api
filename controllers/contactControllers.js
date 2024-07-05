
const asynchandler = require('express-async-handler');
const Contact = require('../models/contactModel');


const getContacts = asynchandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

const createContact = asynchandler(async(req, res) => {
    const {name, phone, address, gender} = req.body;
    if(!name || !phone || !gender){
        res.status(400);
        throw new Error("All fields are required");
    }
    const contact = await Contact.create({user_id: req.user.id, name, phone, address, gender}); 
    res.status(200).json(contact);
});

const getContact = asynchandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found.");
    }
    res.status(200).json(contact);
});

const updateContact = asynchandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found.");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to edit other contacts.");
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updateContact);
});

const deleteContact = asynchandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found.");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete other contacts.");
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});



module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};