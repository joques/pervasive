io	=	require('../../vendor/Socket.io-node-client/io-client').io
sys	=	require 'sys'

exports.Device = class Device
	contructor: (name, port_number) ->
		@name = name
		@socket = io.socket 'localhost', {port: port_number}
		
		setBehavior: ->
			@socket.on('connect', -> 
			sys.puts "Device #{@name} is on!"
			@socket.send "Hi! I am #{@name}"
			)
			
			@socket.on('message', (data) -> 
			msg = JSON.stringify
			console.log "New data from manager #{msg}"
			)
			
		connect: -> @socket.connect()