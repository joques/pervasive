var LocalManager		=	require('./local_manager').LocalManager;
var Device					=	require('./device').Device;
var CS							=	require('./common_setup');

exports.createManager = function() {
	var ports = [3356, 3358, 3360, 3362, 3364, 3366 ];		

	// create six local managers
	var local_managers = new Array(6);
	for (var k = 0: k < 6; k++) {
		local_managers[k] = new LocalManager(ports[k]);
	}
	
	// Create the devices
	// Note that the port numbers are the bindings between devices and local managers
	
	var device_names = ["Timbuktu", "Gao", "Jos", "Mombassa", "Harare", "Cairo"];

	var devices = new Array(6);
	for (var l = 0; l < 6; l++) {	
		devices[l] = new Device(device_names[l], ports[l]);
		devices[l].setBehavior(devices[l]);
		devices[l].connect();
	}
	
	// Create several queues and bind them to Local Managers
	// We create four queues
	var queue1 = CS.createQueue("energy");
	queue1.addLocalManager(local_managers[0]);
	queue1.addLocalManager(local_managers[1]);

	var queue2 = CS.createQueue("transportation");
	queue2.addLocalManager(local_managers[2]);
	queue2.addLocalManager(local_managers[3]);

	var queue3 = CS.createQueue("computer");
	queue3.addLocalManager(local_managers[4]);
	queue3.addLocalManager(local_managers[5]);

	var queue4 = CS.createQueue("entertainment");
	queue4.addLocalManager(local_managers[1]);
	queue4.addLocalManager(local_managers[3]);
	queue4.addLocalManager(local_managers[5]);
	
	// Create the CentralManager and bind it to the queues
	
	//  return the CentralManager
	var commander = CS.createCentralManager();
	commander.addQueue(queue1);
	commander.addQueue(queue2);
	commander.addQueue(queue3);
	commander.addQueue(queue4);
	
	return commander;
};