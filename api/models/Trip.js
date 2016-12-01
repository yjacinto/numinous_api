/**
 * Trip.js
 *
 * @description :: Trip resents the trip from one destination to another.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    originCity:{
      type: 'string',
      size: 128,
      required: true
    },

    destinationCity:{
      type: 'string',
      size: 128,
      required: true
    },

    startDate: {
      type: 'date',
      required: false
    },

    endDate: {
      type: 'date',
      required: false
    },

    events:{
      collection: 'event',
      via: 'trip'
    },

    hotels:{
      collection:'hotel',
      via:'trip'
    },

    //user who created this trip
    /*user:{
      model: 'user'
    },*/

    /*travelCompanions:{
      model:'TravelCompanion',
      unique: true
    }*/

    travelers:{
      collection: 'user',
      via: 'trips'
    },

    //contains one chatroom per trip.
    chatroom:{
      collection:'chatroom',
      via: 'trip'
    }


  },

    beforeCreate: function(options, cb){
      //first check whether the end time is after the start time.
      TimeValidationService.startEndTimeValidate({
        start: options.startDate,
        end: options.endDate},
        function(err) {
          if (err) {
            return cb(err, false);
          }
        return cb(null, true);
      });
    },

    /*//after creating trip, create a chatroom and
    afterCreate: function(newTrip, cb){
      console.log('inside afterCreate');
      console.log(newTrip);
      User.findOne({id: newTrip.travelers.id}).exec(function(err, traveler){
        console.log('after traveler');
        traveler.trips.add(newTrip.id);
        traveler.save(function(err){
          if(err){ return res.serverError(err); }
          console.log('Created new traveler');
          ChatRoom.create({
            trip: newTrip.id
          }).exec(function(err, chatroom){
            if(err){ return cb(err, false); }
            console.log('created a new chatroom with the id of ' + chatroom.id);
            return cb(null, chatroom);
          });
        })
      });


    }*/

};

