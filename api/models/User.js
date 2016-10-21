/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: 'true',
	connection: 'mysql', //edwin you might need to change to mysql
	tableName: 'user',

  attributes: {
      email : {type : 'string', required : true},
      password : {type : 'string', required : true}
  },
   autoCreatedAt: true,

};

