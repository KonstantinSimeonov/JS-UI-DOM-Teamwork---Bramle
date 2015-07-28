var catanEngine = function () {

	return {
		init: function (gui, factory) {
			var self = this;

			self.gui = GUI.init();
			self.factory = factory;

			return self;
		},
		run: function () {

			var playerColors = ['red', 'blue', 'green', 'yellow'];

			var self = this,
				field = self.factory.getField().init(),
				players = self.factory.getPlayers(),
				currentPlayerTurn = 1,
				buildMode = false;

			function handleBuildRequest(player) {

			}

			function controllerIsClicked(e) {
				var spotIndex = self.gui.clickedInsideTownArea(e);
				if (spotIndex != -1) {

					self.gui.drawTownAt(spotIndex);
				}



				// console.log(e.clientX, e.clientY);
				// alert('{x:'+e.clientX + ', y:' + e.clientY+' , tiles:[]}');
				var command = self.gui.buttonCoordinates.isClicked(e.clientX, e.clientY);

				switch (command) {
					case 'Roll':
						var dice1 = self.roll(),
							dice2 = self.roll();
						var sum = dice1 + dice2;

						if (sum !== 7) {
							field.layout.map(function (row) {
								row.map(function (tile) {
									if (tile.id === sum) {
										// console.log('match da ima ' + tile.id);
										// TODO: distribute resource here.
									}
								});
							});
						} else {
							// TODO: bandits
						}
						break;
					case 'Build':
						console.log('build requested. feature not implemented yet');
						players[playerColors[currentPlayerTurn]].resources = {
							wood: 0,
							grain: 2,
							rocks: 3,
							sheep: 1,
							clay: 10
						};
						console.log(players[playerColors[currentPlayerTurn]].build('town', [0]));
						break;
					case 'Trade':
						console.log('trade requested. feature not implemented yet');
						break;
					default:
						break;
				}
			}
			
			self.gui.init().drawField(field.layout);
			self.gui.drawPlayerGUI(players, currentPlayerTurn);
			
			function chooseTowns() {
				
				// this functions lets us use encapsulated variables
				
				buildMode = true;
				var townsToPlace = 8;

				var turns = [1, 2, 3, 4, 4, 3, 2, 1];

				window.onclick = function (e) {
					//var spotIndex = self.gui.clickedInsideTownArea(e);
					var spotIndex = self.gui.roadSpot(e);
					if (spotIndex !== -1) {
						self.gui.drawRoadAt(spotIndex, turns[townsToPlace - 1]);
						// push in players inventory here
					
						self.gui.drawPlayerGUI(players, turns[townsToPlace - 1]);
						townsToPlace -= 1;
					}


					if (townsToPlace === 0) {
						// set the event function to controllers
						window.onclick = controllerIsClicked;
					}
				}
			};

			chooseTowns();


			// self.gui.init().drawField(field.layout);
			// self.gui.drawPlayerGUI(players, currentPlayerTurn);

			var diceResult1 = self.roll(),
				diceResult2 = self.roll();
			// gui.animateDice();
		},
		roll: function rollDice() {
			var diceResult = (Math.ceil(Math.random() * 1000) % 6) + 1;

			return diceResult;
		}
	};

} ();