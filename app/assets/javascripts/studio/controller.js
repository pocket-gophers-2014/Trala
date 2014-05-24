Studio.Controller = function(args){
	this.model = args.model
	this.view = args.view
	//Test
	// this.songManager = args.songManager
}

Studio.Controller.prototype = {
	init: function() {
		// this.songManager.searchSongs('2pac', function(tracks) {
		// 	this.testSliceFirstSong(tracks)
		// }.bind(this))
		this.loadInitial();
	},

	loadInitial: function() {
		playerTemplate = this.buildPlayer(this.model.getCurrentSong()[0]);
		this.view.drawInitial(playerTemplate);
	},

	buildPlayer: function(song) {
		return HandlebarsTemplates['player'](song)
	},

	addSong: function(song) {
		this.model.addSong(song);
		// this.loadInitial();
	}//,

	// testSliceFirstSong: function(tracks) {
	// 	this.addSong(tracks.pop())
	// }

}