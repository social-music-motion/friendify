const request = require('supertest');
const app = require('../server.js');
const mongoose = require('mongoose');
const server = 'http://localhost:8000';
const expect = require('expect');

// import { MongoMemoryServer } from "mongodb-memory-server";
// import { MongoClient } from "mongodb";

// let connection = MongoClient;
// let mongoServer = MongoMemoryServer;
// server route tests

// controller method tests

// first test accountController getMatches
// beforeEach(async () => {
//   await mongoose.connect(
//     "mongodb+srv://ian:lol@friendify.std6cyj.mongodb.net/?retryWrites=true&w=majority"
//   );
// });
// afterEach(async () => {
//   await mongoose.connection.close();
// });

describe('GET /testingroutes', function () {
  it('testing if our testing works', function (done) {
    request(app)
      .get('/testingroutes')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual('success');
        done();
      });
  });
});

// test signUp
xdescribe('POST /api/signup', () => {
  let newUser = {
    firstName: 'Jeb',
    lastName: 'Stone',
    email: 'jeb@jeb.com',
    password: '12345',
    gender: 'male',
  };
  it("should create a new user in the database and return user object with 'success'", async (done) => {
    request(app)
      .post('/api/signup')
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        //expect(resx.status).toEqual(200);
        expect(200);
        //done();
      })    //.catch("error");
  });
});

// testing login
xdescribe('testing login', () => {
  describe('POST /api/login', () => {
    let postBody = {
      email: 'ianflynn@gmail.com',
      password: '123',
    };
    xit('should log in a user', () => {
      //request(app).post('/api/login').send(postBody).expect;
    });
  });
});

describe('POST /api/signup async test', () => {
  let newUser = {
    firstName: 'Jeb',
    lastName: 'Stone',
    email: 'jebyjyfhjhj@jeb.com',
    password: '12345',
    gender: 'male',
  };
  it('should return success async test for sign up', async () => {
    await request(app)
      .post('/api/getMatches')
      .send(newUser)
      expect(200)
  });
});

xdescribe('GET /api/getMatches', function () {
  it('should return an array', function(done) {
    request(server)
      .get('/api/getMatches')
      // .expect('Content-Type', /application\/json/)
      .expect(200)
      
      .end((err, res) => {
        if (err) return done(err)
        // expect(res.body).toEqual('success');
        done();
      });
  });
});

xdescribe('GET /api/callback', () => {
  // let wrongString =
  //     'https://accounts.spotify.com/en/authorize?' +
  //     `client_id=${asdf}` +
  //     `&response_type=code` +
  //     `&scope=${scope}` +
  //     `&redirect_uri=${redirect_uri}` +
  //     `&show_dialog=true`;
  describe('should set clientId, clientSecret and redirectUri', () => {
    it('responds with 200 status code and redirects to signupform', () => {
      return request(server)
        .get('/api/callback')
        .expect(200);
    })
  })
})


describe('GET /api/callback', () => {
  beforeEach(done => {
    done();
  });

  afterEach(done => {
    if (typeof HttpManager._makeRequest.restore == 'function') {
      HttpManager._makeRequest.restore();
    }
    done();
  });

  test('should set clientId, clientSecret and redirectUri', () => {
    var credentials = {
      clientId: 'someClientId',
      clientSecret: 'someClientSecret',
      redirectUri: 'myRedirectUri',
      accessToken: 'mySuperNiceAccessToken',
    };

    var api = new SpotifyWebApi(credentials);

    expect(api.getCredentials().clientId).toBe(credentials.clientId);
    expect(api.getCredentials().clientSecret).toBe(credentials.clientSecret);
    expect(api.getCredentials().redirectUri).toBe(credentials.redirectUri);
    expect(api.getCredentials().accessToken).toBe(credentials.accessToken);
  
  });
})
  

xdescribe('/api/getMatches', () => {
  // this.timeout(10000)
  describe('GET', () => {
    // this.timeout(10000)
    it('respondes with 200 status and application/json content type', async (done) => {
      return request(app)
        .get('/api/getMatches')
        .expect('Content-Type', /application\/json/)
        .expect(200);
    })
  })
})


// some basic examples:
xdescribe('GET /user', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual('success');
        done();
      });
  });
});

xdescribe('GET /users', function () {
  it('responds with json', async function () {
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json');
    expect(response.headers['Content-Type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.email).toEqual('foo@bar.com');
  });
});
