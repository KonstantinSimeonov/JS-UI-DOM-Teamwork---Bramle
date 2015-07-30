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
				
				// for (var i = 0, len1 = players.length; i < len1; i+=1) {
				// 	for (var j = 0, len2 = players[i].towns.length, player = players[i]; j < len2; j+=1) {
				// 		for (var z = 0, len3 = player.towns[j].length, town = player.towns[j]; z < len3; z++) {
				// 			if(field.layout[town.coordinates[0]][town.coordinates[1]].id === this.diceRoll) {
				// 				player.resources[field.layout[town.coordinates[0]][town.coordinates[1]].resource]+=1;
				// 			}
				// 			console.log(field.layout[town.coordinates[0]][town.coordinates[1]].id);
				// 		}
				// 		
				// 	}
				// 	
				// }
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
						// window.onclick = function (e) {
						// 	alert('done!');
						// }
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
					// TODO: build logic here
					console.log(players[0].towns);
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

			var playerColors = ['red', 'blue', 'green', 'yellow'];

			var self = this,
				field = self.factory.getField().init(),
				playersObject = self.factory.getPlayers(),
				players = [playersObject.red, playersObject.blue, playersObject.green, playersObject.yellow],
				currentPlayerTurn = 1;

			// players = [players.red, players.blue, players.green, players.yellow];


			self.gui.drawPlayerGUI(playersObject, currentPlayerTurn);
			self.gui.drawField(field.layout);

			initGame();
			
			
			
			//function handleBuildRequest(player) {
            //
			//}

			//function controllerIsClicked(e) {
			//	var spotIndex = self.gui.clickedInsideTownArea(e);
			//	if (spotIndex != -1) {
            //
			//		self.gui.drawTownAt(spotIndex);
			//	}
            //
            //
            //
			//	// console.log(e.clientX, e.clientY);
			//	// alert('{x:'+e.clientX + ', y:' + e.clientY+' , tiles:[]}');
			//	var command = self.gui.buttonCoordinates.isClicked(e.clientX, e.clientY);
            //
			//	switch (command) {
			//		case 'Roll':
			//			var dice1 = self.roll(),
			//				dice2 = self.roll();
			//			var sum = dice1 + dice2;
            //
			//			if (sum !== 7) {
			//				field.layout.map(function (row) {
			//					row.map(function (tile) {
			//						if (tile.id === sum) {
			//							// console.log('match da ima ' + tile.id);
			//							// TODO: distribute resource here.
			//						}
			//					});
			//				});
			//			} else {
			//				// TODO: bandits
			//			}
			//			break;
			//		case 'Build':
			//			console.log('build requested. feature not implemented yet');
			//			players[playerColors[currentPlayerTurn]].resources = {
			//				wood: 0,
			//				grain: 2,
			//				rocks: 3,
			//				sheep: 1,
			//				clay: 10
			//			};
			//			console.log(players[playerColors[currentPlayerTurn]].build('town', [0]));
			//			break;
			//		case 'Trade':
			//			console.log('trade requested. feature not implemented yet');
			//			break;
			//		default:
			//			break;
			//	}
			//}
            //
			//self.gui.init().drawField(field.layout);
			//self.gui.drawPlayerGUI(players, currentPlayerTurn);
            //
			//function chooseTowns() {
			//
			//	// this functions lets us use encapsulated variables
			//
			//	buildMode = true;
			//	var townsToPlace = 8;
            //
			//	var turns = [1, 2, 3, 4, 4, 3, 2, 1];
            //
			//	window.onclick = function (e) {
			//		var spotIndex = self.gui.townSpot(e);
			//		// var spotIndex = self.gui.roadSpot(e);
			//		if (spotIndex !== -1) {
			//			// self.gui.drawRoadAt(spotIndex, turns[townsToPlace - 1]);
			//			var townCoordinates = sortCoordinatesByRowThenByCol(self.gui.getTownCoordinatesAt(spotIndex));
			//			// console.log(townCoordinates);
			//			// console.log(players[playerColors[turns[townsToPlace - 1]]]);
			//			var buildSuccessful = players[playerColors[turns[townsToPlace - 1] - 1]].build('village', townCoordinates);
            //
			//			if (buildSuccessful) {
			//				self.gui.drawTownAt(spotIndex, turns[townsToPlace - 1]);
			//			}
			//
			//			// push in players inventory here
			//
			//
			//			self.gui.drawPlayerGUI(players, turns[townsToPlace - 1]);
			//			townsToPlace -= 1;
			//		}
            //
            //
			//		if (townsToPlace === 0) {
			//			// set the event function to controllers
			//			window.onclick = controllerIsClicked;
			//		}
			//	}
			//};
            //
			//chooseTowns();
            //
            //
			//// self.gui.init().drawField(field.layout);
			//// self.gui.drawPlayerGUI(players, currentPlayerTurn);
            //
			//var diceResult1 = self.roll(),
			//	diceResult2 = self.roll();
			//// gui.animateDice();
		},
		roll: function rollDice() {
			this.dice.start('dice');
			this.diceRoll = this.dice.results[0] + this.dice.results[1];
			this.dice.reset('dice');
		}
	};

} ();