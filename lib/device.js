var io	= require('../vendor/Socket.io-node-client/io-client').io;
var sys	=	require("sys");

exports.Device = function Device(name, port_number) {
		this.name = name;
		this.socket = new io.Socket('localhost', {port: port_number});
		that = this;
		
		Device.prototype.setBehavior = function(obj) {
			this.socket.on('connect', function() {
				sys.puts("Device " + obj.name + " is on! port = " + port_number);
				that.socket.send("Hi! am " + obj.name);
			});
			
			this.socket.on('message', function(data) {
				console.log("New data from Local Server" + JSON.stringify(data));
			});
		};
		
		Device.prototype.connect = function() {
			this.socket.connect();
		};
	}