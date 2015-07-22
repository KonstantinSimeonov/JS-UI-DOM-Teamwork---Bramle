// function drawField() {
// 	
// 	function drawLine(start, end, context) {
// 		
// 		context.moveTo(start.x, start.y);
// 		context.lineTo(end.x, end.y);
// 		context.lineWidth = 3;
// 		context.stroke();
// 	}
// 	
// 	function drawHexagon(start, length, context){
// 		
// 		var currentStart = start,
// 			currentEnd = {};
// 			
// 		currentEnd.x = currentStart.x + length;
// 		currentEnd.y = currentStart.y;
// 		
// 		context.beginPath();
// 		drawLine(currentStart, currentEnd, context);
// 		for (var i = 1; i < 6; i+=1) {
// 			
// 			currentStart.x = currentEnd.x;
// 			currentStart.y = currentEnd.y;
// 			currentEnd.x = currentEnd.x + Math.cos(60* i * Math.PI/180) * length;
// 			currentEnd.y = currentEnd.y + Math.sin(60 * i * Math.PI/180) * length;
// 			drawLine(currentStart, currentEnd, context);
// 			console.log(currentStart, currentEnd);
// 			
// 		}
// 	}
// 	
// 	function getHexagonSideLength(canvas) {
// 		var height = canvas.height * 0.5;
// 		var padding = window.screen.availHeight * 0.1;
// 		
// 		var hexagonSideLength = Math.sqrt(height*height/(2 + Math.cos(180 * 120 / Math.PI)));
// 		
// 		return hexagonSideLength;
// 	}
// 	
// 	var canv = document.getElementById('gamefield'),
// 		context = canv.getContext('2d');
// 	
// 	var side = getHexagonSideLength(canv);
// 	
// 	// drawHexagon({x: 100, y:40}, 30, context);
// 	// drawHexagon({x: 100, y:92}, 30, context);
// 	// drawHexagon({x: 145, y:66}, 30, context);
// 	
// 	var point = {x: 200, y: 40};
// 	
// 	//drawHexagon(point, side, context);
// 	
// 	context.scale(0.5, 0.5);
// 	
// 	var img = new Image();
// 	img.src = 'images/rocks.png';
// 	var neshtosi = (canv.width + 2 * img.width)/2;
// 	context.drawImage(img, (canv.width + 2 * img.width)/2, 60);
// 	context.drawImage(img, neshtosi + img.width + 2, 60);
// 	
// }

var GUI = function () {

	var CONSTANTS = {
		fieldStartingPoint: { x: 300, y: 50 },
		resourceTypes: ['wood', 'sheep', 'grain', 'rocks', 'clay', 'none']
	};

	function fillField(fieldLayout) {
		var images = {},
			tileMetrics,
			rowOffsetX;

		for (var i = 0; i < CONSTANTS.resourceTypes.length; i += 1) {
			images[CONSTANTS.resourceTypes[i]] = new Image();
			images[CONSTANTS.resourceTypes[i]].src = 'images/' + CONSTANTS.resourceTypes[i] + '.png';
		}

		tileMetrics = { h: images['rocks'].height, w: images['rocks'].width };

		rowOffsetX = [tileMetrics.w * 2, tileMetrics.w * 1.5, tileMetrics.w * 1, tileMetrics.w * 1.5, tileMetrics.w * 2];
		
		// TODO: implement field animations here
		
		for (var i = 0, len1 = fieldLayout.length; i < len1; i += 1) {
			for (var j = 0, len2 = fieldLayout[i].length; j < len2; j += 1) {
				this.context.drawImage(images[fieldLayout[i][j].resource], rowOffsetX[i] + j * tileMetrics.w, (i + 0.25) * (tileMetrics.h / 1.33333));
			}
		}
	}

	function fillPlayerInterface(players) {
		var redPlayer = { color: 'red', startingPoint: { x: 10, y: 20 } },
			yUpdate = 30;

		this.context.font = '20px Verdana';
		this.context.fillStyle = 'red';
		this.context.fillText('Red Player', redPlayer.startingPoint.x, redPlayer.startingPoint.y);

		this.context.font = '14px Times New Roman';
		this.context.fillStyle = 'black';

		for (var i = 0, len = CONSTANTS.resourceTypes.length, keys = CONSTANTS.resourceTypes; i < len; i += 1) {
			if (keys[i] !== 'none') {
				this.context.fillText(keys[i] + ': ' + players.resources[keys[i]], 10, 20 + yUpdate);
				yUpdate += 20;
			}

		}

		document.body.appendChild(document.createElement('button'));
		var button = document.getElementsByTagName('button')[0];
		button.innerHTML = 'Building';
	}

	return {
		init: function () {
			console.log("gui init");
			this.canvas = document.getElementById('canvas');
			this.context = this.canvas.getContext('2d');
			return this;
		},
		drawField: function (fieldLayout) {
			fillField.call(this, fieldLayout);
		},
		drawPlayerGUI: function (players) {
			fillPlayerInterface.call(this, players);
		}
	};

} ();
