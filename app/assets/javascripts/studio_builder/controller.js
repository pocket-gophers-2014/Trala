// StudioBuilder.Controller = function(view) {
// 	this.newStudioSubscriber = {}
// 	this.view = view
// 	this.playlist = []
// }

// StudioBuilder.Controller.prototype = {
// 	addSong: function(song) {
//     this.tempPlaylist.push(song)
//     playlist = this.buildPlaylist(this.tempPlaylist)
//     this.view.redrawPlaylist(playlist)
//     if (this.tempPlaylist.length > 2) {
//       var name = String(Math.floor(Math.random() * 1000))
//       this.notifyNewStudioSubscribers( {name: name, data: { playlist: this.tempPlaylist } } )
//       this.tempPlaylist = []
//       this.initUserStudioState(name)
//			 window.location.hash = "studio"	
//     }
//   },

//   buildPlaylist: function(playlist) {
//     playlist = { songs: playlist }
//     return HandlebarsTemplates['song_basket_item'](playlist)
//   },

// 	registerNewStudioSubscriber: function( controller, cbMethod ) {
// 		this.newStudioSubscriber = { controller: controller cbMethod: cbMethod }
// 	},

// 	notifyNewStudioSubscribers: function(studioData) {
// 		var controller = this.newStudioSubscriber.controller
// 		var cbMethod = controller[this.newStudioSubscriber.cbMethod]
// 		cbMethod.call( controller, studioData )
// 	}
// }