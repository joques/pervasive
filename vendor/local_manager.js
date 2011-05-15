exports.LocalManager = LocalManager;
var fs = require("fs"),
		net = require("net");

LocalManager = (function() {
	function LocalManager(port_number) {
		this.devices = new Array();
		var that = this;
		this.manager_server = net.createServer(function(socket) {
			that.devices.push(socket);

			socket.write('hello\r\n');
			socket.on('end', function() {
				that.devices.splice(that.devices.indexOf(socket), 1);
			});		
		}).listen(port_number, "localhost");		
	}

	LocalManager.prototype.receiveResource = function receiveResource(resource) {
		var resource_file_name = resource.file_name;
		var that = this;

		fs.readFile(resource_file_name, function(err, buffer) {
			if (!err) {
				that.devices.forEach(function(device) {
					device.write(buffer);
				});
			}
		});
	};
	
	return LocalManager;	
	
})();