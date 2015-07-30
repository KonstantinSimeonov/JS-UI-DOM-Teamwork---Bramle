var catanFactory = function () {

	function sortCoordinatesByRowThenByCol(coordinateArray) {
		var result = coordinateArray;
		return result.sort(function (x, y) {
			if (x[0] - y[0] > 0) {
				return x[0] - y[0];
			}

			return x[1] - y[1];
		});
	}

	var CONSTANTS = {
		defaultField: [
			[{ id: 11 }, { id: 12 }, { id: 10 }],
			[{ id: 4 }, { id: 6 }, { id: 5 }, { id: 9 }],
			[{ id: 7, resource: 'none' }, { id: 3 }, { id: 11 }, { id: 4 }, { id: 8 }],
			[{ id: 8 }, { id: 10 }, { id: 9 }, { id: 3 }],
			[{ id: 5 }, { id: 2 }, { id: 6 }, ]
		],
		costs: {
			// TODO: see if an array implementation is needed
			village: { wood: 1, clay: 1, sheep: 1, grain: 1 },
			town: { grain: 2, rock: 3 },
			road: { wood: 1, clay: 1 },
			development: { sheep: 1, grain: 1, rock: 1 }
		},
		buildingsMap: {}
	};

	function canBuiltVillageAt(buildMap, coordinatesArray) {

		coordinatesArray = sortCoordinatesByRowThenByCol(coordinatesArray);

		function hashCoordinateArray(cArr) {
			var result = '';

			for (var i = 0; i < 3; i += 1) {
				if (cArr[i]) {
					result += cArr[i][0] + 'a' + cArr[i][1];
				} else {
					result += '-1a-1';
				}


			}
			 // console.log(result);
			return result;
		}

		function getNeighbors(coordinatesArray) {
			var neighbors = [];

			var first = coordinatesArray[0].slice(),
				second = coordinatesArray[1].slice(),
				third = coordinatesArray[2].slice();

			var downField = (first[0] >= 1) ? -1 : 0;
			var upField = (downField === 0) ? 1 : 0;
			// coordinate transformation
			// console.log('original: ' + hashCoordinateArray(coordinatesArray));
			if (first[0] === second[0]) {
				// console.log('gosho');
				neighbors[0] = [[first[0] - 1, first[1] + 1 - upField], first, second];
				neighbors[1] = [first, [first[0] + 1, first[1] + downField], third];
				neighbors[2] = [second, third, [second[0] + 1, second[1] + upField]];
			} else {
				console.log('tosho');
				console.log(downField);
				neighbors[0] = [second, third, [third[0] + 1, third[1] + downField]];
				neighbors[1] = [first, [first[0], first[1] + 1], third];
				neighbors[2] = [[first[0], first[1] - 1], first, second];
			}
			
			return neighbors;
		}
		
		var coordinateHash = hashCoordinateArray(coordinatesArray);


		if (buildMap[coordinateHash] !== undefined) {
			return false;
		}

		var neighbors = getNeighbors(coordinatesArray);
		// // console.log(coordinatesArray, neighbors);
		var canBuild = true;

		neighbors.map(function (neighbor) {
			if (buildMap[hashCoordinateArray(neighbor)] !== undefined) {
				canBuild = false;
			}
		});

		// console.log(buildMap);

		if (canBuild) {
			buildMap[coordinateHash] = true;
		}

		return canBuild;
	}

	var field = function () {

		var terrain = [
			'wood',
			'wood',
			'wood',
			'wood',
			'grain',
			'grain',
			'grain',
			'grain',
			'sheep',
			'sheep',
			'sheep',
			'sheep',
			'rocks',
			'rocks',
			'rocks',
			'clay',
			'clay',
			'clay',
		]

		function setWasteland(field) {
			var row = Math.ceil(Math.random() * 100) % field.length,
				col = Math.ceil(Math.random() * 100) % field[row].length,
				store;

			store = field[row][col];
			field[row][col] = field[2][0];
			field[2][0] = store;
		}

		return {
			init: function () {
				var resources,
					len1,
					len2,
					i,
					j,
					self = this;

				self.layout = CONSTANTS.defaultField;
				setWasteland(self.layout);

				resources = terrain.sort(function (x, y) {
					setTimeout(100);
					return Math.pow(-1, Math.ceil(Math.random() * 10) % 19);
				});

				for (i = 0, len1 = self.layout.length; i < len1; i += 1) {
					for (j = 0, len2 = self.layout[i].length; j < len2; j += 1) {

						if (self.layout[i][j].id === 7) {
							continue;
						}

						self.layout[i][j].resource = resources.pop();
					}
				}

				return self;
			}
		};
	} ();

	var players = function () {

		var player = function () {

			var building = {
				init: function (buildingTyp, coordinates, resourceCost) {
					var self = this;

					self.buildingType = buildingTyp;
					self.coordinates = coordinates;
					self.resourceCost = resourceCost;

					return this;
				},
				// TODO: add properties
			};

			return {
				init: function () {

					var self = this;

					self.resources = {
						// clay: 40,
						// wood: 40,
						// sheep: 40,
						// grain: 40,
						// rocks: 40,
						clay: 0,
						wood: 0,
						sheep: 0,
						grain: 0,
						rocks: 0,
					};
					self.towns = [];
					self.roads = [];
					self.villages = self.towns;
					self.developments = [];
					self.points = 0

					return self;
				},
				build: function (buildingType, coordinates, startOfGame) {
					// TODO: implement! lol
					
					if (coordinates === undefined) {
						return;
					}

					var cost = CONSTANTS.costs[buildingType];
					var costKeys = Object.keys(cost);

					if (!startOfGame) {
						for (var i = 0, len = costKeys.length; i < len; i += 1) {
							if (this.resources[costKeys[i]] < cost[costKeys[i]]) {
								return false;
							}
						}
					}


					if (buildingType === 'town' || buildingType === 'village') {
						this.points += 1;
					}
					
					this[buildingType + 's'].push(Object.create(building).init(buildingType, coordinates));
					// console.log(buildingType + 's');
					// console.log(this[buildingType + 's']);
					
					if (!startOfGame) {
						for (i = 0; i < len; i += 1) {
							this.resources[costKeys[i]] -= cost[costKeys[i]];

						}
					}
					

					return true;
				},
				canBuildVillageAt: function (villageCoordinates) {
					var spotIsFree = canBuiltVillageAt(CONSTANTS.buildingsMap, villageCoordinates);
					return spotIsFree;
				}
			};
		} ();

		var players = {
			red: Object.create(player).init(),
			green: Object.create(player).init(),
			blue: Object.create(player).init(),
			yellow: Object.create(player).init()
		};

		return players;
	} ();

	return {
		getField: function () {
			return field;
		},
		getPlayers: function (playerCount) {
			return players;
		}
	};
} ();