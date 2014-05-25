App.View = function(){
	this.eventDelegate = {}
	this.createStudioSelector = '#create-studio'
	this.joinStudioSelector = '#join-studio' 
}

App.View.prototype = {
	bindEvents: function(){
		$(this.createStudioSelector).on('click', this.eventDelegate.loadNewStudio.bind(this.eventDelegate))
		$(this.joinStudioSelector).on('click', this.eventDelegate.loadStudioCollection.bind(this.eventDelegate))
	},

	registerEventDelegate: function(delegate) {
		this.eventDelegate = delegate
	}
}