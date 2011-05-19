exports.CentralManager = class CentralManager
	constructor: -> 
		@queues = []
		
	addQueue: (queue) -> @queues.push queue
	
	dispatchResource: (resource) ->
		console.log("resource: topics #{resource.topics} and file name #{resource.file_name}")
		queue.receiveResource resource for queue in @queues