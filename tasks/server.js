const static = require('node-static');

//
// Create a node-static server instance to serve the './public' folder
//
const file = new static.Server('./public');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(8080);

console.log('Server running on port 8080');