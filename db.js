/*   Set up the MongoDB instance
    @jfreeman
 */

var mongo = require('mongodb'),
   
var self = this;

self.dbServer = new mongodb.Server(process.env.OPENSHIFT_NOSQL_DB_HOST, parseInt(process.env.OPENSHIFT_NOSQL_DB_PORT));
self.db = new mongodb.Db(process.env.OPENSHIFT_APP_NAME, self.dbServer, {auto_reconnect: true});
self.dbUser = process.env.OPENSHIFT_NOSQL_DB_USERNAME;
self.dbPass = process.env.OPENSHIFT_NOSQL_DB_PASSWORD;

exports.init = function() {

    //initialize the database
    db.open( function(err, db) {
            if(!err){
            console.log('>>DB open');
            console.log('>>Dropping old addresses collection...');
            // drop the collection if it exists
            db.dropCollection('addresses', function(err, result){
                console.log('>> Collection dropped');
                });
            // Get the collection set up, if not existing already
            db.createCollection('addresses', {safe:true}, function(err, collection){


                if(!err) {
                //do something
                console.log('>> Collection Created, DB ready for use');
                collection.insert({name:'Freeman, Jonathan', phone:'+1.919.321.0119', address:'345 West Main St, Durham, NC 27701', email:'info@osintegrators.com'}, {safe:true}, function( err, result) {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log('fake doc added');
                }
                });
                }
                else {
                    console.log('error');
                    console.log(err);
                }
                });
            }
        db.close();
    });
};
