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
		
		console.log(images);

		for (i = 0, len1 = fieldLayout.length; i < len1; i += 1) {
			for (j = 0, len2 = fieldLayout[i].length; j < len2; j += 1) {

				self.context.drawImage(images[fieldLayout[i][j].resource], rowOffsetX[i] + j * tileMetrics.w, (i + 0.25) * (tileMetrics.h / 1.33333));
				self.context.fillStyle = 'white';
				self.context.font = CONSTANTS.playerUI.styles.fontStyles.tileNumber;
				self.context.fillText(fieldLayout[i][j].id.toString(), rowOffsetX[i] + j * tileMetrics.w + tileMetrics.w / 2.5, (i + 0.25) * (tileMetrics.h / 1.33333) + tileMetrics.h / 1.75);
			}
		}
	}

	function fillPlayerInterface(player, startingPoint, playerNumber) {

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
				y: buttonsOffset.y
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

	}

	return {
		init: function () {

			var self = this;

			self.canvas = document.getElementById(CONSTANTS.canvas.id);
			self.context = self.canvas.getContext(CONSTANTS.canvas.context);
			
			self.buttonCoordinates = {
				isClicked: function (buttonName, playerNumber, clientX, clientY) {
					var button = this[playerNumber][buttonName];
					var x = (clientX > button.x - 100) && (button.x + 100 > clientX),
						y = (clientY > button.y - 100) && (button.y + 100 > clientY);
					console.log('clicked: ' + clientX + ' ' + clientY, 'expected: ' + button.x + ' ' + button.y);
					return x && y;
				}
			};

			return self;
		},
		drawField: function (fieldLayout) {

			fillField.call(this, fieldLayout);
		},
		drawPlayerGUI: function (players) {

			var playersArray = [players.red, players.blue, players.green, players.yellow],
				currentPlayerNumber = 1,
				coordinates = CONSTANTS.playerUI.coordinates,
				coords = [coordinates.red, coordinates.blue, coordinates.green, coordinates.yellow],
				gui = this;

			playersArray.map(function (player) {
				fillPlayerInterface.call(gui, playersArray[currentPlayerNumber - 1], coords[currentPlayerNumber - 1], currentPlayerNumber++);
			});
		},
		animateDice: function (dice1, dice2) {
			// Stefcho gledai tuk!
		}
	};

} ();