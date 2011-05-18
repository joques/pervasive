var fs		=	require("fs");
var http	= require("http");
var sys		=	require("sys");
var path	=	require("path");
var io		=	require("socket.io");

exports.LocalManager = (function() {
	function LocalManager(port_number) {
		this.devices = [];
		var that = this;
		
		var local_man_server = http.createServer(function(request, response) {
			response.writeHead(200, {'Content-Type': 'text/html'}); 
		 	response.end('Hello world');
		});
		
		local_man_server.listen(port_number);
		var device_socket = io.listen(local_man_server);
		
		device_socket.on('connection', function(device) {
			that.devices.push(device);
			
			device.on('message', function(msg) {
				sys.puts("new message from device :: " + msg);
			})
			
			device.on('disconnect', function() {
				var pos_socket = that.devices.indexOf(device);
				if (pos_socket != -1) {
					that.devices.splice(pos_socket, 1);
					Sys.puts("A device has disconnected");
				}
			});
		});
						
		LocalManager.prototype.receiveResource = function receiveResource(resource) {
			var resource_file_name = resource.file_name;
			var resource_file_path =  path.join(__dirname, '../resources/', resource_file_name);
			
			fs.readFile(resource_file_path, 'utf8', function(err, file_content) {
				if (!err) {
					that.devices.forEach(function(device){
						// console.log("sending file to device ctn = " + file_content);
						// device.send(JSON.stringify({resource: file content}));
						device.send({res:file_content});
					});
				}
			});
		};
	}
	
	return LocalManager;	
	
})();