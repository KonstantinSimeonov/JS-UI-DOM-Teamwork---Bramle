var privateUnitWrapper = {};

function attachModuleToWrapper(mod, modName) {
	privateUnitWrapper[modName] = mod;
}

var game = function () {
	
	var PrivatePesho = function (id) {
		this.name = 'pesho';
		this.id=id;
	}
	
	// attach private pesho so you can test out of the scope
	attachModuleToWrapper(PrivatePesho, 'Pesho');
	
	var PublicGosho = function(id, friendId) {
		this.name = 'gosho';
		this.id = id;
		this.friend = new PrivatePesho(friendId);
	}
	
	return {
		Gosho: PublicGosho
	};
	
} ();

console.log(privateUnitWrapper.Pesho);

// do tests