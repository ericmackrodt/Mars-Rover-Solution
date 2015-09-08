//rover.js
var Rover = (function(x, y, dir) {
	var xPos = 0;
	var yPos = 0;
	var direction = 'N';
	var boundries;

	//Constructor with all arguments
	function fullConstructor(x, y, dir) {
		xPos = x;
		yPos = y;
		direction = dir;
	}

	//Constructor that receives rover string
	function stringConstructor(str) {
		var data = str.split(' ');
		fullConstructor(parseInt(data[0]), parseInt(data[1]), data[2]);
	}

	function evaluateDirection(positions) {
		var hasBoundries = boundries != undefined || boundries != null;

		switch (direction) {
			case 'N':
				positions.north(hasBoundries ? boundries.y : null);
				break;
			case 'S':
				positions.south(hasBoundries ? 0 : null);
				break;
			case 'W':
				positions.west(hasBoundries ? 0 : null);
				break;
			case 'E':
				positions.east(hasBoundries ? boundries.x : null);
				break;
			default:
				break;
		};
	}

	this.setBoundries = function(b) {
		boundries = b;
	};

	this.setBoundriesByString = function(s) {
		var arr = s.split(' ');
		this.setBoundries({ x: parseInt(arr[0]), y: parseInt(arr[1]) });
	}

	this.getCurrentPos = function() {
		return {
			x: xPos,
			y: yPos,
			direction: direction,
			toString: function() {
				return [xPos, yPos, direction].join(' '); 
			}
		};
	};

	this.setInitialPos = fullConstructor;

	this.setInitialPosByString = stringConstructor;

	this.turnLeft = function() {
		evaluateDirection({
			north: function() { direction = 'W'; },
			west: function() { direction = 'S'; },
			south: function() { direction = 'E'; },
			east: function() { direction = 'N'; }
		});
	};

	this.turnRight = function() {
		evaluateDirection({
			north: function() { direction = 'E'; },
			east: function() { direction = 'S'; },
			south: function() { direction = 'W'; },
			west: function() { direction = 'N'; }
		});
	};

	this.move = function() {
		evaluateDirection({
			north: function(boundry) { 
				if (yPos < boundry || boundry == null)
					yPos++; 
			},
			east: function(boundry) { 
				if (xPos < boundry || boundry == null)
					xPos++; 
			},
			south: function(boundry) { 
				if (yPos > boundry || boundry == null)
					yPos--; 
			},
			west: function(boundry) { 
				if (xPos > boundry || boundry == null)
					xPos--; 
			}
		});	
	};

	this.input = function(str) {
		var moves = str.split('');
		for (var i in moves) {
			switch (moves[i]) {
				case 'L':
					this.turnLeft();
					break;
				case 'R':
					this.turnRight();
					break;
				case 'M':
					this.move();
					break;
				default:
					break;
			}
		}
	};

	//Determines which constructor should be used
	if (arguments.length == 1)
		stringConstructor(x);
	else if (arguments.length > 1)
		fullConstructor(x, y, dir);
});