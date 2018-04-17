let bcrypt = require('bcryptjs');

let User = require('./user');

let create = (req, res) => {
    let user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save( (err, auth) => {
        if(err) {
            res.send(err);
        }
        res.send({reply: "User was saved successfully!", auth});
    });
}

module.exports = { create };