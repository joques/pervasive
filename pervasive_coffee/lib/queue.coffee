exports.Queue = class Queue
	constructor: (topic) ->
		@topic = topic
		@local_managers = []
		
	addLocalManager: (local_manager) ->
		 @local_managers.push local_manager
	
	# only process the resource if the topic belongs to one of the resource topics
	receiveResource: (resource) ->
		if @topic in resource.topics
			for l_manager in @local_managers
				do (l_manager) ->
					console.log("calling receiveResource on resource #{resource.file_name} with l_manager = #{l_manager}")
					l_manager.receiveResource resource