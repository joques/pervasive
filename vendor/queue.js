exports.Queue = (function() {
	function Queue(topic) {
			this.topic = topic;
			this.l_managers = [];

			Queue.prototype.addLocalManager = function(l_manager) {
				this.l_managers.push(l_manager);
			};

			Queue.prototype.receiveResource = function(resource) {
				var res_topics = resource.topics;
				// only send the resource if it is related to the queue, 
				// i.e,. it has the queue's topic among its topics
				if (res_topics.indexOf(this.topic) != -1) {
					for (var i in this.l_managers) {
						this.l_managers[i].receiveResource(resource);
					}
				}
			};
		}
		return Queue;	
})();