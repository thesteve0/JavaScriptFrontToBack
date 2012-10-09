/*   Set up the MongoDB instance
    @jfreeman
 */

var mongodb = require('mongodb');
var dbServer = new mongodb.Server(process.env.OPENSHIFT_NOSQL_DB_HOST, parseInt(process.env.OPENSHIFT_NOSQL_DB_PORT));
var db = new mongodb.Db(process.env.OPENSHIFT_APP_NAME, dbServer, {auto_reconnect: true});
var dbUser = process.env.OPENSHIFT_NOSQL_DB_USERNAME;
var dbPass = process.env.OPENSHIFT_NOSQL_DB_PASSWORD;

exports.init = function() {
    console.log('>>Initializing ...');
    //initialize the database
    db.open( function(err, db) {
        console.log('>>Opening DB ...');
        if (!err) {
            console.log('>>DB open');
            console.log('>>Authenticating ...');
            db.authenticate(dbUser, dbPass, function(err, result) {
                if (!err) {
                    console.log('>>Authenticated');
                    console.log('>>Dropping old addresses collection...');
                
                    //testing
                    //db.stats(function(err, items){
                    //      console.log( items);
                    //});
                
                    // drop the collection if it exists
                    db.dropCollection('addresses', function(err, result){
                        if (!err) {
                           console.log('>> Collection dropped');
                        }
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
                            db.close();
                        });
                    });
                }
                else {
                    console.log('authentication error');
                    console.log(err);
                    db.close();
                }
            });
        }
        else {
            console.log('db open error');
            console.log(err);
        }
    });
};
