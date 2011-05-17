var io	= require('./Socket.io-node-client/io-client').io;
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
			
			this.socket.on('message', function(msg) {
				sys.puts("New data from Local Server" + msg);
			});
		};
		
		Device.prototype.connect = function() {
			this.socket.connect();
		};
	}