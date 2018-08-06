const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model

const CompanySchema = new Schema({
    name: String,
    picture: String, // should be file path of picture on HD
    summary: String,
    industry: String,
    stage: String,
    productAndServices: String,
    needs: Array, // this might be an array?
    website: String,
    email: String,
    phone: Number,
    youtubeLink: String,
    paypalLink: String
});

const Company = mongoose.model('companies', CompanySchema);

module.exports = Company