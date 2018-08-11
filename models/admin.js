const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model

const AdminSchema = new Schema({
    username: String,

    password: String,
    superUser: Boolean

});

const Admin = mongoose.model('admins', AdminSchema);

module.exports = Admin;