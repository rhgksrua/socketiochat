$(document).ready(function() {
    var socket = io();
    $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg) {
        $('#messages').append($('<li>').text(msg));
    });
    socket.on('user connection', function(msg) {
        $('#messages').append($('<li class="new-user">').text(msg));
    });

});
