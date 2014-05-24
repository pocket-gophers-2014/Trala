App.View = function(){
	this.eventDelagte = {}
	this.createRoomSelector = '.create-room'
	this.joinRoomSelector = '.join-room' 
}

App.View.prototype = {
	bindEvents: function(){
		$this.createRoomSelector.on('click', this.eventDelagate)

	},

	registerEventDelegates: function(delegate) {

	}
}