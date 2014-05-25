Search.View = function(){
  this.eventDelegate = {}
	this.searchResultsSelector = ".results-container"
  this.mainContainerSelector = ".main-container"
  this.searchStudioSelector = ".search-room-container"
}

Search.View.prototype = {
  bindEvents: function() {
    $(this.mainContainerSelector).on( 'submit', function(e) {
      e.preventDefault()
      var method = this.eventDelegate.controller[this.eventDelegate.callbackMethod]
      method.call(this.eventDelegate.controller, $(event.target).find('input').val())
    }.bind(this))
  },

  registerEventDelegate: function(controller, callbackMethod) {
    this.eventDelegate = { controller: controller, callbackMethod: callbackMethod}
  },

	drawInitial: function(widgetTemplate) {
		$(this.mainContainerSelector).empty().append(widgetTemplate);
	},

	redraw: function(resultsTemplate) {
		$(this.searchResultsSelector).empty().append(resultsTemplate)
	}
}