let mongoose = require('mongoose');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let verifyToken = require('../models/user/verifyToken');
let expect = require('expect.js');
const { createLogger, format, transports } = require('winston');
const logger = createLogger({
  format: format.combine(
    format.splat(),
    format.simple()
  ),
  transports: [new transports.Console()]
});

chai.use(chaiHttp);

let assert = require('assert');

describe('Feature', () => {
  let token
    before( done => {
      token = chai.request(app)
      .post('/api/v1/users/create')
      .send({username: 'test', password: 'secret'})
      .then( (res) => {  });

      done();
    });
  describe('/POST create json patch', () => {
    it('should create a json patch from json object', (done) => {
        let obj = {
            "baz": "qux",
            "foo": "bar"
        };
        let patch = [
            { "op": "replace", "path": "/baz", "value": "boo" }
        ];
        
        let data = {json_object: obj, json_patch: patch};
    
        patch_obj = {"baz": "boo", "foo": "bar"};

        
        chai.request(app)
        .post('/api/v1/users/login')
        .send({username: 'test', password: 'secret'})
        .then( (res) => {
          token = res.body.token;
          chai.request(app)
          .post('/api/v1/patch/create')
          .set({'x-access-token': token})
          .send(data)        
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('reply').eql("JSON Object was patched successfully!")
            done();
          });
        }).catch( err => { logger.log({level: 'error', message: err}); done(); });
      
    });
  });

  describe('/POST create thumbnail', () => {
    it('should generate a 50x50 image form another public image', (done) => {
        url = "https://speedysms.com.ng/web/images/logo.png";

        chai.request(app)
        .post('/api/v1/users/login')
        .send({username: 'test', password: 'secret'})
        .then( (res) => {
          token = res.body.token;
            chai.request(app)
              .post('/api/v1/thumbnail/create')
              set({'x-access-token': token})
              .send({image_url: url})
              .end( (err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql(false);
                res.body.should.have.property('reply').eql('Image converted successfully');
                res.body.should.have.property('thumbnail');
                done();
              });
            }).catch( err => {logger.log({level: 'error', message: err}); done(); });
    });
  });

  
});