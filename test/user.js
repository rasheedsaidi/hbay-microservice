let mongoose = require('mongoose');
let User = require('../models/user/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

let assert = require('assert');
describe('User', () => {
  beforeEach( done => {
    User.remove({}, (err) => {
      done();
    })
  });
  describe('/POST create user', () => {
    it('should create a new user and return success', (done) => {
      let user = {username: 'admin', password: 'secret'};
      chai.request(app)
        .post('/api/v1/users/create')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('reply').eql('User was saved successfully!');
          //res.should.have.property('text').contains("");
          done();
        });
    });
  });

  describe('/POST login user', () => {
    it('should authenticate a user with a valid credential', (done) => {
      let login = {username: 'admin', password: 'secret'};

      chai.request(app)
        .post('/api/v1/users/login')
        .send(login)
        .end( (err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('false');
          res.body.should.have.property('reply').eql('Login successful');
          done();
        })
    });
  })
});