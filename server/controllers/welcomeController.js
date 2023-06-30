const connection = require('../models/connection');

exports.view = (req, res) => {
  res.render('welcome', {"mainHeading":"Welcome To Management Portal","subHeading":"Manage all your system"});   
}