var buttonStart = document.getElementById('start'),
    buttonTutorial = document.getElementById('tutorial'),
    buttonBack = document.getElementById('back'),
    div = document.getElementById('main'),
    newDiv = document.createElement('div');


function startGame() {
    document.body.appendChild(newDiv);
    newDiv.id = 'withCanvas';
    newDiv.innerHTML = '<canvas id="canvas" width="1700" height="1100"></canvas>';
    catanEngine.init(GUI, catanFactory).run();
};

//remove only one button
//function hideShow() {
//    document.getElementById('Start button').style.display = 'block';
//    this.style.display = 'none'
//}

function removeText() {
    div.parentNode.removeChild(div) ;
}

function showContent() {
    document.getElementById('content').style.display = 'block';
    document.getElementById('main').style.display = 'none';
}

function getBack() {
    document.getElementById('content').style.display = 'none';
    document.getElementById('main').style.display = 'block';
}

function removeBackground() {
    document.getElementById('body').style.background = 'none';
}

buttonStart.addEventListener('click', startGame, false);
//buttonStart.addEventListener('click', hideShow, false);
buttonStart.addEventListener('click', removeText, false);
buttonStart.addEventListener('click', removeBackground, false);
buttonTutorial.addEventListener('click', showContent, false);
buttonBack.addEventListener('click', getBack, false);
