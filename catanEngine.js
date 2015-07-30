var catanEngine = function () {

	var CONSTANTS = {
		startingStructures: 8,
		startingPlacementTurn: [1, 2, 3, 4, 4, 3, 2, 1],
		buildState: {
			builtRoad: false,
			builtTown: false
		}
	};

	function sortCoordinatesByRowThenByCol(coordinateArray) {
		var result = coordinateArray;
		return result.sort(function (x, y) {
			if (x[0] - y[0] > 0) {
				return x[0] - y[0];
			}

			return x[1] - y[1];
		});

	}

	return {
		init: function (gui, factory) {
			var self = this;

			self.gui = GUI.init();
			self.factory = factory;
			self.dice = D6AnimBuilder.get('dice');
			self.rollButton = document.getElementById('dicebutton');
			self.rollButton.disabled = true;
			// console.log(self.dice);
			
			return self;
		},
		run: function () {

			function distributeResource() {
				players.map(function (p) {

					p.towns.map(function (t) {
						// console.log(t);
						t.coordinates.map(function (c) {
							// console.log(self.diceRoll, field.layout[c[0]][c[1]]);
							if (c[0] !== -1 && c[1] !== -1 && self.diceRoll === field.layout[c[0]][c[1]].id) {
								// console.log(p[field.layout[c[0]][c[1]].resource]);
								p.resources[field.layout[c[0]][c[1]].resource] += 1;
							}
						})
					})
				});
			}

			function printMessage(message) {
				alert(message);
			}

			function logClickCoordinates(e) {
				console.log(e.clientX, e.clientY);
			}

			function placeStartingStructures(e) {

				var gui = self.gui,
					turns = CONSTANTS.startingPlacementTurn,
					townsToPlace = CONSTANTS.startingStructures,
					townIndex = gui.indexOfTownCoordinates(e),
					roadIndex = gui.indexOfRoadCoordinates(e),
					currentPlayer = players[turns[townsToPlace - 1] - 1],
					townCoordinates,
					roadCoordinates;


				if (!CONSTANTS.buildState.builtTown && townIndex !== -1) {
					townCoordinates = sortCoordinatesByRowThenByCol(gui.getTownCoordinatesAt(townIndex));
					// console.log(turns[townsToPlace - 1]);
					if (currentPlayer.canBuildVillageAt(townCoordinates)) {
						currentPlayer.build('town', townCoordinates, true);
						// console.log(currentPlayer.towns);
						gui.drawTownAt(townIndex, turns[townsToPlace - 1]);
						CONSTANTS.buildState.builtTown = true;
					}
				}
				if (!CONSTANTS.buildState.builtRoad && roadIndex !== -1) {
					roadCoordinates = sortCoordinatesByRowThenByCol(gui.getRoadCoordinatesAt(roadIndex));
					currentPlayer.build('road', roadCoordinates, true);
					gui.drawRoadAt(roadIndex, turns[townsToPlace - 1]);
					CONSTANTS.buildState.builtRoad = true;
				}

				if (CONSTANTS.buildState.builtRoad && CONSTANTS.buildState.builtTown) {
					CONSTANTS.startingStructures -= 1;
					CONSTANTS.buildState.builtRoad = false;
					CONSTANTS.buildState.builtTown = false;

					if (CONSTANTS.startingStructures === 0) {
						gui.drawPlayerGUI(playersObject, turns[CONSTANTS.startingStructures])
						window.onclick = executePlayerTurn;
						self.rollButton.disabled = false;
						return;
					}
				}
				// console.log(turns[CONSTANTS.startingStructures - 1]);
				gui.drawPlayerGUI(playersObject, turns[CONSTANTS.startingStructures - 1]);
			}

			function executePlayerTurn(e) {
				var command = self.gui.getClickedCommand(e.clientX, e.clientY);

				if (command === 'Build') {
					window.onclick = function (e) {
						var townIndex = self.gui.indexOfTownCoordinates(e),
							roadIndex = self.gui.indexOfRoadCoordinates(e),
							currentPlayer = players[currentPlayerTurn - 1],
							townCoordinates,
							roadCoordinates;


						if (townIndex !== -1) {
							townCoordinates = sortCoordinatesByRowThenByCol(self.gui.getTownCoordinatesAt(townIndex));
							// console.log(turns[townsToPlace - 1]);
							if (currentPlayer.canBuildVillageAt(townCoordinates)) {
								currentPlayer.build('town', townCoordinates, false);
								// console.log(currentPlayer.towns);
								self.gui.drawTownAt(townIndex, currentPlayerTurn);
								window.onclick = executePlayerTurn;
								self.gui.drawPlayerGUI(playersObject, currentPlayerTurn);
							}
						}
						
						if (roadIndex !== -1) {
							roadCoordinates = sortCoordinatesByRowThenByCol(self.gui.getRoadCoordinatesAt(roadIndex));
							currentPlayer.build('road', roadCoordinates, false);
							self.gui.drawRoadAt(roadIndex, currentPlayerTurn);
							window.onclick = executePlayerTurn;
							self.gui.drawPlayerGUI(playersObject, currentPlayerTurn);
						}
					}
				} else if (command === 'Trade') {
					// TODO: trading logic hee
				} else if (command === 'End') {
					currentPlayerTurn += 1;
					currentPlayerTurn %= 5;
					if (currentPlayerTurn === 0) {
						currentPlayerTurn += 1;
					}
					self.rollButton.style.background = playerColors[currentPlayerTurn - 1];
					self.gui.drawPlayerGUI(playersObject, currentPlayerTurn);
					self.rollButton.disabled = false;
				}
			}

			function initGame() {
				printMessage('Every player should choose a town and road');
				window.onclick = placeStartingStructures;
				// window.onclick = logClickCoordinates;
				self.rollButton.onclick = function (e) {
					console.log('gosho');
					self.roll();
					distributeResource();
					self.gui.drawPlayerGUI(playersObject, currentPlayerTurn);
					self.rollButton.disabled = true;
				}
			}

			var self = this,
				field = self.factory.getField().init(),
				playersObject = self.factory.getPlayers(),
				players = [playersObject.red, playersObject.blue, playersObject.green, playersObject.yellow],
				currentPlayerTurn = 1,
				playerColors = ['red', 'blue', 'green', 'yellow'];

			self.gui.drawPlayerGUI(playersObject, currentPlayerTurn);
			self.gui.drawField(field.layout);

			initGame();
		},
		roll: function rollDice() {
			this.dice.start('dice');
			this.diceRoll = this.dice.results[0] + this.dice.results[1];
			this.dice.reset('dice');
		}
	};
} ();