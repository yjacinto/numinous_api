var url = 'http://localhost:1337/';
var request = require('supertest')(url);
var expect = require('chai').expect;
var should = require('chai').should();

describe("trip", function(){
  it("create a new trip", function(done){
    var req = request.post("trip/create");
    req.send({
        originCity : "Seattle",
        destinationCity : "Dallas",
        startDate: "10-17-2016",
        endDate: "10-18-2016"
    });
    req.set("Accept", "application/json");
    req.expect(200);
    req.end(function(err,res){
      if(err) {
        throw err;
      }
      //expect(res.body.name).to.equal("");
      done();
    });
  });

})

