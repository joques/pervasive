sys							=	require 'sys'
http						=	require 'http'
Resource				=	require('./lib/resource').Resource
setup						=	require('./lib/setup_ws')

commander = setup.createManager()

# this server handles POST request

server = http.createServer((req, res) -> 
res.writeHead(200, {'Content-Type': 'text/html'})
# this should be a request object, which handles the params
reqData = ""
req.addListener('data', (data) -> reqData += data.toString()).addListener('end', -> 
process_resource(reqData)
res.end("New ad received!")
)
)

server.listen(8080)

process_resource = (resource_data) -> 
 # First, extract the different parts of the request
res_parts = resource_data.split("&")

cur_res = new Resource()

# add parameters to the resource
for (var m in res_parts) {
	if (res_parts[m].match(/^topic=/i)) {
		var topic_part = res_parts[m].replace(/^topic=/i, "");
		cur_res.addTopic(topic_part);
	}

	if (res_parts[m].match(/^file_name=/i)) {
		var fname_part = res_parts[m].replace(/^file_name=/i, "");
		cur_res.addFileName(fname_part);
	}		
}

commander.dispatchResource(cur_res);
