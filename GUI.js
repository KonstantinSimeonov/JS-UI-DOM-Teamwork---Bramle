var GUI = function () {

	var CONSTANTS = {
		fieldStartingPoint: { x: 500, y: 40 },
		resourceTypes: ['wood', 'sheep', 'grain', 'rocks', 'clay', 'none'],
		playerUICoordinates: {
			red: {x: 10, y:20},
			blue: {x: 10, y: 800},
			green: {x: 1300, y: 20},
			yellow: {x: 1300, y: 800},
			cardsOffset: {x: 0, y: 100}
		},
		styles: {
			fontStyles: {
				playerName: '20px Verdana'
			},
			fontColors: ['red', 'blue', 'green', 'yellow']
		}
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

	function fillPlayerInterface(player, startingPoint, playerNumber) {
		this.context.font = CONSTANTS.styles.fontStyles.playerName;
		this.context.fillStyle = CONSTANTS.styles.fontColors[playerNumber-1];
		this.context.fillText('Player ' + playerNumber, startingPoint.x, startingPoint.y);
		
		var resourceHand = new Image();
		resourceHand.src = 'images/player resource hand.jpg'
		
		var handOffset = CONSTANTS.playerUICoordinates.cardsOffset;
		this.context.drawImage(resourceHand, startingPoint.x + handOffset.x, startingPoint.y + handOffset.y);
		
		var buttonsOffset = {
			x: startingPoint.x + handOffset.x,
			y: startingPoint.y + handOffset.y + resourceHand.height + 40
		};
		
		this.context.fillText('Trade', buttonsOffset.x, buttonsOffset.y);
		this.context.fillText('Trade', buttonsOffset.x, buttonsOffset.y);
		
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
			var playersArray = [players.red, players.blue, players.green, players.yellow],
				currentPlayerNumber = 1;
			
			var coordinates = CONSTANTS.playerUICoordinates;
			
			var coords = [coordinates.red, coordinates.blue, coordinates.green, coordinates.yellow];
			
			var gui = this;
			
			playersArray.map(function(player) {
				fillPlayerInterface.call(gui, player, coords[currentPlayerNumber - 1], currentPlayerNumber++);
			});
		}
	};

} ();