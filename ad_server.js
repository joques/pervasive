var sys							=	require('sys');
var http						=	require('http');
var Resource				=	require('./vendor/resource').Resource;
var Queue						=	require('./vendor/queue').Queue;
var LocalManager		=	require('./vendor/local_manager').LocalManager;
var CentralManager	=	require('./vendor/central_manager').CentralManager;
var Device					=	require('./vendor/device').Device;

var ports = [3356, 3358, 3360, 3362, 3364, 3366 ];		

// create six local managers
var local_men = new Array(6);
for (var k = 0; k < 6; k++) {
	local_men[k] = new LocalManager(ports[k]);
}

// create four queues
var queue1 = new Queue("energy");
queue1.addLocalManager(local_men[0]);
queue1.addLocalManager(local_men[1]);

var queue2 = new Queue("transportation");
queue2.addLocalManager(local_men[2]);
queue2.addLocalManager(local_men[3]);

var queue3 = new Queue("computer");
queue3.addLocalManager(local_men[4]);
queue3.addLocalManager(local_men[5]);

var queue4 = new Queue("entertainment");
queue4.addLocalManager(local_men[1]);
queue4.addLocalManager(local_men[3]);
queue4.addLocalManager(local_men[5]);


device_names = ["Timbuktu", "Gao", "Jos", "Mombassa", "Harare", "Cairo"];

var devices = new Array(6);
for (var l = 0; l < 6; l++) {	
	devices[l] = new Device(device_names[l], ports[l]);
	devices[l].setBehavior(devices[l]);
	devices[l].connect();
}


// create the central manager
var commander = new CentralManager();
commander.addQueue(queue1);
commander.addQueue(queue2);
commander.addQueue(queue3);
commander.addQueue(queue4);


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