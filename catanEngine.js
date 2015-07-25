var catanEngine = function () {

	return {
		init: function (gui, factory) {

			var self = this;

			self.gui = gui;
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
			
			function chooseTowns() {
				buildMode = true;
				var townsToPlace = 8;
				window.onclick = function (e) {
					self.gui.drawTownAt(e.clientX, e.clientY);
					// push in players inventory here
					currentPlayerTurn+=1;
					currentPlayerTurn%=5;
					if(currentPlayerTurn === 0) {
						currentPlayerTurn+=1;
					}
					console.log(currentPlayerTurn);
					
					self.gui.drawPlayerGUI(players, currentPlayerTurn);
					townsToPlace-=1;
					
					if(townsToPlace === 0) {
						window.onclick = function () {};
					}
				}	
			};
			
			chooseTowns();
			
			
			self.gui.init().drawField(field.layout);
			self.gui.drawPlayerGUI(players, currentPlayerTurn);
			
			 var diceResult1 = self.roll(),
			   	 diceResult2 = self.roll();
			// gui.animateDice();
			
			var canvas = document.getElementById('canvas');
			canvas.onclick = function (e) {
				
				if(GUI.buttonCoordinates.isClicked('Trade', currentPlayerTurn, e.clientX - canvas.offsetLeft, e.clientY + canvas.offsetTop)) {
					alert('trade requested');
				}
				
				// if(e.clientX > 770 &&  e.clientX < 870) {
				// 	if(e.clientY > 240 && e.clientY < 330) {
				// 		self.gui.drawTownAt(820, 280);
				// 		console.log(currentPlayerTurn);
				// 		players[playerColors[currentPlayerTurn]].towns.push({a: 0, b: 4, c: 5, settlementType: 'village'});
				// 	}
				// }
				
			}
			
			
			
			
			
		},
		roll: function rollDice() {
			var diceResult = (Math.ceil(Math.random() * 1000) % 6) + 1;
			
			return diceResult;
		}
	};
} ();