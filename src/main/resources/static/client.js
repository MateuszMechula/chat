var client = null;
var color;

function showMessage(value, user, userColor) {
    let newResponse = document.createElement('p');
    newResponse.style.color = userColor;
    newResponse.appendChild(document.createTextNode(user + ": "))
    newResponse.appendChild(document.createTextNode(value))
    let response = document.getElementById('messageWindow');
    response.appendChild(newResponse);
    console.log("new message:" + newResponse)
}

function connect() {
    client = Stomp.client(`ws://https://chat-2024-8bd98de6d104.herokuapp.com/chat`);
    color = getRandomColor();
    client.connect({}, function (frame) {
        client.subscribe("/topic/messages", function (message) {
            showMessage(JSON.parse(message.body).value, JSON.parse(message.body).user, JSON.parse(message.body).userColor);
        });
    });
}

function sendMessage() {
    let messageToSend = document.getElementById('messageToSend').value;
    let user = document.getElementById('user').value;
    client.send("/app/chat", {}, JSON.stringify({'value': messageToSend, 'user': user, 'userColor': color}))
    document.getElementById('messageToSend').value = '';
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}