const request = require("supertest");
const app = require("../server.js");
const mongoose = require("mongoose");
const server = "http://localhost:3000";
const expect = require("expect");
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

// testing login
describe('testing login', () => {

  describe('POST /api/login', () => {
    let postBody = {
      email: 'ianflynn@gmail.com',
      password: '123'
    }


    it("should log in a user", () => {
      request(app)
      .post('/api/login')
      .send(postBody)
      .expect
    })
  })
})









// describe('GET /api/getMatches', () => {
//   it('should return an array', async () => {
//     const res = await request(app).get('/api/getMatches')
//     expect(Array.isArray(res.body.allMatches)).toBe(true)
   
//   })
// })

xdescribe("GET /api/getMatches", function () {
    it("is an array", function (done) {
      request(app)
        .get("/api/getMatches")
        .expect("Content-Type", /application\/json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(typeof res.body).toBe("string")
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
