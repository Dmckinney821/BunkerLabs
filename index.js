const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const fs = require('fs'); // will be use to write images
const port = 4000; // change this to .env file
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const staticMiddleware = express.static('public');
const cors = require('cors');
const multer = require('multer');
const upload = multer({
    dest: 'public/images/'
});
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const router = express.Router();
const expressJwt = require('express-jwt');
const {createAccount, verifyToken, verifyUser} = require('./routes/auth');
const admin = require('./admin')

app.use(staticMiddleware)

const {
    createAdmin,
    findAllAdmins,
    deleteAdmin,
    findOneAdmin,
    createCompany,
    deleteCompany,
    updateAdmin,
    updateCompany,
    findAllCompanies,
    findOneCompany,
    updateCompanyPhoto,
    findCompanyByIndustry,
    findCompanyByStage ,
    findAdminByUsername
} = require('./db.js');

app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// const static = express.static;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// This is for cross domain fun --> from Chris
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    next();
});

app.use(cors({
    origin: ['*'],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.post('/createAccount', createAccount)


//public routes
// Returns JSON data for all companies
// app.get('/api/companies/', (req, res) => {
//     findAllCompanies()
//         .then(companies => res.json(companies))
//         .catch((err) => res.send(err));
// });

// Returns JSON data for specific company
app.get('/api/companies/:id', (req, res) => {
    findOneCompany(req.params.id)
        .then(company => res.json(company))
        .catch((err) => res.send(err));
});

//filter all companies by industry 
app.get('/api/company/byIndustry/:industry', (req, res) => {
    let industry = req.params.industry;
    findCompanyByIndustry(industry)
        .then(industry => res.json(industry))
        .catch((err) => res.send(err))

});

//filter all companies by stage
app.get('/api/company/byStage/:stage', (req, res) => {
    let stage = req.params.stage;
    findCompanyByStage(stage)
        .then(stage => res.json(stage))
        .catch((err) => res.send(err))

});

//filter all companies by industry 
app.get('/api/company/byIndustry/:industry', (req, res) => {
    let industry = req.params.industry; 
        findCompanyByIndustry(industry)
            .then(industry => res.json(industry))
            .catch((err) => res.send(err))

});

//filter all companies by stage
app.get('/api/company/byStage/:stage', (req, res) => {
    let stage = req.params.stage; 
        findCompanyByStage(stage)
            .then(stage => res.json(stage))
            .catch((err) => res.send(err))

});

//routes ONLY if authentication is verified
// Returns JSON of name/userId of all admins
app.post('/api/admin/', verifyUser) 
    //put authentication part


// app.get('/api/admins/', (req, res) => {
//     findAllAdmins()
//         .then(admins => res.json(admins))
//         .catch((err) => res.send(err));

// });

// // Returns JSON of name/userId for specific admin
// app.get('/api/admins/:id', (req, res) => {
//     findOneAdmin(req.params.id)
//         .then(company => res.json(company))
//         .catch((err) => res.send(err));

// });

// app.post('/api/deletecompany/:id', (req,res) => {
//     let companyId = req.params.id;
//     deleteCompany(companyId)
//     .then(company => res.json(company))
//     .catch((err) => res.send(err));
// })

// // updates name/userId for specific admin
// app.post('/api/updateadmins/:id', (req, res) => {
//     updateAdmin(req.body)
//     .then(admin => res.json(admin))
//     .catch((err) => res.send(err));
// });

// // create new company
// app.post('/api/createcompany', (req, res) => {
//     // console.log(req.body)
//     let newCompanyObject = {
//         name: req.body.name,
//         summary: req.body.summary,
//         industry: req.body.industry,
//         stage: req.body.stage,
//         productAndServices: req.body.productAndServices,
//         needs: req.body.needs,
//         website: req.body.website,
//         email: req.body. email,
//         phone: req.body.phone,
//         youtubeLink: req.body.youtubeLink,
//         paypalLink: req.body.paypalLink,
//         location: req.body.location,
//         profile: req.body.profile,
//         linkedIn: req.body.linkedIn
//     };
//     createCompany(newCompanyObject)
//         .then(company => res.json(company))
//         .catch((err) => res.send(err));
// });

// app.post('/api/createcompanypicture/:id', upload.single('picture'), (req, res) => {
//     fs.rename(req.file.path, 
//     `public/images/${req.params.id}`, 
//     (err) => { 
//         if (err) {
//             console.log(err);
//         }
//     })
//     let imagePath = `images/${req.params.id}`;
//     let id = req.params.id;
//     let companyObject = {
//         _id: id,
//         picture: imagePath
//     };
//     updateCompanyPhoto(companyObject)
//         .then(company => res.json(company))
//         .catch((err) => res.send(err));
// });

// //updates specific company 
// app.post('/api/updatecompany/:id', (req, res) => {
//     console.log(req.body)
//     let newCompanyObject = {
//         _id: req.params.id,
//         name: req.body.name,
//         summary: req.body.summary,
//         industry: req.body.industry,
//         stage: req.body.stage,
//         productAndServices: req.body.productAndServices,
//         needs: req.body.needs,
//         website: req.body.website,
//         email: req.body.email,
//         phone: req.body.phone,
//         youtubeLink: req.body.youtubeLink,
//         paypalLink: req.body.paypalLink,
//         location: req.body.location,
//         profile: req.body.profile,
//         linkedIn: req.body.linkedIn
//     };
//     updateCompany(newCompanyObject)
//         .then(company => res.json(company))
//         .catch((err) => res.send(err));
// });

// app.post('/api/updatecompanypicture/:id', upload.single('picture'), (req, res) => {
//     // Need to delete old picture at public/images/:id before renaming old one
//     // Check DB to see if picture exists before trying to delete
//     // console.log(req.file);

//     fs.rename(req.file.path,
//         `public/images/${req.params.id}`,
//         (err) => {
//             if (err) {
//                 console.log(err);
//             }
//         });

//     let imagePath = `images/${req.params.id}`;
//     let id = req.params.id;
//     let companyObject = {
//         _id: id,
//         picture: imagePath
//     };
//     updateCompanyPhoto(companyObject)
//         .then(company => res.json(company))
//         .catch((err) => res.send(err));
// });
  
app.use(verifyToken, admin)

//404 message for nonexistent routes
app.get('*', function (req, res) {
    res.send('page not found', 404);
});
app.listen(port, () => {
    console.log(`Your server is running at http://localhost:${port}`);
});
