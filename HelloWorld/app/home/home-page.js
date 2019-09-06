/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

const HomeViewModel = require("./home-view-model");

var bluetooth = require("nativescript-bluetooth");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new HomeViewModel();
}

exports.onNavigatingTo = onNavigatingTo;

function startScan(args) {
    bluetooth.startScanning({
	  serviceUUIDs: [],
	  seconds: 4,
	  onDiscovered: function (peripheral) {
	  	console.log(peripheral);
	  }
	}).then(function() {
	  console.log("scanning complete");
	}, function (err) {
	  console.log("error while scanning: " + err);
	});
}

exports.startScan = startScan;

function connectCode(args) {
	bluetooth.connect({
	  UUID: 'CB381F14-74FD-A932-060C-B9A34BA14437',
	  onConnected: function (peripheral) {
	  	console.log("Periperhal connected with UUID: " + peripheral.UUID);

	  	// the peripheral object now has a list of available services:
	  	peripheral.services.forEach(function(service) {
	  	  console.log("service found: " + JSON.stringify(service));
	   });
	  },
	  onDisconnected: function (peripheral) {
	  	console.log("Periperhal disconnected with UUID: " + peripheral.UUID);
	  }
	});
}

exports.connectCode = connectCode;

function writeCode(args) {
	bluetooth.write({
	  peripheralUUID: 'E4423A51-D9BD-A01D-BA76-59335C25A391',
	  serviceUUID: '19B10000-E8F2-537E-4F6C-D104768A1214',
	  characteristicUUID: '19B10001-E8F2-537E-4F6C-D104768A1214',
	  value: '0x01' // a hex 1
	}).then(function(result) {
	  console.log("value written");
	}, function (err) {
	  console.log("write error: " + err);
	});
}

exports.writeCode = writeCode;

function turnOff(args) {
	bluetooth.write({
	  peripheralUUID: 'E4423A51-D9BD-A01D-BA76-59335C25A391',
	  serviceUUID: '19B10000-E8F2-537E-4F6C-D104768A1214',
	  characteristicUUID: '19B10001-E8F2-537E-4F6C-D104768A1214',
	  value: '0x00' // a hex 1
	}).then(function(result) {
	  console.log("value written");
	}, function (err) {
	  console.log("write error: " + err);
	});
}

exports.turnOff = turnOff;