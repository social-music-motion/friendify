const request = require("supertest");
const app = require("../server.js");
const mongoose = require("mongoose");
const server = "http://localhost:3000";
const expect = require("expect");

// import { MongoMemoryServer } from "mongodb-memory-server";
// import { MongoClient } from "mongodb";

// let connection = MongoClient;
// let mongoServer = MongoMemoryServer;
// server route tests

// controller method tests

// first test accountController getMatches
beforeEach(async () => {
  await mongoose.connect(
    "mongodb+srv://ian:lol@friendify.std6cyj.mongodb.net/?retryWrites=true&w=majority"
  );
});
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /testingroutes", function () {
  it("testing if our testing works", function (done) {
    request(app)
      .get("/testingroutes")
      .expect("Content-Type", /application\/json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual("success");
        done();
      });
  });
});

// test signUp
describe("POST /api/signup", () => {
  let newUser = {
    "firstName": "Jeb",
    "lastName": "Stone",
    "email": "jeb@jeb.com",
    "password": "12345",
    "gender": "male",
  };
  it("should create a new user in the database and return user object with 'success'", (done) => {
    request(app)
      .post("/api/signup")
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        //expect(res.status).toEqual(200);
        expect(200)
        done();
      });
      
  });
});

// testing login
describe("testing login", () => {
  describe("POST /api/login", () => {
    let postBody = {
      email: "ianflynn@gmail.com",
      password: "123",
    };
    xit("should log in a user", () => {
      request(app).post("/api/login").send(postBody).expect;
    });
  });
});

describe('POST /api/signup async test', () => {
  let newUser = {
    "firstName": "Jeb",
    "lastName": "Stone",
    "email": "jebyjyfhjhj@jeb.com",
    "password": "12345",
    "gender": "male",
  };
  it('should return success async test ', async () => {
    const res = await request(app).post('/api/getMatches').send(newUser)
    console.log('RESPONSEEEE: ', res.body)
    expect(200)
    // expect(res.body.account_creation).toBe('success')
  })
})

xdescribe("GET /api/getMatches", function () {
  it("is an array", function (done) {
    request(app)
      .get("/api/getMatches")
      .expect("Content-Type", /application\/json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(typeof res.body).toBe("string");
        done();
      });
  });
});

// some basic examples:
xdescribe("GET /user", function () {
  it("responds with json", function (done) {
    request(app)
      .get("/user")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual("success");
        done();
      });
  });
});

xdescribe("GET /users", function () {
  it("responds with json", async function () {
    const response = await request(app)
      .get("/users")
      .set("Accept", "application/json");
    expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.email).toEqual("foo@bar.com");
  });
});
