var socket = io.connect();

socket.on('news', function (data) {
	console.log(data.message);
});

$('#buttonOff').hide();

$("#buttonOn").on("click", function(e) {
	e.preventDefault();
	e.stopPropagation();
	console.log('LED ON');
	socket.emit('led:on');
	$('#buttonOn').toggle();
	$('#buttonOff').toggle();
});

$("#buttonOff").on("click", function(e) {
	e.preventDefault();
	e.stopPropagation();
	console.log('LED OFF');
	socket.emit('led:off');
	$('#buttonOn').toggle();
	$('#buttonOff').toggle();
});