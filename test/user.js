let mongoose = require('mongoose');
let User = require('../models/user/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let verifyToken = require('../models/user/verifyToken');
let expect = require('expect.js');

chai.use(chaiHttp);

let assert = require('assert');
describe('User', () => {
  before( done => {
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
          res.body.should.have.property('error').eql(false);
          res.body.should.have.property('reply').eql('Login successful');
          res.body.should.have.property('token');
          done();
        })
    });
  });

  describe('/verifyToken', () => {
    let mockReq = {
      headers:{} // your JWT here
    }
    res = {
      send: function(){ },
      json: function(err){
         
      },
      status: function(code) {
          $d = 'status${code}';
          // This next line makes it chainable
          return this; 
      }
    }
    let mockRes = {};
    mockRes.status = (code) => { return 'status${code}' };
    
    let nextCalled = false;
    let next = function(){nextCalled = true}
  
    it('should pass on right jwt',() => {
      mockReq.headers['JWT'] = 'testtoken'
      verifyToken(mockReq, res, next)
      expect(nextCalled).to.be.true;
    });
  });
});