Search.View = function(){
  this.eventDelegate = {}
	this.searchResultsSelector = ".results-container"
  this.mainContainerSelector = ".main-container"
  this.searchStudioSelector = ".search-room-container"
  this.songBucketSelector = '.song-basket'
}

Search.View.prototype = {
  bindEvents: function() {
    this.bindSearchEvent();
    this.bindSongSelectionEvent();
    this.bindSongRemovalEvent();
  },

  bindSearchEvent: function() {
    $(this.mainContainerSelector).on( 'submit', function(e) {
      e.preventDefault()
      var method = this.eventDelegate.controller[this.eventDelegate.cbMethods.search]
      method.call(this.eventDelegate.controller, $(e.target).find('input').val())
    }.bind(this))
  },

  bindSongSelectionEvent: function() {
     $(this.mainContainerSelector).on( 'click', '.each-song > img', function(e) {
      e.preventDefault()
      var method = this.eventDelegate.controller[this.eventDelegate.cbMethods.songSelection]
      method.call(this.eventDelegate.controller, e.target.id)
    }.bind(this))
  },

  bindSongRemovalEvent: function() {
    $(  this.mainContainerSelector ).on( 'click', 'p', function() {

      // change the chained function to Remove
      // var method = this.eventDelegate.controller[this.eventDelegate.cbMethods.songSelection]

      // grab id ]
      // locate song in the bin
      // remove it
      // redraw it

      // call on the song id
    //   method.call(this.eventDelegate.controller, event.target.id)
    }.bind(this))
  },

  registerEventDelegate: function(controller, cbMethods) {
    this.eventDelegate = { controller: controller, cbMethods: cbMethods}
  },

	drawInitial: function(widgetTemplate) {
		$(this.mainContainerSelector).empty().append(widgetTemplate);
	},

	redraw: function(resultsTemplate) {
		$(this.searchResultsSelector).empty().append(resultsTemplate)
	}
}