//rover-runner.js
var RoverRunner = (function(inputData) {
	var gridSize = { x: 0, y: 0 };
	var rovers = [];

	function getRoversResults() {
		var results = [];
		for (var i in rovers) {
			results.push(rovers[i].getCurrentPos().toString());
		}
		return results.join('\n');
	}

	function setGridSize(x, y) {
		gridSize.x = x;
		gridSize.y = y;
	}

	this.input = function(str) {
		rovers = [];
		var instructions = str.split('\n');
		var grid = instructions[0].split(' ');
		setGridSize(parseInt(grid[0]), parseInt(grid[1]));

		var currentRover;
		for (var i = 1; i < instructions.length; i++) {
			//if line is odd (as the first line is the grid size), instantiate new rover, otherwise send input
			if (i % 2) {
				currentRover = new Rover(instructions[i]);
				currentRover.setBoundriesByString(instructions[0]);
				rovers.push(currentRover);
			} else {
				currentRover.input(instructions[i]);
			}
		};

		return getRoversResults();
	};

	this.getRovers = function() {
		return rovers;
	};

	this.getGridSize = function() {
		return gridSize;
	};

	this.getRoversPositions = function() {
		return getRoversResults();
	};
});