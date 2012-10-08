// set up http server
// @jfreeman

var http = require('http');
var url = require('url');
var router = require('./router.js');

var self = this;

exports.init = function(mapping){
    var onRequest = function(request, response) {
        var urlobj = url.parse(request.url);
        var path = urlobj.pathname;
        var content;
        var postData = '';

        // get post data
        request.setEncoding("utf8");
        request.addListener("data", function(chunk) {
            postData += chunk;
        });
        request.addListener("end", function() {
            if(postData){
                postData = JSON.parse(postData);
            } else if (request.method == 'GET' && urlobj.query && urlobj.query.length > 1) {
                postData = JSON.parse(decodeURIComponent(urlobj.query)); 
            }
            content = router.route(mapping, path, response, postData, request.method);
        });

    }

    self.ipaddr = process.env.OPENSHIFT_INTERNAL_IP;
    self.port = parseInt(process.env.OPENSHIFT_INTERNAL_PORT);

    http.createServer(onRequest).listen(self.ipaddr, self.port);
    console.log('%s: Granny Node server started on %s:%d ...', Date(Date.now()), self.ipaddr, self.port);
};
