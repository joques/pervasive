sys							=	require 'sys'
http						=	require 'http'
Resource				=	require('./lib/resource').Resource
setup						=	require('./lib/setup_ws')

commander = setup.createManager()

# this server handles POST request

server = http.createServer (req,res) ->
	res.writeHead 200, {'Content-Type': 'text/html'}
	reqData = ""
	req.addListener 'data', (data) ->
		reqData += data.toString()
	.addListener 'end', ->
		resource = process_resource reqData
		commander.dispatchResource resource
		res.end "New ad received!"
.listen(8080)


process_resource = (resource_data) ->
	res_parts = resource_data.split("&")
	current_resource = new Resource()
	
	console.log("res_parts = #{res_parts} size = #{res_parts.length}")
	
	num = res_parts.length
	num -= 1
	
	fill_resource(current_resource, res_parts[num--]) while num >= 0
	current_resource
	
fill_resource = (resource, data_part) ->
	if data_part.match(/^topic=/i)
		console.log("case topic")
		topic_part = data_part.replace(/^topic=/i, "")
		resource.addTopic topic_part
	else if data_part.match(/^file_name=/i)
		console.log("case file name")
		fname_part = data_part.replace(/^file_name=/i, "")
		resource.addFileName fname_part
		
	resource