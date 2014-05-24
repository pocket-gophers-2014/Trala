Studio.Controller = function(args){
	this.model = args.model
	this.view = args.view
}

Studio.Controller.prototype = {
	init: function() {
		this.drawInitial();
	},

	drawInitial: function() {
		playerTemplate = this.buildPlayer(this.model.getCurrentsong);
		this.view.drawInitial(playerTemplate);
	},

	buildPlayer: function(song) {
		return HandlebarsTemplates['player'](song)
	},

	addSong: function(song) {
		this.model.addSong(song);
	},
}