var catanEngine = function () {

	return {
		init: function (gui, factory) {

			var self = this;

			self.gui = gui;
			self.factory = factory;

			return self;
		},
		run: function () {
			
			var self = this,
				field = self.factory.getField().init(),
				players = self.factory.getPlayers(),
				currentPlayerTurn = 2;

			self.gui.init().drawField(field.layout);
			self.gui.drawPlayerGUI(players);
			
			var canvas = document.getElementById('canvas');
			canvas.onclick = function (e) {
				console.log(e.clientX, e.clientY);
				if(GUI.buttonCoordinates.isClicked('Trade', currentPlayerTurn, e.clientX - canvas.offsetLeft, e.clientY + canvas.offsetTop)) {
					alert('trade requested');
				}
			}
			
		},
		roll: function rollDice() {
			var diceResult = (Math.ceil(Math.Random() * 1000) % 6) + 1;
			
			return diceResult;
		}
	};
} ();