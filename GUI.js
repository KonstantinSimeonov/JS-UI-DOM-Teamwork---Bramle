var GUI = function () {

	var CONSTANTS = {
		fieldStartingPoint: { x: 500, y: 40 },
		resourceTypes: ['wood', 'sheep', 'grain', 'rocks', 'clay', 'none'],
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
				resourceHand: 'images/player resource hand.jpg',
			},
			styles: {
				fontStyles: {
					playerName: '20px Verdana',
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
			},
			townSpots: [
				{ x: 860, y: 56, tiles: [0] },
				{ x: 1082, y: 56, tiles: [1] },
				{ x: 1302, y: 56, tiles: [2] },
				{ x: 752, y: 119, tiles: [0] },
				{ x: 971, y: 248, tiles: [0, 1, 5] },
				{ x: 1193, y: 246, tiles: [1, 4, 5] },
				{ x: 1412, y: 245, tiles: [2, 6] },
				{ x: 641, y: 311, tiles: [3] },
				{ x: 858, y: 309, tiles: [0, 3, 4] },
				{ x: 1082, y: 311, tiles: [1, 4, 5] },
				{ x: 1304, y: 311, tiles: [2, 5, 6] },
				{ x: 639, y: 440, tiles: [3, 7] },
				{ x: 858, y: 437, tiles: [3, 4, 8] },
				{ x: 1080, y: 440, tiles: [5, 6, 9] },
				{ x: 1304, y: 437, tiles: [6, 7, 10] },
				{ x: 1526, y: 440, tiles: [7, 11] },
				{x:531, y:630 , tiles:[7]}
			]
		},
		canvas: {
			id: 'canvas',
			context: '2d'
		}
	};

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

		tileMetrics = { h: images['rocks'].height, w: images['rocks'].width };

		rowOffsetX = [tileMetrics.w * 2, tileMetrics.w * 1.5, tileMetrics.w * 1, tileMetrics.w * 1.5, tileMetrics.w * 2];
		
		// TODO: implement field animations here

		for (i = 0, len1 = fieldLayout.length; i < len1; i += 1) {
			for (j = 0, len2 = fieldLayout[i].length; j < len2; j += 1) {
				self.context.drawImage(images[fieldLayout[i][j].resource], rowOffsetX[i] + j * tileMetrics.w + 300, (i + 0.25) * (tileMetrics.h / 1.33333));
				self.context.fillStyle = 'white';
				self.context.font = CONSTANTS.playerUI.styles.fontStyles.tileNumber;
				self.context.fillText(fieldLayout[i][j].id.toString(), 300 + rowOffsetX[i] + j * tileMetrics.w + tileMetrics.w / 2.5, (i + 0.25) * (tileMetrics.h / 1.33333) + tileMetrics.h / 1.75);
			}
		}
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
		self.context.fillText('Player ' + playerNumber, startingPoint.x, startingPoint.y);

		resourceHand = new Image();
		resourceHand.src = CONSTANTS.playerUI.imagePaths.resourceHand;
		
		// draw resource hand
		
		handOffset = CONSTANTS.playerUI.coordinates.cardsOffset;
		self.context.drawImage(resourceHand, startingPoint.x + handOffset.x, startingPoint.y + handOffset.y);

		buttonsOffset = {
			x: startingPoint.x + handOffset.x,
			y: startingPoint.y + handOffset.y + resourceHand.height + 40
		};
		console.log(buttonsOffset.y);
		// draw buttons
		
		self.context.fillText(controlNames.tradeButton, buttonsOffset.x, buttonsOffset.y);
		self.context.fillText(controlNames.buildButton, buttonsOffset.x + 100, buttonsOffset.y);
		self.context.fillText(controlNames.rollButton, buttonsOffset.x + 200, buttonsOffset.y);

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
			self.context.fillText(player.resources[CONSTANTS.resourceTypes[i]], currentOffsetX + startingPoint.x + handOffset.x + currentOffsetX, startingPoint.y + handOffset.y + tooltipOffsetY[i]);
			currentOffsetX += 35;

		}

		self.context.scale(1 / scale.x, 1 / scale.y);

	}

	return {
		init: function () {

			var self = this;

			self.canvas = document.getElementById(CONSTANTS.canvas.id);
			self.context = self.canvas.getContext(CONSTANTS.canvas.context);

			// 70 412 
			// 193 406 
			// 351 406
			
			self.buttonCoordinates = {
				isClicked: function (clientX, clientY) {
					console.log(clientX, clientY);
					if (clientY > 380 && clientY < 420) {

						if (clientX > 20 && clientX < 115) {
							return 'Trade';
						}

						if (clientX > 170 && clientX < 250) {
							return 'Build';
						}

						if (clientX > 330 && clientX < 390) {
							return 'Roll';
						}
					}
				}
			};

			return self;
		},
		drawField: function (fieldLayout) {

			fillField.call(this, fieldLayout);
		},
		drawTownAt: function (x, y) {
			var img = new Image();
			img.src = 'images/redvillage.png';
			this.context.scale(1.3, 1.3);
			this.context.drawImage(img, x / 1.3, y / 1.3);
			this.context.scale(1 / 1.3, 1 / 1.3);
		},
		drawPlayerGUI: function (players, playerTurn) {

			var playersArray = [players.red, players.blue, players.green, players.yellow],
				coords = CONSTANTS.playerUI.circularCoordinates,
				gui = this;

			for (var i = 0; i < 4; i += 1) {
				var scale = i === 0 ? { x: 1.5, y: 1.3 } : { x: 0.5, y: 0.5 };
				fillPlayerInterface.call(gui, playersArray[playerTurn - 1], coords[i], playerTurn++, scale);
				playerTurn %= 5;
				if (playerTurn === 0) {
					playerTurn += 1;
				}
			}
			
			// playersArray.map(function (player) {
			// 	var scale = currentPlayerNumber === 1 ? { x: 1.5, y: 1.3 } : { x: 0.5, y: 0.5 };
			// 	fillPlayerInterface.call(gui, playersArray[currentPlayerNumber - 1], coords[currentPlayerNumber - 1], currentPlayerNumber++, scale);
			// 	currentPlayerNumber%=5;
			// });
		},
		clickedInsideTownArea: function (e) {
			
			function isInside(e, range) {
				var x = e.x - range.x;
				var y = e.y - range.y;
				var sqrt = Math.sqrt(x * x + y * y);
				console.log(sqrt);
				return (sqrt < 50);
			}
			
			var result = false;
			
			CONSTANTS.playerUI.townSpots.map(function (townSpot){
				if(isInside({x: e.clientX, y: e.clientY}, townSpot)) {
					result = true;
				}
			});
			
			return result;
		},
		animateDice: function (dice1, dice2) {
			// Stefcho gledai tuk!
		}
	};

} ();