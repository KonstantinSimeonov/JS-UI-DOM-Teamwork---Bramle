var catanEngine = function () {
	
	return {
		init: function (gui, factory) {
			console.log("engine init");
			this.gui = gui;
			this.factory = factory;
			return this;
		},
		run: function () {
			console.log("engine run");
			var field = this.factory.getField();
			field.init();
			this.gui.init();
			this.gui.drawField(field.layout);
			this.gui.drawPlayerGUI(this.factory.getPlayers().red);
			
		}
	};
} ();