//broadcaster-tests.js

module("Broadcaster", {
	setup: function () {
		
	},
	teardown: function() {
		broadcaster.clear();
	}
});

test('Subscribe', function() {
	var id = broadcaster.subscribe('test', function() {});
	var subscription = broadcaster.getSubscription('test', id);
	var count = broadcaster.channelsCount();
	equal(count, 1, 'Channels');
	notEqual(subscription, undefined, 'Subscription exists');
});

test('Subscriptions on multiple channels', function() {
	var id1 = broadcaster.subscribe('test1', function() {});
	var id2 = broadcaster.subscribe('test2', function() {});
	var count = broadcaster.channelsCount();
	var sub1 = broadcaster.getSubscription('test1', id1);
	var sub2 = broadcaster.getSubscription('test2', id2);
	equal(count, 2, 'Channels');
	notEqual(sub1, undefined, 'Subscription 1 exists');
	notEqual(sub2, undefined, 'Subscription 2 exists');
});

test('Multiple Subscriptions on same channel', function() {
	var id1 = broadcaster.subscribe('test', function() {});
	var id2 = broadcaster.subscribe('test', function() {});
	var count = broadcaster.channelsCount();
	var sub1 = broadcaster.getSubscription('test', id1);
	var sub2 = broadcaster.getSubscription('test', id2);
	equal(count, 1, 'Channels');
	notEqual(sub1, undefined, 'Subscription 1 exists');
	notEqual(sub2, undefined, 'Subscription 2 exists');
});

test('Multiple Subscriptions on multiple channel', function() {
	var id1 = broadcaster.subscribe('test1', function() {});
	var id2 = broadcaster.subscribe('test1', function() {});
	var id3 = broadcaster.subscribe('test2', function() {});
	var id4 = broadcaster.subscribe('test2', function() {});
	var count = broadcaster.channelsCount();
	var sub1 = broadcaster.getSubscription('test1', id1);
	var sub2 = broadcaster.getSubscription('test1', id2);
	var sub3 = broadcaster.getSubscription('test2', id3);
	var sub4 = broadcaster.getSubscription('test2', id4);
	equal(count, 2, 'Channels');
	notEqual(sub1, undefined, 'Subscription 1 exists');
	notEqual(sub2, undefined, 'Subscription 2 exists');
	notEqual(sub3, undefined, 'Subscription 3 exists');
	notEqual(sub4, undefined, 'Subscription 4 exists');
});

test('Broadcast a message', function() {
	var message = 'message';
	var result;

	broadcaster.subscribe('test', function(msg) {
		result = msg;
	});

	broadcaster.broadcast('test', message);

	equal(result, message, 'message');
});

test('Broadcast to multiple Subscriptions', function() {
	var message = 'message';
	var resultOne;
	var resultTwo;

	broadcaster.subscribe('test', function(msg) {
		resultOne = msg;
	});

	broadcaster.subscribe('test', function(msg) {
		resultTwo = msg;
	});

	broadcaster.broadcast('test', message);

	equal(resultOne, message, 'message');
	equal(resultTwo, message, 'message');
});

test('Broadcast to only one channel', function() {
	var message = 'message';
	var resultOne;
	var resultTwo;

	broadcaster.subscribe('test1', function(msg) {
		resultOne = msg;
	});

	broadcaster.subscribe('test2', function(msg) {
		resultTwo = msg;
	});

	broadcaster.broadcast('test1', message);

	equal(resultOne, message, 'message');
	equal(resultTwo, undefined, 'message');
});

test('Broadcast to only one channel with multiple Subscriptions', function() {
	var message = 'message';
	var resultOne;
	var resultTwo;
	var resultThree;
	var resultFour;

	broadcaster.subscribe('test1', function(msg) {
		resultOne = msg;
	});

	broadcaster.subscribe('test1', function(msg) {
		resultTwo = msg;
	});

	broadcaster.subscribe('test2', function(msg) {
		resultThree = msg;
	});

	broadcaster.subscribe('test2', function(msg) {
		resultFour = msg;
	});

	broadcaster.broadcast('test1', message);

	equal(resultOne, message, 'message1');
	equal(resultTwo, message, 'message2');
	equal(resultThree, undefined, 'message3');
	equal(resultFour, undefined, 'message4');
});

test('Broadcast different messages to different channels with multiple Subscriptions', function() {
	var message1 = 'message1';
	var message2 = 'message2'
	var resultOne;
	var resultTwo;
	var resultThree;
	var resultFour;

	broadcaster.subscribe('test1', function(msg) {
		resultOne = msg;
	});

	broadcaster.subscribe('test1', function(msg) {
		resultTwo = msg;
	});

	broadcaster.subscribe('test2', function(msg) {
		resultThree = msg;
	});

	broadcaster.subscribe('test2', function(msg) {
		resultFour = msg;
	});

	broadcaster.broadcast('test1', message1);
	broadcaster.broadcast('test2', message2);

	equal(resultOne, message1, 'message1');
	equal(resultTwo, message1, 'message2');
	equal(resultThree, message2, 'message3');
	equal(resultFour, message2, 'message4');
});