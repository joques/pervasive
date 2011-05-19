# This version of the local manager uses a tcp connection to communicate with the devices
# The devices are just represented by tcp connections to the app.

fs		=	require 'fs';
net		=	require 'net';
sys		=	require 'sys';
path	=	require 'path';


exports.LocalManagerTCP = class LocalManagerTCP
	constructor: (port_number) ->
		@devices = []
		
		# this is to avoid scoping issues
		self_devices = @devices
		
		@manager_server = net.createServer (socket) ->
			self_devices.push socket
			socket.write "Hello\r\n"
			socket.on 'end', ->
				pos = self_devices.indexOf(socket)
				self_devices.splice(pos,1) if pos not -1
		.listen port_number, "localhost"
			
		receiveResource: (resource) ->
			self_devices = @devices
			resource_file_path = path.join __dirname, '../../resources', resource.file_name
			rs = fs.createReadStream resource_file_path
			sys.pump rs, device, (err) ->
				throw err
			for device in self_devices