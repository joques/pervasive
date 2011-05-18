var sys							=	require('sys');
var http						=	require('http');
var Resource				=	require('./vendor/resource').Resource;
var setup						=	require('./vendor/setup_tcp');

var commander = setup.createManager();

// this server handles POST request
var server = http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	
	// this should be a request object, which handles the params
	var reqData = "";
	
	req.addListener('data', function(data) {
		reqData += data.toString();
	}).addListener('end', function() {
		process_resource(reqData);
		res.end("New ad received!");
	});	
});

server.listen(8080);

function process_resource(resource_data) {
	
	// First, extract the different parts of the request
	var res_parts = resource_data.split("&");
	
	var cur_res = new Resource();
	
	// add parameters to the resource
	for (var m in res_parts) {
		if (res_parts[m].match(/^topic=/i)) {
			var topic_part = res_parts[m].replace(/^topic=/i, "");
			cur_res.addTopic(topic_part);
		}

		if (res_parts[m].match(/^file_name=/i)) {
			var fname_part = res_parts[m].replace(/^file_name=/i, "");
			cur_res.addFileName(fname_part);
		}		
	}
	
	commander.dispatchResource(cur_res);
}