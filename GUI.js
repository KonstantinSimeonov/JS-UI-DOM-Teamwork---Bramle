var GUI = function () {
	var CONSTANTS = {
		fieldStartingPoint: { x: 500, y: 40 },
		resourceTypes: ['clay', 'wood', 'sheep', 'grain', 'rocks', 'none'],
		playerUI: {
			coordinates: {
				red: { x: 10, y: 20 },
				blue: { x: 10, y: 800 },
				green: { x: 1300, y: 20 },
				yellow: { x: 1300, y: 800 },
				cardsOffset: { x: 0, y: 100 },
				buttonSpacing: { x: 20, y: 0 }
			},
			circularCoordinates: [
				{ x: 10, y: 20 },
				{ x: 100, y: 900 },
				{ x: 200, y: 1300 },
				{ x: 300, y: 1700 }
			],
			imagePaths: {
				resourceHand: 'images/resource hand transparent.png',
			},
			styles: {
				fontStyles: {
					playerName: '30px Verdana',
					tileNumber: '60px Verdana'
				},
				fontColors: ['red', 'blue', 'green', 'yellow']
			},
			controlls: {
				names: {
					tradeButton: 'Trade',
					buildButton: 'Build',
					rollButton: 'Roll',
					endTurn: 'End Turn'
				}
			}
		},
		canvas: {
			id: 'canvas',
			context: '2d'
		},
		// townSpots: [
		// 	{ x: 860, y: 56, tiles: [0] },
		// 	{ x: 1082, y: 56, tiles: [1] },
		// 	{ x: 1302, y: 56, tiles: [2] },
		// 	{ x: 752, y: 119, tiles: [0] },
		// 	{ x: 971, y: 248, tiles: [0, 1, 5] },
		// 	{ x: 1193, y: 246, tiles: [1, 4, 5] },
		// 	{ x: 1412, y: 245, tiles: [2, 6] },
		// 	{ x: 641, y: 311, tiles: [3] },
		// 	{ x: 858, y: 309, tiles: [0, 3, 4] },
		// 	{ x: 1082, y: 311, tiles: [1, 4, 5] },
		// 	{ x: 1304, y: 311, tiles: [2, 5, 6] },
		// 	{ x: 639, y: 440, tiles: [3, 7] },
		// 	{ x: 858, y: 437, tiles: [3, 4, 8] },
		// 	{ x: 1080, y: 440, tiles: [5, 6, 9] },
		// 	{ x: 1304, y: 437, tiles: [6, 7, 10] },
		// 	{ x: 1526, y: 440, tiles: [7, 11] },
		// 	{ x: 531, y: 630, tiles: [7] }
		// ],
		townCoordinates: [],
		roadCoordinates: []
	};
	var layer = new Kinetic.Layer()
	var stage = new Kinetic.Stage({
		container: 'container',
		width: screen.availWidth / 1.2,
		height: screen.availHeight
	});
	var fieldIsDrawn = false;
	var animate = function () {
		//var kopon = true;


		var animateFieldBlock = function animateFiledBlock(imageName, offsetX, offsetY, id, tile) {
			var img = new Image(),
				hexagon,
				period,
				anim,
				townCoordinateInfo,
				roadCoordinateInfo,
				magicNumber = -1,
				magicNumber2 = -1;

			var screenScale = 1275 / screen.availHeight;
			var widthScale = 2400 / screen.availWidth;
			var hexRadius = 105 / screenScale,
				xValue = ((offsetX / widthScale)) | 0,
				yValue = ((offsetY - 60) / screenScale) | 0;
				
			//if (kopon) {

			var pi = Math.PI / 3;
			for (var i = 0; i < 6; i += 1) {
				townCoordinateInfo = {
					x: xValue + (hexRadius + 10) * Math.sin(pi * i),
					y: yValue + (hexRadius + 10) * Math.cos(pi * i) + 30,
					tileAccess: [tile]
				};
				roadCoordinateInfo = {
					x: xValue + (hexRadius + 5) * Math.cos(pi * i) - 11,
					y: yValue + (hexRadius + 5) * Math.sin(pi * i) + 11,
					rotation: i + 1,
					tileAccess: [tile]
				};
				if (!CONSTANTS.townCoordinates.some(function (point) {
					magicNumber += 1;
					return (Math.abs(point.x - townCoordinateInfo.x) + Math.abs(point.y - townCoordinateInfo.y)) < 50;
				})) {
					CONSTANTS.townCoordinates.push(townCoordinateInfo);
				} else {
					//// console.log()
					CONSTANTS.townCoordinates[magicNumber].tileAccess.push(tile);
				}
				if (!CONSTANTS.roadCoordinates.some(function (point) {
					magicNumber2 += 1;
					return (Math.abs(point.x - roadCoordinateInfo.x) + Math.abs(point.y - roadCoordinateInfo.y)) < 50;
				})) {
					CONSTANTS.roadCoordinates.push(
						roadCoordinateInfo
						);
				} else {
					CONSTANTS.roadCoordinates[magicNumber2].tileAccess.push(tile);
				}
				magicNumber = -1;
				magicNumber2 = -1;

			}

			//kopon = false;
			//}


			img.src = 'images/' + imageName;
			hexagon = new Kinetic.RegularPolygon({
				x: offsetX / widthScale,
				y: offsetY / screenScale,
				sides: 6,
				radius: 105 / (screenScale),
				fillPatternImage: img,
				fillPatternOffset: { x: 110, y: 120 },
				stroke: 'nome'
			});
			period = 6000;

			layer.add(hexagon);
			stage.add(layer);

			var idToString = id.toString();

			var simpleText = new Kinetic.Text({
				x: (offsetX - 30 * idToString.length) / widthScale,
				y: (offsetY - 60) / screenScale,
				text: idToString,
				fontSize: 60,
				fontFamily: 'Calibri',
				fill: 'white',
				stroke: 'black',
				strokewidth: 2
			});

			anim = new Kinetic.Animation(function (frame) {
				var scale = Math.sin(frame.time * 2 * Math.PI / period) + 0.001;

				if (scale > 0.999999999) {
					anim.stop();
					layer.add(simpleText);

				}

				hexagon.scale({ x: scale, y: scale });
			}, layer);

			if (!fieldIsDrawn)
				anim.start();

		}

		return animateFieldBlock;

	} ();

	function fillField(fieldLayout) {

		var images = {},
			tileMetrics,
			rowOffsetX,
			len1,
			len2,
			i,
			j,
			self = this;

		for (i = 0; i < CONSTANTS.resourceTypes.length; i += 1) {
			images[CONSTANTS.resourceTypes[i]] = new Image();
			images[CONSTANTS.resourceTypes[i]].src = 'images/' + CONSTANTS.resourceTypes[i] + '.png';
		}
        //// console.log(images);
		tileMetrics = { h: 255, w: 221 };

        // // console.log(tileMetrics);

		rowOffsetX = [tileMetrics.w * 2, tileMetrics.w * 1.5, tileMetrics.w * 1, tileMetrics.w * 1.5, tileMetrics.w * 2];
        // // console.log(rowOffsetX);
		
		// TODO: implement field animations here
		var startingOffsetX = self.canvas.width;
		for (i = 0, len1 = fieldLayout.length; i < len1; i += 1) {
			for (j = 0, len2 = fieldLayout[i].length; j < len2; j += 1) {


				var imageName = fieldLayout[i][j].resource + '.png';

				animate(imageName, rowOffsetX[i] + j * tileMetrics.w + startingOffsetX, (i + 0.65) * (tileMetrics.h / 1.33333), fieldLayout[i][j].id, [i, j]);
				// self.context.drawImage(images[fieldLayout[i][j].resource], rowOffsetX[i] + j * tileMetrics.w + 300, (i + 0.25) * (tileMetrics.h / 1.33333));
				// self.context.fillStyle = 'white';
				// self.context.font = CONSTANTS.playerUI.styles.fontStyles.tileNumber;
				// self.context.fillText(fieldLayout[i][j].id.toString(), 300 + rowOffsetX[i] + j * tileMetrics.w + tileMetrics.w / 2.5, (i + 0.25) * (tileMetrics.h / 1.33333) + tileMetrics.h / 1.75);
			}
		}
		CONSTANTS.townCoordinates.map(function (x) {
			while (x.tileAccess.length < 3) {
				x.tileAccess.push([-1, -1]);
			}
		});
		fieldIsDrawn = true;
		//self.context.drawImage(images[fieldLayout[i][j].resource], rowOffsetX[i] + j * tileMetrics.w + 300, (i + 0.25) * (tileMetrics.h / 1.33333));
		// self.context.fillStyle = 'white';
		// self.context.font = CONSTANTS.playerUI.styles.fontStyles.tileNumber;
		// self.context.fillText(fieldLayout[i][j].id.toString(), 300 + rowOffsetX[i] + j * tileMetrics.w + tileMetrics.w / 2.5, (i + 0.25) * (tileMetrics.h / 1.33333) + tileMetrics.h / 1.75);
		
		// 		var gg = new Image();
		// 		gg.src = 'images/village.png';
		// 
		// 		CONSTANTS.townCoordinates.map(function (point) {
		// 			var selo = new Kinetic.Image({
		// 				x: point.x,
		// 				y: point.y,
		// 				image: gg,
		// 				width: gg.width,
		// 				height: gg.height
		// 			});
		// 
		// 			layer.add(selo);
		// 			stage.add(layer);
		// 		});

		// 			CONSTANTS.townCoordinates.map(function (point) {
		// 			var selo = new Kinetic.Circle({
		// 				x: point.x,
		// 				y: point.y,
		// 				radius: 20,
		// 				fill: 'white'
		// 			});
		// 
		// 			layer.add(selo);
		// 			stage.add(layer);
		// 		});

		// 		CONSTANTS.roadCoordinates.map(function (point) {
		// 			var selo = new Kinetic.Rect({
		// 				x: point.x,
		// 				y: point.y,
		// 				height: 40,
		// 				width: 20,
		// 				fill: 'white'
		// 			});
		// 
		// 			layer.add(selo);
		// 			stage.add(layer);
		// 		});
	
		// var road = new Image();
		// road.src = 'images/road.png';
		// CONSTANTS.roadCoordinates.map(function (point) {
		// 				var put = new Kinetic.Image({
		// 			x: point.x,
		// 			y: point.y,
		// 			image: road,
		// 			width: road.width,
		// 			height: road.height
		// 		});
		// 		layer.add(put);
		// 		stage.add(layer);
		// })
	}

	function fillPlayerInterface(player, startingPoint, playerNumber, scale) {

		var resourceHand,
			handOffset,
			buttonsOffset,
			styles = CONSTANTS.playerUI.styles,
			controlNames = CONSTANTS.playerUI.controlls.names,
			i,
			len,
			currentOffsetX,
			self = this;
			
		// draw names
		
		self.context.scale(scale.x, scale.y);

		self.context.font = styles.fontStyles.playerName;
		self.context.fillStyle = styles.fontColors[playerNumber - 1];
		self.context.strokeStyle = 'black';
		self.context.fillText('Player ' + (playerNumber), startingPoint.x, startingPoint.y + 10);
		self.context.strokeText('Player ' + (playerNumber), startingPoint.x, startingPoint.y + 10);
		self.context.fillText('Points: ' + player.points, startingPoint.x + 150, startingPoint.y + 10);
		self.context.strokeText('Points: ' + player.points, startingPoint.x + 150, startingPoint.y + 10);

		resourceHand = new Image();
		resourceHand.src = CONSTANTS.playerUI.imagePaths.resourceHand;
		
		// draw resource hand
		
		handOffset = CONSTANTS.playerUI.coordinates.cardsOffset;
		resourceHand.onload = function () {
			self.context.scale(scale.x, scale.y);
			self.context.drawImage(resourceHand, startingPoint.x + handOffset.x, startingPoint.y + handOffset.y)
			self.context.scale(1 / scale.x, 1 / scale.y);
		};
		// self.context.drawImage(resourceHand, startingPoint.x + handOffset.x, startingPoint.y + handOffset.y);
		// resourceHand.onload = function () {
		// 	self.context.drawImage(resourceHand, startingPoint.x + handOffset.x, startingPoint.y + handOffset.y);
		// };
		buttonsOffset = {
			x: startingPoint.x + handOffset.x + 40,
			y: startingPoint.y + handOffset.y + 180
		};
		
		// draw buttons
		
		self.context.fillText(controlNames.tradeButton, buttonsOffset.x, buttonsOffset.y);
		self.context.strokeText(controlNames.tradeButton, buttonsOffset.x, buttonsOffset.y);
		self.context.fillText(controlNames.buildButton, buttonsOffset.x + 100, buttonsOffset.y);
		self.context.strokeText(controlNames.buildButton, buttonsOffset.x + 100, buttonsOffset.y);
		self.context.fillText('End', buttonsOffset.x + 200, buttonsOffset.y);
		self.context.strokeText('End', buttonsOffset.x + 200, buttonsOffset.y);

		self.buttonCoordinates[playerNumber] = {
			Trade: {
				x: buttonsOffset.x - 20,
				y: buttonsOffset.y + 50
			},
			Build: {
				x: buttonsOffset.x + 100,
				y: buttonsOffset.y
			},
			Roll: {
				x: buttonsOffset.x + 200,

				y: buttonsOffset.y
			},
		};

		var tooltipOffsetY = [30, 0, -15, 0, 30];
		
		// draw resource values
		
		for (i = 0, len = CONSTANTS.resourceTypes.length - 1, currentOffsetX = 10; i < len; i += 1) {
			self.context.strokeStyle = 'black';
			self.context.fillText(player.resources[CONSTANTS.resourceTypes[i]], currentOffsetX + startingPoint.x + handOffset.x + currentOffsetX / 1.1, startingPoint.y + handOffset.y + tooltipOffsetY[i]);
			self.context.strokeText(player.resources[CONSTANTS.resourceTypes[i]], currentOffsetX + startingPoint.x + handOffset.x + currentOffsetX / 1.1, startingPoint.y + handOffset.y + tooltipOffsetY[i]);

			currentOffsetX += 35;

		}

		self.context.scale(1 / scale.x, 1 / scale.y);

	}

	return {
		init: function () {

			var self = this;

			self.canvas = document.getElementById(CONSTANTS.canvas.id);
			self.context = self.canvas.getContext(CONSTANTS.canvas.context);
			// // console.log(self.context.clearRect);
			// 70 412 
			// 193 406 
			// 351 406
			
			self.buttonCoordinates = {

			};

			return self;
		},
		getClickedCommand: function (clientX, clientY) {
			// // console.log(clientX, clientY);
			if (250 < clientY && clientY < 275) {

				if (55 < clientX && clientX < 145) {
					return 'Trade';
				}

				if (165 < clientX && clientX < 260) {
					return 'Build';
				}
				
				if(280 < clientX && clientX < 310) {
					return 'End';
				}
			}

			return 'none';
		},
		drawField: function (fieldLayout) {

			fillField.call(this, fieldLayout);
		},
		drawTownAt: function (spotIndex, playerNumber) {

			if (CONSTANTS.townCoordinates[spotIndex].buildOn) {
				return;
			}
			
			// // console.log(CONSTANTS.townCoordinates[spotIndex].tileAccess);
			
			CONSTANTS.townCoordinates[spotIndex].buildOn = true;
			// console.log(playerNumber);
			var img = new Image();
			img.src = 'images/towns/' + CONSTANTS.playerUI.styles.fontColors[playerNumber - 1] + 'village.png';
			// this.context.scale(1.3, 1.3);
			// this.context.drawImage(img, x / 1.3, y / 1.3);
			// this.context.scale(1 / 1.3, 1 / 1.3);
			
			img.onload = function () {
				var selo = new Kinetic.Image({
					x: CONSTANTS.townCoordinates[spotIndex].x - img.width / 2,
					y: CONSTANTS.townCoordinates[spotIndex].y - img.height / 2,
					image: img,
					width: img.width,
					height: img.height
				});

				layer.add(selo);
				stage.add(layer);
				// // console.log(stage);

			};
		},
		getTownCoordinatesAt: function (spotIndex) {
			return CONSTANTS.townCoordinates[spotIndex].tileAccess.slice();
		},
		getRoadCoordinatesAt: function (spotIndex) {
			return CONSTANTS.roadCoordinates[spotIndex].tileAccess.slice();
		},
		drawRoadAt: function (spotIndex, playerNumber) {

			if (CONSTANTS.roadCoordinates[spotIndex].builtOn) {
				return;
			}

			var img = new Image();
			img.src = 'images/roads/' + CONSTANTS.playerUI.styles.fontColors[playerNumber - 1] + '/' + CONSTANTS.roadCoordinates[spotIndex].rotation + '.png';
			// this.context.scale(1.3, 1.3);
			// this.context.drawImage(img, x / 1.3, y / 1.3);
			// this.context.scale(1 / 1.3, 1 / 1.3);
			var rotation = CONSTANTS.roadCoordinates[spotIndex].rotation;
			var offsetFix = ((rotation != 1) && (rotation != 4)) ? 30 : 0;

			CONSTANTS.roadCoordinates[spotIndex].builtOn = true;

			img.onload = function () {
				var selo = new Kinetic.Image({
					x: CONSTANTS.roadCoordinates[spotIndex].x - offsetFix,
					y: CONSTANTS.roadCoordinates[spotIndex].y,
					image: img,
					width: img.width / 1.5,
					height: img.height / 2
				});

				layer.add(selo);
				stage.add(layer);
				// // console.log(stage);

			};
		},
		drawPlayerGUI: function (players, playerTurn) {



			var playersArray = [players.red, players.blue, players.green, players.yellow],
				currentPlayerNumber = playerTurn,
				coords = CONSTANTS.playerUI.circularCoordinates,
				gui = this;
			gui.context.clearRect(0, 0, gui.canvas.width, gui.canvas.height);


			for (var i = 0; i < 4; i += 1) {
				var scale = i === 0 ? { x: 1.5, y: 1.3 } : { x: 0.5, y: 0.5 };
				fillPlayerInterface.call(gui, playersArray[playerTurn - 1], coords[i], playerTurn, scale);
				playerTurn += 1;
				playerTurn %= 5;
				if (playerTurn === 0) {
					playerTurn += 1;
				}
				// console.log(playerTurn);
			}
			
			// playersArray.map(function (player) {
			// 	var scale = currentPlayerNumber === 1 ? { x: 1.5, y: 1.3 } : { x: 0.5, y: 0.5 };
			// 	fillPlayerInterface.call(gui, playersArray[currentPlayerNumber - 1], coords[currentPlayerNumber - 1], currentPlayerNumber++, scale);
			// 	currentPlayerNumber%=5;
			// });
		},
		indexOfTownCoordinates: function (e) {

			function isInside(e, range) {
				var x = (e.x) - range.x;
				var y = (e.y) - range.y;
				var sqrt = Math.sqrt(x * x + y * y);
				//// console.log(sqrt);
				
				return sqrt < 20;
			}

			var notInside = -1;

			for (var i = 0, spots = CONSTANTS.townCoordinates, len = spots.length; i < len; i += 1) {
				if (isInside({ x: e.clientX, y: e.clientY }, spots[i])) {
					// // console.log('gosho ' + e.clientX +' '+  e.clientY);
					return i;
				}

			}

			return notInside;
		},
		indexOfRoadCoordinates: function (e) {

			function isInside(e, range) {
				var x = e.x - range.x;
				var y = e.y - range.y;

				return (0 <= x && x <= 20) && (0 <= y && y <= 40);
			}

			var notInside = -1;

			for (var i = 0, spots = CONSTANTS.roadCoordinates, len = spots.length; i < len; i += 1) {
				if (isInside({ x: e.clientX, y: e.clientY }, spots[i])) {
					// // console.log('gosho ' + e.clientX +' '+  e.clientY);
					return i;
				}

			}

			return notInside;
		}
	};
} ();