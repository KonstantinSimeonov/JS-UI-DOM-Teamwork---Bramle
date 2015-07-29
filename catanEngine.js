var catanEngine = function () {
	var CONSTANTS = {
		startingStructures: 8,
		startingPlacementTurn: [1,2,3,4,4,3,2,1]
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

			return self;
		},
		run: function () {

			function printMessage(message){
				alert(message);
			}

			function placeStartingStructures(e){
				var gui = self.gui,
					turns = CONSTANTS.startingPlacementTurn,
					townsToPlace = CONSTANTS.startingStructures,
					townIndex = gui.indexOfTownCoordinates(e),
					roadIndex = gui.indexOfRoadCoordinates(e),
					currentPlayer = players[turns[townsToPlace-1]-1],
					builtRoad = false,
					builtTown = false,
					townCoordinates,
					roadCoordinates;


				if(townIndex !== -1){
					townCoordinates = gui.getTownCoordinatesAt(townIndex);
					if(currentPlayer.canBuildVillageAt(townCoordinates)){
						currentPlayer.build('village', townCoordinates);
						gui.drawTownAt(townIndex,turns[townsToPlace-1]-1);
						builtTown = true;
					}
				}
				if(roadIndex !==-1){
					currentPlayer.build('road', roadCoordinates);
					gui.drawRoadAt(roadIndex, turns[townsToPlace-1]-1);
				}

				gui.drawPlayerGUI(self.factory.getPlayers(4), turns[townsToPlace-1]-1);

				if(builtTown && builtRoad){
					CONSTANTS.startingStructures -=1;
					if(CONSTANTS.startingStructures === 0){
						window.onclick = function (e){
							alert('done!');
						}
					}
				}
			}

			function initGame(){
				printMessage('Every player should choose a town and road');
				window.onclick = placeStartingStructures;

			}

			var playerColors = ['red', 'blue', 'green', 'yellow'];

			var self = this,
				field = self.factory.getField().init(),
				players = self.factory.getPlayers(),
				currentPlayerTurn = 1,
				buildMode = false;

			players = [players.red, players.blue, players.green, players.yellow];


			self.gui.drawPlayerGUI(self.factory.getPlayers(4), currentPlayerTurn);
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
			var diceResult = (Math.ceil(Math.random() * 1000) % 6) + 1;

			return diceResult;
		}
	};

} ();