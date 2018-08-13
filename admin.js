const express = require('express');
const admin = new express.Router();
const multer = require('multer');
const upload = multer({
    dest: 'public/images/'
});
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const fs = require('fs'); // will be use to write images
const staticMiddleware = express.static('public');

app.use(staticMiddleware)

const {
    findAllAdmins,
    deleteAdmin,
    findOneAdmin,
    createCompany,
    deleteCompany,
    updateAdmin,
    updateCompany,
    updateCompanyPhoto,
  } = require('./db.js');

//header needs a token 
//admin routes go here 

//routes ONLY if authentication is verified
// Returns JSON of name/userId of all admins
admin.get('/api/admins/', (req, res) => {
    findAllAdmins()
        .then(admins => res.json(admins))
        .catch((err) => res.send(err));

});

// Returns JSON of name/userId for specific admin
admin.get('/api/admins/:id', (req, res) => {
    findOneAdmin(req.params.id)
        .then(company => res.json(company))
        .catch((err) => res.send(err));

});

admin.post('/api/deletecompany/:id', (req,res) => {
    let companyId = req.params.id;
    deleteCompany(companyId)
    .then(company => res.json(company))
    .catch((err) => res.send(err));
})

// updates name/userId for specific admin
admin.post('/api/updateadmins/:id', (req, res) => {
    updateAdmin(req.body)
    .then(admin => res.json(admin))
    .catch((err) => res.send(err));
});

// create new company
admin.post('/api/createcompany', (req, res) => {
    // console.log(req.body)
    let newCompanyObject = {
        name: req.body.name,
        summary: req.body.summary,
        industry: req.body.industry,
        stage: req.body.stage,
        productAndServices: req.body.productAndServices,
        needs: req.body.needs,
        website: req.body.website,
        email: req.body. email,
        phone: req.body.phone,
        youtubeLink: req.body.youtubeLink,
        paypalLink: req.body.paypalLink,
        location: req.body.location,
        profile: req.body.profile,
        linkedIn: req.body.linkedIn
    };
    createCompany(newCompanyObject)
        .then(company => res.json(company))
        .catch((err) => res.send(err));
});

admin.post('/api/createcompanypicture/:id', upload.single('picture'), (req, res) => {
    fs.rename(req.file.path, 
    `public/images/${req.params.id}`, 
    (err) => { 
        if (err) {
            console.log(err);
        }
    })
    let imagePath = `images/${req.params.id}`;
    let id = req.params.id;
    let companyObject = {
        _id: id,
        picture: imagePath
    };
    updateCompanyPhoto(companyObject)
        .then(company => res.json(company))
        .catch((err) => res.send(err));
});

//updates specific company 
admin.post('/api/updatecompany/:id', (req, res) => {
    console.log(req.body)
    let newCompanyObject = {
        _id: req.params.id,
        name: req.body.name,
        summary: req.body.summary,
        industry: req.body.industry,
        stage: req.body.stage,
        productAndServices: req.body.productAndServices,
        needs: req.body.needs,
        website: req.body.website,
        email: req.body.email,
        phone: req.body.phone,
        youtubeLink: req.body.youtubeLink,
        paypalLink: req.body.paypalLink,
        location: req.body.location,
        profile: req.body.profile,
        linkedIn: req.body.linkedIn
    };
    updateCompany(newCompanyObject)
        .then(company => res.json(company))
        .catch((err) => res.send(err));
});

admin.post('/api/updatecompanypicture/:id', upload.single('picture'), (req, res) => {
    // Need to delete old picture at public/images/:id before renaming old one
    // Check DB to see if picture exists before trying to delete
    // console.log(req.file);

    fs.rename(req.file.path,
        `public/images/${req.params.id}`,
        (err) => {
            if (err) {
                console.log(err);
            }
        });

    let imagePath = `images/${req.params.id}`;
    let id = req.params.id;
    let companyObject = {
        _id: id,
        picture: imagePath
    };
    updateCompanyPhoto(companyObject)
        .then(company => res.json(company))
        .catch((err) => res.send(err));
});
module.exports = admin;