Studio.Model = function() {
	this.playlist = []
	this.users = []
}

Studio.Model.prototype = {
	addUser: function(user) {
		this.users.push(user)
	},

	addSong: function(song) {
		this.playlist.push(song)
	},

	getCurrentSong: function() {
		return this.playlist.slice(-1)
	}	
}