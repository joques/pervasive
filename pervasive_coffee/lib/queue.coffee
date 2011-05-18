exports.Queue = class Queue
	constructor: (topic) ->
		@topic = topic
		@local_managers = []
		
	addLocalManager: (local_manager) -> @local_managers.push local_manager
	
	# only process the resource if the topic belongs to one of the resource topics
	receiveResource: (resource) ->
		if @topic in resource.topics
			 l_manager.receiveResource resource for l_manager in @local_managers