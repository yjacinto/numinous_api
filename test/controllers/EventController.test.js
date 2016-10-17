var url = 'http://localhost:1337/';
var request = require('supertest')(url);
var expect = require('chai').expect;
//var should = require('chai').should();

//tests if the endtime is before starttime, it should fail
describe("event", function(){
  describe("#create()", function() {
    it("should fail to create an event", function (done) {
      var req = request.post("event/create");
      req.send({
        name : "Visit the Park ",
        startTime: "09-17-2016",
        endTime: "09-15-2016",
        trip: "1"
      })
      .set('Accept','application/json')
      .expect(400)
      .end(function (err, res) {
        if(err) return done(err);
        done();
      });
    });
  });

  describe("#create()", function() {
    it("should be able to create an event", function (done) {
      var req = request.post("event/create");
      req.send({
        name : "Visit the Park ",
        startTime: "10-17-2016",
        endTime: "10-18-2016",
        trip: "1"
      })
        .set('Accept','application/json')
        .expect(200)
        .end(function (err, res) {
          if(err) return done(err);
          done();
        });
    });
  });
})

