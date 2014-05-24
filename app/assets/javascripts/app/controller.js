App.Controller = function(){
	this.studioCollectionController = {}
	this.studioController = {}
	this.searchController = {}
}

App.Controller.prototype = {
	loadNewStudio: function(){
		debugger
	},

	loadStudioCollection: function(){
		var controller = this.studioCollectionController.controller
		var method = controller[this.studioCollectionController.callbackMethod]
		// debugger
		method.apply(controller)
	},

	registerStudioCollectionController: function(controller, callbackMethod){
		this.studioCollectionController = {controller: controller, callbackMethod: callbackMethod}
	},

	registerStudioController: function(controller){
		this.studioController = controller
	},

	registerSearchController: function(controller){
		this.searchController = controller
	}
}