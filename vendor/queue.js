var sys = require("sys");

exports.Queue = Queue;

function Queue(topic) {
	this.topic = topic;
	this.l_managers = new Array();
}

Queue.prototype.addLocalManager = function addLocalManager(l_manager) {
	this.l_managers.push(l_manager);
};

Queue.prototype.receiveResource = function receiveResource(resource) {
	var res_topics = resource.topics;
	
	// only send the resource if it is related to the queue		
	if (res_topics.indexOf(this.topic) != -1) {
		for (var i in this.l_managers) {
			this.l_managers[i].receiveResource(resource);
			sys.puts("Just added resource " + resource.file_name);
		}
	}
};