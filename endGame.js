function endGame(color) {


    //TODO sort players by points

    var body = document.getElementById('body'),
        winnerDiv;
    body.innerHTML = '<div id="winnerDiv">WINNER:<\/div>';
    winnerDiv = body.children[0];
winnerDiv.innerHTML += '<span id="winnerColor">'+color + ' player!' + '<\/span>';
    document.getElementById('winnerColor').style.color = color;
body.innerHTML += '<footer>Brumble&trade;</footer>';
}