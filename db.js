const mongoose = require('mongoose');
const mongooseUrl = 'mongodb://localhost:27017/Bunkerlabs';
const Admin = require('./models/admin.js');
const Company = require('./models/company.js');
const bcrypt = require('bcrypt');

// Connect to mongodb
mongoose.connect(mongooseUrl, 
{useNewUrlParser: true});
// Get mongoose to use the global promise library
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:' ));
db.once('open', () => {
    console.log('Connected to mongodb!');
});


function createHashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

function createAdmin(username, password, superUser=true) {
      var user = new Admin({
        username: username,
        password: createHashPassword(password),
        superUser: superUser
    });

    return user.save((err) => {
        if (err) return console.log(err);
        console.log('saved user');
    });
};

function findAllAdmins() {
    return Admin.find(
        {},
        'username',
        (err, admins) => {
        if (err) return console.log(err);
        return admins;
    });
};

function findOneAdmin(userId) {
    return Admin
    .findById(userId)
    .select('username password')
    .exec()
    .then(admin => {
        return admin;
    })
    .catch(err => console.log(err));
};

function findAdminByUsername(username) {
    return Admin
    .findOne({ 'username': username })
    .select('username password superUser')
    .exec()
    .then(admin => {
        return admin;
    })
    .catch(err => console.log(err));
}

function deleteAdmin(userId) {
    return Admin
    .findByIdAndRemove(userId)
    .exec(admin => {
    return admin
    })
    .catch(err => console.log(err));
};

function createCompany(companyObject) {
    var company = new Company({
        name: companyObject.name,
        picture: companyObject.picture,
        summary: companyObject.summary,
        industry: companyObject.industry,
        stage: companyObject.stage,
        productAndServices: companyObject.productAndServices,
        needs: companyObject.needs,
        website: companyObject.website,
        email: companyObject. email,
        phone: companyObject.phone,
        youtubeLink: companyObject.youtubeLink,
        paypalLink: companyObject.paypalLink,
        location: companyObject.location,
        profile: companyObject.profile,
        linkedIn: companyObject.linkedIn
    });
    return company.save()
};

function deleteCompany(companyId) {
    return Company
    .findByIdAndRemove(companyId)
    .exec()
    .then(company => {
        console.log(`Company ${companyId} deleted.`);
        return company
    })
    .catch(err => console.log(err))
};

function findAllCompanies() {
    return Company
    .find()
    .exec()
    .then(companies => {
        return companies;
    })
    .catch(err => console.log(err));
};

function findOneCompany(userId) {
    return Company
    .findById(userId)
    .exec()
    .then(company => {
        return company;
    })
    .catch(err => console.log(err));
};


function updateCompany(CompanyObject){
    let modifications = {};
    modifications.name = CompanyObject.name; 
    // modifications.picture = CompanyObject.picture;
    modifications.summary = CompanyObject.summary;
    modifications.industry = CompanyObject.industry;
    modifications.stage = CompanyObject.stage;
    modifications.productAndServices = CompanyObject.productAndServices;
    modifications.needs = CompanyObject.needs;
    modifications.website = CompanyObject.website;
    modifications.email = CompanyObject.email;
    modifications.phone = CompanyObject.phone;
    modifications.youtubeLink = CompanyObject.youtubeLink;
    modifications.paypalLink = CompanyObject.paypalLink; 
    modifications.location = CompanyObject.location; 
    modifications.profile = CompanyObject.profile;
    modifications.linkedIn = CompanyObject.linkedIn;
    console.log(CompanyObject._id);
    return Company 
        .findByIdAndUpdate(CompanyObject._id, {$set: modifications}, {new: true})
        .exec()
        .then(company => {
            return company;
        }).catch(err => console.log(err));
};

function updateCompanyPhoto(CompanyObject) {
    let modifications = {};
    modifications.picture = CompanyObject.picture;
    return Company
        .findByIdAndUpdate(CompanyObject._id, {
            $set: modifications
        }, {
            new: true
        })
        .exec()
        .then(company => {
            return company;
        }).catch(err => console.log(err));
};

function updateAdmin(AdminObject){
    let modifications = {};
    modifications.username = AdminObject.username;
    modifications.password = AdminObject.password;
    return Admin 
        .findByIdAndUpdate(AdminObject._id, {$set: modifications}, {new: true})
        .exec()
        .then(admin => {
            return admin; 
        }).catch(err => console.log(err));
};

function findCompanyByIndustry(industryObject){
    return Company
    .find()
    .where('industry').equals(industryObject)
    .exec()
    .then(companies => {
            return companies;
    })
    .catch(err => console.log(err));
};

function findCompanyByStage(stageObject){
    return Company
    .find()
    .where('stage').equals(stageObject)
    .exec()
    .then(companies => {
        return companies;
    })
    .catch(err => console.log(err));
};

// Mongoose functions
// findById()
// findOne()
// findByIdAndRemove()
// findByIdAndUpdate() 
// findOneAndRemove()
// findOneAndUpdate()
// modelname.find()
// count()
// populate() - method in a query to replace id with data

module.exports = {
    createAdmin,
    findAllAdmins,
    findOneAdmin,
    deleteAdmin,
    createCompany,
    deleteCompany,
    updateAdmin,
    updateCompany,
    findAllCompanies,
    findOneCompany,
    updateCompanyPhoto,
    findCompanyByIndustry,
    findCompanyByStage,
    findAdminByUsername
};

// If you don 't specify a callback then the API will return a variable of type Query. You can use this query object to build up your query and then execute it (with a callback) later using the exec() method.

// // find all athletes that play tennis
// var query = Athlete.find({
//     'sport': 'Tennis'
// });

// // selecting the 'name' and 'age' fields
// query.select('name age');

// // limit our results to 5 items
// query.limit(5);

// // sort by age
// query.sort({
//     age: -1
// });

// // execute the query at a later time
// query.exec(function (err, athletes) {
//     if (err) return handleError(err);
//     // athletes contains an ordered list of 5 athletes who play Tennis
// })

// Athlete.
// find().
// where('sport').equals('Tennis').
// where('age').gt(17).lt(50). //Additional where query
// limit(5).
// sort({
//     age: -1
// }).
// select('name age').
// exec(callback); 
// where callback is the name of our callback function.
