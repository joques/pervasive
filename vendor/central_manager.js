exports.CentralManager = (function() {
	function CentralManager() {
		this.queues = [];
		
		CentralManager.prototype.addQueue = function addQueue(queue) {
			this.queues.push(queue);
		};

		CentralManager.prototype.dispatchResource = function dispatchResource(resource) {
			for (var i in this.queues) {
				this.queues[i].receiveResource(resource);
			}
		};
	}
	
	return CentralManager;	
})();