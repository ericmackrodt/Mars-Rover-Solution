//roverRunner-tests.js

var sut;

module("Rover Runner", {
	setup: function () {
		sut = new RoverRunner();
	},
	teardown: function() {
		sut = null;
	}
});

test('Get grid size', function() {
	sut.input('4 3');
	var result = sut.getGridSize();
	equal(result.x, 4, 'X');
	equal(result.y, 3, 'Y');
});

test('Instantiate a rover', function() {
	sut.input('5 5\n1 2 N');
	var result = sut.getRovers();
	equal(result.length, 1, "Correct amount");
});

test('Instantiate a rover and move it', function() {
	var result = sut.input('5 5\n1 2 N\nRMRMLMM');
	equal(result, '4 1 E', 'Coordinates');
});

test('Get rover Coordinates', function() {
	sut.input('5 5\n1 2 N\nRMRMLMM');
	var result = sut.getRoversPositions();
	equal(result, '4 1 E', 'Coordinates');
});

test('Instantiate two rovers and move them', function() {
	var result = sut.input('5 5\n1 2 N\nRMRMLMM\n2 3 E\nRMRMLMM');
	equal(result, '4 1 E\n1 0 S', 'Coordinates');
});

test('Exercise user case', function() {
	var result = sut.input('5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM');
	equal(result, '1 3 N\n5 1 E', 'Coordinates');
});