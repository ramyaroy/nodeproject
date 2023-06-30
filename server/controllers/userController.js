const connection = require('../models/connection');

// View Users
exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE status = "a"', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('user/home', { rows, removedUser });
    } else {
      console.log(err);
    }
  });
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('user/home', { rows });
    } else {
      console.log(err);
    }
  });
}

exports.form = (req, res) => {
  res.render('user/add-user');
}

// Add new user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  let searchTerm = req.body.search;

  var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; // Change this regex based on requirement

  if(first_name=='' || last_name=='' || email=='' || phone=='')
  {
    res.render('user/add-user', { erroralert: 'Enter First name ,last name, phone and email'});
  }
  else if(!emailRegex.test(email) || !phoneRegex.test(phone) )
  {
    res.render('user/add-user', { erroralert: 'Enter correct phone and email',first_name:first_name,last_name:last_name});
  }
  else
  {
    // User the connection
    connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
      if (!err) {
        //res.render('user', { alert: 'User added successfully.' });
        res.redirect('/user');
      } else {
        console.log(err);
      }
    });
  }
}

// Edit user
exports.edit = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('user/edit-user', { rows });
    } else {
      console.log(err);
    }
  });
}


// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  // User the connection
  connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.render('user/edit-user', { rows, alert: `${first_name} has been updated.` });
        } else {
          console.log(err);
        }
       });
    } else {
      console.log(err);
    }
   });
}


exports.statusupdate = (req , res) =>{
  connection.query('UPDATE user SET status = ? WHERE id = ?', ['i', req.params.id], (err, rows) => {
    if (!err) {
      res.redirect('/user');
    } else {
      console.log(err);
    }
  })

}
// Delete User
exports.delete = (req, res) => {
  
  // User the connection
  connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

    if(!err) {
      res.redirect('/user');
    } 
    else 
    {
      console.log(err);
    }
   });

}

// View Users
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('user/view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}