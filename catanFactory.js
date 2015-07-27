var catanFactory = function () {

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
		}
	};

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
				init: function (buildingType, coordinates, resourceCost) {
					var self = this;

					self.buildingType = buildingType;
					self.coordinates = coordinates;
					self.resourceCost = resourceCost;
					
					return this;
				},
				coordinates: {
					x: null,
					y: null,
					z: null
				}
				// TODO: add properties
			};

			return {
				init: function () {

					var self = this;

					self.resources = {
						wood: 0,
						sheep: 0,
						grain: 0,
						clay: 0,
						rocks: 0,
					};
					self.towns = [];
					self.roads = [];
					self.developments = [];
					self.points = 0

					return self;
				},
				build: function (buildingType, coordinates) {
					// TODO: implement! lol
					
					var cost = CONSTANTS.costs[buildingType];
					var costKeys = Object.keys(cost);

					for (var i = 0, len = costKeys.length; i < len; i+=1) {
						// console.log(this.resources[costKeys[i]], cost[costKeys[i]]);
						if(this.resources[costKeys[i]] < cost[costKeys[i]]) {
							return false;
						}
					}
					
					this[buildingType+'s'].push(Object.create(building.init(buildingType, coordinates)));
					
					for (i = 0; i < len; i+=1) {
						this.resources[costKeys[i]] -= cost[costKeys[i]];
						
					}
					
					return true;
					
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
