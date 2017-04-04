var userModel = require('../models/users');

var users = {};

// controller that handles user login request
users.auth = function (req, res) {

	if(!req.body.username || !req.body.password)
	{
		res.status(400);
		res.send({status:'error',error:'Username or password is missing.', code:"InvalidUserNameOrPassword"});
	}

	var user = userModel.authUser(req.body.username, req.body.password);

	user.then(function(users){
		res.send(users);
	}, function(error){
		if(error.code === 'InvalidUserNameOrPassword'){
			res.status(400).send(error);
		}
		else {
      res.status(500).send({status: 'error', error: 'Error occured while fetching data from database.', code: 'DatabaseError'});
    }
	});

};

// controller that handles user logout request
users.logout = function (req, res) {

	var sessionId = req.query.sessionId;

	var user = userModel.logout(sessionId);

	res.send({status:'success'});


};


module.exports = users;
