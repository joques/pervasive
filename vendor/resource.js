exports.Resource = Resource;

Resource = (function() {
	function Resource() {
		this.topics = new Array;
		this.file_name = "";
	}
	
	Resource.prototype.addTopic = function(topic) {
		this.topics.push(topic);
	};
	
	Resource.prototype.addFileName = function(file_name) {
		this.file_name = file_name;
	};
	
	return Resource;
})();