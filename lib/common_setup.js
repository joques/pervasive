var Queue						=	require('./queue').Queue;
var CentralManager	=	require('./central_manager').CentralManager;

exports.createQueue = function(topic) {
	return new Queue(topic);
};

exports.createCentralManager = function() {
	return new CentralManager();
};
