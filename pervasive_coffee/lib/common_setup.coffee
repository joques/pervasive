Queue						=	require('./queue').Queue;
CentralManager	=	require('./central_manager').CentralManager;

exports.createQueue = function(topic) {
	new Queue topic
};

exports.createCentralManager = function() {
	new CentralManager
};
