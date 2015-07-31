var buttonStart = document.getElementById('start'),
    buttonTutorial = document.getElementById('tutorial'),
    buttonBack = document.getElementById('back'),
    div = document.getElementById('main'),
    newDiv = document.createElement('div'),
    container = document.getElementsByClassName('toShowOnStart')[0],
    canvas = document.getElementsByClassName('toShowOnStart')[1],
    dice = document.getElementById('diceall'),
    content = document.getElementById('content'),
    main = document.getElementById('main');

//
//function startGame() {
//    document.body.appendChild(newDiv);
//    newDiv.id = 'withCanvas';
//    newDiv.innerHTML = '<canvas id="canvas" width="1700" height="1100"></canvas>';
//    catanEngine.init(GUI, catanFactory).run();
//};
//
////remove only one button
////function hideShow() {
////    document.getElementById('Start button').style.display = 'block';
////    this.style.display = 'none'
////}
//
//function removeText() {
//    div.parentNode.removeChild(div);
//}
//

//
//function removeBackground() {
//    document.getElementById('body').style.background = 'none';
//}

function showContent() {
    content.style.display = 'block';
    main.style.display = 'none';
}

function getBack() {
    content.style.display = 'none';
    main.style.display = 'block';
}

function start() {
    dice.style.display = 'block';
    canvas.style.display = 'block';
    container.style.display = 'block';
    document.body.removeChild(main);
    document.getElementById('canvas').style.width = screen.availWidth / 4 + 'px';
    catanEngine.init(GUI, catanFactory);
    catanEngine.run();
}
//buttonStart.addEventListener('click', startGame, false);
//buttonStart.addEventListener('click', hideShow, false);
// buttonStart.addEventListener('click', removeText, false);
// buttonStart.addEventListener('click', removeBackground, false);
buttonTutorial.addEventListener('click', showContent, false);
buttonBack.addEventListener('click', getBack, false);
