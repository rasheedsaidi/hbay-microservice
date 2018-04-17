let bcrypt = require('bcryptjs');
let config = require('../../config');
let jwt = require('jsonwebtoken');

let User = require('./user');

let create = (req, res) => {
    let user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save( (err, auth) => {
        if(err) {
            res.send(err);
        } else {
            console.log(auth)
            res.send({reply: "User was saved successfully!", auth});
        }
        
    });
}

let authenticate = (req, res) => {
    if(!req.body) {
        res.send({error: true, reply: "Empty POST body"});
    }
    if(!req.body.username || !req.body.password) {
        res.send({error: true, reply: "Username and password must be supplied"});
    }
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if(err) {
            throw err;
        }

        if(!user) {
            res.send({error: true, reply: "Login failed. User not found"});
        } else {
            var isValid = bcrypt.compareSync(req.body.password, user.password);
            if (!isValid) {
                return res.status(401).send({ error: true, reply: "Login failed. Password is invalid", token: null });
            } else {
                let payload = {
                    username: user.username
                };
        
                var token = jwt.sign(payload, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
        
                res.send({
                    error: false,
                    reply: "Login successful",
                    token: token
                });
            }
        }

    });
}

module.exports = { create, authenticate };