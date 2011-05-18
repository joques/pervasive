exports.CentralManager = class CentralManager
	constructor: -> 
		@queues = []
		
	addQueue: (queue) -> @queues.push queue
	
	dispatchResource: (resource) -> 
		queue.receiveResource resource for queue in @queues