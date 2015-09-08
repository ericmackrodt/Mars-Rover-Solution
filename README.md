Mars Rover solution
===================

Solution started being developed at 9/9 1:00AM.
This is the solution for the Mars Rover problem. It was developed using Java Script and the only external library used was QUnit for unit tests.

Assumptions
-----------
1. As it wasn't specified, I didn't treat exceptions.
2. I assumed that each rover would have it's turn on the plateau as the exercise didn't ask for collision treatment.

Explanation of the Solution:
============================

The project consists in two a few js files and two html files. The main two files are the rover.js, which contains the Rover class, and roverRunner.js, which is responsible for instantiating multiple rovers and sending them the inputs.
The Rover class can receive individual commands using the turnLeft(), turnRight() and move() functions as well as multiple commands in a row using the method input() that receives a string as parameter (eg: 'LRMMM').
I also created a little messaging library to keep the interface modular (broadcaster.js), it's very simple, just to show how it could be modularized in the future.

Explanation of the files:

1. index.html - the main file with a simple interface for the rovers' I/O.
2. tests.html - runs the tests using QUnit.
3. js/broadcaster.js (tests in js/tests/broadcaster-tests.js) - a very simple messaging lib to show how the app could be modular.
4. js/rover.js (tests in js/tests/rover-tests.js) - contains the rover class that is instantiated in the roverRunner, it has methods to interpret the input strings as well as methods to move the rover individualy as mentioned before.
5. js/roverRunner.js (tests in js/tests/roverRunner-tests.js) - is responsible for instantiating rovers and breaking down the messages in lines to feed them.
6. js/wrappers.js - this file connects the interface and the rover. The purpose is to show simple way in which the solution could be modular using the broadcaster.js. As the objects in this file are too small and simple, I didn't bother to write tests and put each one in its own file. 