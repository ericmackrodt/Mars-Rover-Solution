//rover-tests.js

var sut;

module("Mars Rover", {
	setup: function () {
		sut = new Rover();
	},
	teardown: function() {
		sut = null;
	}
});

test("Get default Position", function() {
	var result = sut.getCurrentPos();
	equal(result.direction, 'N', "Direction");
	equal(result.x, 0, "X");
	equal(result.y, 0, "Y");
});

test("Set Initial Position in constructor", function() {
	sut = new Rover(1, 3, 'S');
	var result = sut.getCurrentPos();
	equal(result.direction, 'S', "Direction");
	equal(result.x, 1, "X");
	equal(result.y, 3, "Y");
});

test("Set Initial Position", function() {
	sut.setInitialPos(1, 3, 'S');
	var result = sut.getCurrentPos();
	equal(result.direction, 'S', "Direction");
	equal(result.x, 1, "X");
	equal(result.y, 3, "Y");
});

test("Turn left", function() {
	sut.turnLeft();
	var result = sut.getCurrentPos();
	equal(result.direction, 'W', "Direction");
	equal(result.x, 0, "X");
	equal(result.y, 0, "Y");
});

test("Turn right", function() {
	sut.turnRight();
	var result = sut.getCurrentPos();
	equal(result.direction, 'E', "Direction");
	equal(result.x, 0, "X");
	equal(result.y, 0, "Y");
});

test("Turn 180 degrees right", function() {
	sut.turnRight();
	sut.turnRight();
	var result = sut.getCurrentPos();
	equal(result.direction, 'S', "Direction");
	equal(result.x, 0, "X");
	equal(result.y, 0, "Y");
});

test("Turn 180 degrees left", function() {
	sut.turnLeft();
	sut.turnLeft();
	var result = sut.getCurrentPos();
	equal(result.direction, 'S', "Direction");
	equal(result.x, 0, "X");
	equal(result.y, 0, "Y");
});

test("Turn 270 degrees right", function() {
	sut.turnRight();
	sut.turnRight();
	sut.turnRight();
	var result = sut.getCurrentPos();
	equal(result.direction, 'W', "Direction");
	equal(result.x, 0, "X");
	equal(result.y, 0, "Y");
});

test("Turn 270 degrees Left", function() {
	sut.turnLeft();
	sut.turnLeft();
	sut.turnLeft();
	var result = sut.getCurrentPos();
	equal(result.direction, 'E', "Direction");
	equal(result.x, 0, "X");
	equal(result.y, 0, "Y");
});

test("Move once with default values", function() {
	sut.move();
	var result = sut.getCurrentPos();
	equal(result.direction, 'N', "Direction");
	equal(result.x, 0, "X");
	equal(result.y, 1, "Y");
});

test("Turn east and move once", function() {
	sut.turnRight();
	sut.move();
	var result = sut.getCurrentPos();
	equal(result.direction, 'E', "Direction");
	equal(result.x, 1, "X");
	equal(result.y, 0, "Y");
});

test("Turn west and move once", function() {
	sut.turnLeft();
	sut.move();
	var result = sut.getCurrentPos();
	equal(result.direction, 'W', "Direction");
	equal(result.x, -1, "X");
	equal(result.y, 0,"Y");
});

test("Turn south and move once", function() {
	sut.turnRight();
	sut.turnRight();
	sut.move();
	var result = sut.getCurrentPos();
	equal(result.direction, 'S', "Direction");
	equal(result.x, 0, "X");
	equal(result.y, -1, "Y");
});

test("Zig zag to top-right", function() {
	sut.turnRight();
	sut.move();
	sut.turnLeft();
	sut.move();
	sut.turnRight();
	sut.move();
	sut.turnLeft();
	sut.move();
	sut.turnRight();
	sut.move();
	sut.turnLeft();
	sut.move();
	sut.turnRight();
	sut.move();
	sut.turnLeft();
	sut.move();

	var result = sut.getCurrentPos();

	equal(result.direction, 'N', "Direction");
	equal(result.x, 4, "X");
	equal(result.y, 4, "Y");
});

test("Zig zag to bottom-left", function() {
	sut.setInitialPos(4, 4, 'S');

	sut.turnRight();
	sut.move();
	sut.turnLeft();
	sut.move();
	sut.turnRight();
	sut.move();
	sut.turnLeft();
	sut.move();
	sut.turnRight();
	sut.move();
	sut.turnLeft();
	sut.move();
	sut.turnRight();
	sut.move();
	sut.turnLeft();
	sut.move();

	var result = sut.getCurrentPos();

	equal(result.direction, 'S', "Direction");
	equal(result.x, 0, "X");
	equal(result.y, 0, "Y");
});

test("Shouldn't exceed boundries moving north", function() {
	sut.setBoundries({ x: 3, y: 3 });
	sut.move();
	sut.move();
	sut.move();
	sut.move();
	sut.move();

	var result = sut.getCurrentPos();

	equal(result.direction, 'N', "Direction");
	equal(result.x, 0, "X");
	equal(result.y, 3, "Y");
});

test("Shouldn't exceed boundries moving south", function() {
	sut.setBoundries({ x: 3, y: 3 });
	sut.turnRight();
	sut.turnRight();
	sut.move();
	sut.move();
	sut.move();
	sut.move();
	sut.move();

	var result = sut.getCurrentPos();

	equal(result.direction, 'S', "Direction");
	equal(result.x, 0, "X");
	equal(result.y, 0, "Y");
});

test("Shouldn't exceed boundries moving east", function() {
	sut.setBoundries({ x: 3, y: 3 });
	sut.turnRight();
	sut.move();
	sut.move();
	sut.move();
	sut.move();
	sut.move();

	var result = sut.getCurrentPos();

	equal(result.direction, 'E', "Direction");
	equal(result.x, 3, "X");
	equal(result.y, 0, "Y");
});

test("Shouldn't exceed boundries moving west", function() {
	sut.setBoundries({ x: 3, y: 3 });
	sut.turnLeft();
	sut.move();
	sut.move();
	sut.move();
	sut.move();
	sut.move();

	var result = sut.getCurrentPos();

	equal(result.direction, 'W', "Direction");
	equal(result.x, 0, "X");
	equal(result.y, 0, "Y");
});

test("Instantiate rover setting initial position by string", function() {
	sut = new Rover('4 5 W');
	var result = sut.getCurrentPos();
	equal(result.direction, 'W', "Direction");
	equal(result.x, 4, "X");
	equal(result.y, 5, "Y");
});

test("Set initial position by string", function() {
	sut.setInitialPosByString('4 5 W');
	var result = sut.getCurrentPos();
	equal(result.direction, 'W', "Direction");
	equal(result.x, 4, "X");
	equal(result.y, 5, "Y");
});

test("Get current position as string", function() {
	sut = new Rover(5, 6, 'W');
	var result = sut.getCurrentPos().toString();

	equal(result, '5 6 W', "Coordinates");
});

test("Turn left by string", function() {
	sut.input('L');
	var result = sut.getCurrentPos().toString();
	equal(result, '0 0 W', "Coordinates");
});

test("Turn right by string", function() {
	sut.input('R');
	var result = sut.getCurrentPos().toString();
	equal(result, '0 0 E', "Coordinates");
});

test("Turn 180 degrees right by string", function() {
	sut.input('RR');
	var result = sut.getCurrentPos().toString();
	equal(result, '0 0 S', "Coordinates");
});

test("Turn 180 degrees left by string", function() {
	sut.input('LL');
	var result = sut.getCurrentPos().toString();
	equal(result, '0 0 S', "Coordinates");
});

test("Turn 270 degrees right by string", function() {
	sut.input('RRR');
	var result = sut.getCurrentPos().toString();
	equal(result, '0 0 W', "Coordinates");
});

test("Turn 270 degrees Left by string", function() {
	sut.input('LLL');
	var result = sut.getCurrentPos().toString();
	equal(result, '0 0 E', "Coordinates");
});

test("Move once with default values by string", function() {
	sut.input('M');
	var result = sut.getCurrentPos().toString();
	equal(result, '0 1 N', "Coordinates");
});

test("Turn east and move once by sring", function() {
	sut.input('RM');
	var result = sut.getCurrentPos().toString();
	equal(result, '1 0 E', "Coordinates");
});

test("Turn west and move once by string", function() {
	sut.input('LM');
	var result = sut.getCurrentPos().toString();
	equal(result, '-1 0 W', "Coordinates");
});

test("Turn south and move once by string", function() {
	sut.input('RRM');
	var result = sut.getCurrentPos().toString();
	equal(result, '0 -1 S', "Coordinates");
});

test("Zig zag to top-right by string", function() {
	sut.input('RMLMRMLMRMLMRMLM');
	var result = sut.getCurrentPos().toString();
	equal(result, '4 4 N', "Coordinates");
});

test("Zig zag to bottom-left by string", function() {
	sut = new Rover('4 4 S');
	sut.input('RMLMRMLMRMLMRMLM')
	var result = sut.getCurrentPos().toString();
	equal(result, '0 0 S', "Coordinates");
});

test("Shouldn't exceed boundries moving north by string", function() {
	sut.setBoundriesByString('3 3');
	sut.input('MMMMM');
	var result = sut.getCurrentPos().toString();
	equal(result, '0 3 N', "Coordinates");
});

test("Shouldn't exceed boundries moving south by string", function() {
	sut.setBoundriesByString('3 3');
	sut.input('RRMMMMM');
	var result = sut.getCurrentPos().toString();
	equal(result, '0 0 S', "Coordinates");
});

test("Shouldn't exceed boundries moving east by string", function() {
	sut.setBoundriesByString('3 3');
	sut.input('RMMMMM');
	var result = sut.getCurrentPos().toString();
	equal(result, '3 0 E', "Coordinates");
});

test("Shouldn't exceed boundries moving west by string", function() {
	sut.setBoundriesByString('3 3');
	sut.input('LMMMMM');
	var result = sut.getCurrentPos().toString();
	equal(result, '0 0 W', "Coordinates");
});