fs		=	require 'fs'
http	= require 'http'
sys		=	require 'sys'
path	=	require 'path'
io		=	require 'socket.io'

exports.LocalManager = class LocalManager
	constructor: (port_number) ->
		@devices = []
		local_man_server = http.createServer (request, response) -> 
			response.writeHead 200, {'Content-Type': 'text/html'}
			response.end 'Hello from Pervasive Local Manager'
		local_man_server.listen port_number
		
		@device_socket = io.listen local_man_server
		@device_socket.on 'connection', (device) -> 
			@devices.push device
			device.on('message', (msg) -> sys.puts "new message from device:  #{msg}")
			
			device.on('disconnect', -> 
			device_pos = @devices.indexOf(device)
			@devices.splice(pos, 1) is pos not -1
			sys.puts "A device has disconnected"
			)
			
		receiveResource: (resource) ->
			resource_file_path = path.join __dirname, '../../resources/', resource.file_name
			fs.readFile resource_file_path, 'utf8', (err, file_content) -> 
				if not err
					device.send {res:file_content} for device in @devices