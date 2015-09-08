//wrappers.js

//Mars Rover Input Area
(function () {
	var textarea = document.getElementById('txtInput');
	var inputButton = document.getElementById('btnRun');

	textarea.value = '5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM';

	inputButton.onclick = function () {
		var input = textarea.value;
		broadcaster.broadcast('rover-input', input);
	};			
}) ();

//Mars Rover Output Area
(function () {
	var resultArea = document.getElementById('resultArea');
	var resultText = resultArea.childNodes[0];

	broadcaster.subscribe('rover-output', function(msg) {
		resultArea.innerHTML = msg.replace(/\n/g, '<br />');
	});
}) ();

//Rover Ronner wrapper for subscriber
(function () {
	var roverRunner = new RoverRunner();

	function run(input) {
		var result = roverRunner.input(input);
		broadcaster.broadcast('rover-output', result);
	}

	broadcaster.subscribe('rover-input', run);
}) ();