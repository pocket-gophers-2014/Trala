Search.Controller = function( view, songManager ){
	this.view = view
	this.songManager = songManager
    this.songSelectionSubscriber = {}
    this.searchResults = []
}

Search.Controller.prototype = {

	loadWidget: function() {
		widgetTemplate = this.buildSearchWidget()
		this.view.drawInitial( widgetTemplate );
	},

    searchSongs: function( query ) {
        this.songManager.searchSongs( query, this.updateResults.bind(this) )
    },

    updateResults: function( songData ) {
        this.setCurrentResults( songData )
        resultsTemplate = this.buildResultsTemplate( songData )
        this.view.redraw( resultsTemplate )
    },

	buildSearchWidget: function() {
		return HandlebarsTemplates.search_page
	},

    buildResultsTemplate: function( songData ) {
        var songData = { songData: songData }
        return HandlebarsTemplates['search_result_template']( songData)
    },

    setCurrentResults: function( songData ) {
        this.searchResults = songData
    },

    registerSongSelectionSubscriber: function(controller, cbMethod) {
        this.songSelectionSubscriber = {controller: controller, cbMethod: cbMethod }
    },

    selectSong: function(songID) {
        song = this.getSongFromCurrentResults( songID )
        this.notifySongSelectionSubscriber( song )
    },

    getSongFromCurrentResults: function( songID ) {
        var tempSong  = {}
        this.searchResults.forEach(function(song) {
            if ( ( (song.id).toString() === songID ) ) {
                tempSong = song
            }
        })
        return tempSong
    },

    notifySongSelectionSubscriber:  function(song) {
        controller = this.songSelectionSubscriber.controller
        cbMethod = controller[this.songSelectionSubscriber.cbMethod]
        cbMethod.call(controller, song)
    }
}
