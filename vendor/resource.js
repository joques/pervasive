exports.Resource = Resource;

function Resource() {
	this.topics = new Array();
	this.file_name = "";
}

Resource.prototype.addTopic = function addTopic(topic) {
	this.topics.push(topic);
};

Resource.prototype.addFileName = function addFileName(file_name) {
	this.file_name = file_name;
};