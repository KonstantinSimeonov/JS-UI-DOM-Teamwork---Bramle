var catanFactory = function () {

	var CONSTANTS = {
		defaultField: [
			[{ id: 11 }, { id: 12 }, { id: 9 }],
			[{ id: 4 }, { id: 6 }, { id: 5 }, { id: 9 }],
			[{ id: 7, resource: 'none' }, { id: 3 }, { id: 11 }, { id: 4 }, { id: 8 }],
			[{ id: 8 }, { id: 10 }, { id: 9 }, { id: 3 }],
			[{ id: 5 }, { id: 2 }, { id: 6 }, ]
		],
		

	};

	var field = function () {
		
		var terrain= [
			'wood',
			'wood',
			'wood',
			'wood',
			'grain',
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
				this.layout = CONSTANTS.defaultField;
				setWasteland(this.layout);
				
				
				
				 var resources =  terrain.sort(function (x,y) {
					 setTimeout(30);
					 return Math.pow(-1, Math.ceil(Math.random() * 10) % 5);
				 }); //CONSTANTS.terrain.sort(function (x) {
				// 	window.setTimeout(1);
				// 	return Math.random();
				// });
				console.log(resources);
				console.log(terrain);
				for (var i = 0, len1 = this.layout.length; i < len1; i += 1) {
					for (var j = 0, len2 = this.layout[i].length; j < len2; j += 1) {

						if (this.layout[i][j].id === 7) {
							continue;
						}

						this.layout[i][j].resource = resources.pop();
					}
				}
				
				return this;
			}
		};
	} ();

	var players = function () {

		var player = function () {

			var building = {
				init: function (buildingType, coordinates, resourceCost) {
					this.buildingType = buildingType;
					this.coordinates = coordinates;
					this.resourceCost = resourceCost;
				}
				// TODO: add properties
			};

			return {
				resources: {
					wood: 0,
					sheep: 0,
					grain: 0,
					clay: 0,
					rocks: 0
				},
				towns: [],
				roads: [],
				developments: [],

				build: function () {
					throw new Error("NOT IMPLEMENTED!");
				},
				get points() {
					return this._points;
				},


			};
		} ();

		var players = {
			red: Object.create(player),
			green: Object.create(player),
			blue: Object.create(player),
			yellow: Object.create(player)
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
