# This version of the local manager uses a tcp connection to communicate with the devices
# The devices are just represented by tcp connections to the app.

fs		=	require 'fs';
net		=	require 'net';
sys		=	require 'sys';
path	=	require 'path';


exports.LocalManagerTCP = class LocalManagerTCP
	constructor: (port_number) -> 
		@devices = []
		@manager_server = net.createServer((socket) ->
			@devices.push socket
			socket.write "Hello\r\n"
			socket.on('end', -> 
			pos = @devices.indexOf(socket);
			@devices.splice(pos, 1) if pos not -1
			))
			@server_manager.listen port_number, "localhost"
			
		receiveResource: (resource) ->
			resource_file_path = path.join __dirname, '../../resources', resource.file_name
			rs = fs.createReadStream resource_file_path
			sys.pump(rs, device, (err) -> throw err) for device in @devices