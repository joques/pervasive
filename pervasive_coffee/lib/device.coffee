io	=	require('../../vendor/Socket.io-node-client/io-client').io
sys	=	require 'sys'

exports.Device = class Device
	constructor: (dev_name, port_number) ->
		@name = dev_name
		@socket = new io.Socket 'localhost', {port:port_number}
	
	setBehavior: ->
		name = @name
		self_socket = @socket
		@socket.on 'connect', ->
			sys.puts "Device #{name} is on!"
			self_socket.send "Hi! I am #{name}"
			
		@socket.on 'message', (data) ->
			msg = JSON.stringify data
			console.log "New data from manager #{msg}"
			
		
	connect: -> @socket.connect()