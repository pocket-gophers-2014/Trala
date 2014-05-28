Search.View = function(){
  this.eventDelegate = {}
	this.searchResultsSelector = ".results-container"
  this.mainContainerSelector = ".main-container"
  this.searchStudioSelector = ".search-room-container"
  this.songBucketSelector = '.song-basket'
}

Search.View.prototype = {
  bindEvents: function() {
    this.bindSearchOnSubmit();
    this.bindSearchOnKeyUp()
    this.bindSongSelectionEvent();
  },

  bindSearchOnSubmit: function() {
    $(this.mainContainerSelector).on( 'submit', function(e) {
      e.preventDefault()
      var method = this.eventDelegate.controller[this.eventDelegate.cbMethods.search]
      method.call(this.eventDelegate.controller, $(e.target).find('input').val())
    }.bind(this))
  },

  bindSearchOnKeyUp: function() {
    $(this.mainContainerSelector).on( 'keyup', 'input', function(e) {
      e.preventDefault()
      var method = this.eventDelegate.controller[this.eventDelegate.cbMethods.search]
      method.call(this.eventDelegate.controller, $(e.target).val())
    }.bind(this))
  },

  bindSongSelectionEvent: function() {
     $(this.mainContainerSelector).on( 'click', '.clickable-song', function(e) {
      e.preventDefault()
      var method = this.eventDelegate.controller[this.eventDelegate.cbMethods.songSelection]
      method.call(this.eventDelegate.controller, e.target.id)
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