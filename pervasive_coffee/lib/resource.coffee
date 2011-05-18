exports.Resource = class Resource
	constructor: -> 
		@topics = []
		@file_name = ""
		
	addTopic: (topic) -> @topics.push topic
		
	addFileName: (file_name) -> @file_name = file_name