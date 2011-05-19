sys							=	require 'sys'
http						=	require 'http'
Resource				=	require('./lib/resource').Resource
setup						=	require './lib/setup_tcp'

commander = setup.createManager()

# this server handles POST request

server = http.createServer (req,res) ->
	res.writeHead 200, {'Content-Type': 'text/html'}
	reqData = ""
	reqData.addListener 'data', (data) ->
		reqData += data.toString()
	.addListener 'end', ->
		process_resource reqData
		res.end "New ad received!"
.listen(8080)


process_resource = (resource_data) ->
	res_parts = resource_data.split("&")
	current_resource = new Resource()
	
	for pos in [0..res_parts.length] 
		do if res_parts[pos].match(/^topic=/i)
				topic_part = res_parts[pos].replace(/^topic=/i, "")
				current_resource.addTopic topic_part
			if res_parts[pos].match(/^file_name=/i)
				fname_part = res_parts[pos].replace(/^file_name=/i, "")
				current_resource.addFileName fname_part
	commander.dispatchResource(cur_res);