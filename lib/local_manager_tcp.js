// This version of the local manager uses a tcp connection to communicate with the devices
// The devices are just represented by tcp connections to the app.

var fs		=	require("fs");
var net		=	require("net");
var sys		=	require("sys");
var path	=	require("path");


exports.LocalManagerTCP = (function() {
	function LocalManagerTCP(port_number) {
		this.devices = [];
		var that = this;
		this.manager_server = net.createServer(function(socket) {
			that.devices.push(socket);

			socket.write('hello\r\n');
			socket.on('end', function() {
				that.devices.splice(that.devices.indexOf(socket), 1);
			});		
		}).listen(port_number, "localhost");		
		
		LocalManagerTCP.prototype.receiveResource = function receiveResource(resource) {
			var resource_file_name = resource.file_name;
			var resource_file_path =  path.join(__dirname, '../resources/', resource_file_name);
			var that = this;
			
			var rs = fs.createReadStream(resource_file_path);
			that.devices.forEach(function(device) {
				sys.pump(rs, device, function(err) {
					if (err) {
						throw err;
					}
				})
			});
		};
	}
	
	return LocalManagerTCP;	
	
})();