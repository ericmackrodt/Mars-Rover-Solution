//broadcaster.js
var broadcaster = (function () {
	var channels = {};
	var count = 0;

	function subscribe(channel, fn) {
		if (!channels[channel]) {
			channels[channel] = {};
		}

		var id = "id_" + (++count);

		channels[channel][id] = fn;

		return id;
	}

	function broadcast(channel, msg) {
		if (channels[channel]) {
			var sub = channels[channel];
			for (var id in sub) {
				sub[id](msg);
			}
		}
	}

	function clear() {
		channels = {};
		count = 0;
	}

	function getSubscription(channel, id) {
		return channels[channel][id];
	}

	function channelsCount() {
		var size = 0;
		for (var key in channels) {
			if (channels.hasOwnProperty(key)) size++;
		}
		return size;
	}

	return {
		subscribe: subscribe,
		broadcast: broadcast,
		clear: clear,
		getSubscription: getSubscription,
		channelsCount: channelsCount
	};
}) ();