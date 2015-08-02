var static = require("node-static");

//
// Create a node-static server instance to serve the "./build" folder
//
var file = new static.Server("./dist", {
    cache: 0
});

require("http").createServer(function (request, response) {
    request.addListener("end", function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(9000);
