Data.SongManager = function(searchUrl) {
	this.searchUrl = searchUrl
	this.songManagerSubscriber = {}
}

Data.SongManager.prototype = {
	searchSongs: function(query) {
		ajaxOptions = { url: this.searchUrl, type: 'get', success: this.handleSongResponse.bind(this)}
		$.ajax(ajaxOptions)
	},

	registerSongManagerSubscriber: function(subscriber) {
		this.songManagerSubscriber = subscriber
	},

	handleSongResponse: function(songData) {
		this.songManagerSubscriber.update(songData)
	}
}