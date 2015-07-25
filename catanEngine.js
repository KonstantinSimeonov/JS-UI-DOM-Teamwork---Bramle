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
				players = self.factory.getPlayers();
				
			self.gui.init().drawField(field.layout);
			self.gui.drawPlayerGUI(players);
		}
	};
} ();