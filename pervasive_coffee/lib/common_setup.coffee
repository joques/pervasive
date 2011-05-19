Queue						=	require('./queue').Queue
CentralManager	=	require('./central_manager').CentralManager

exports.createQueue = (topic) -> new Queue topic

exports.createCentralManager = -> new CentralManager()