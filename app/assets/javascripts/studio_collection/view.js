StudioCollection.View = function(){
  this.eventDelegate  = {}
  this.mainContainerSelector = '.main-container'
  this.studioSelector = '.studio'
}

StudioCollection.View.prototype = {
  renderStudioCollection: function(elementData) {
        $('.container ul').append("<li> Name: " + elementData.name + "Listeners: " + elementData.data.listeners + "</li>")
  },

  appendStudio: function(elementData) {
      $('.container ul').append("<li id='" + elementData.name + "'> Name: " + elementData.name + "Listeners: " + elementData.data.listeners + "</li>")
  },

  removeStudio: function(elementData) {
    $('.container ul #' + elementData.name).remove()
  },

  modifyStudio: function(elementData) {
    $('.container ul #' + elementData.name).text("Name: " + elementData.name + "Listeners: " + elementData.data.listeners)
  },

  addUl: function() {
    $('.container').append("<ul>")
  },

  draw: function(studioCollectionTemplate) {
    $(this.mainContainerSelector).empty().append(studioCollectionTemplate)
  },

  bindEvents: function() {
    $(this.mainContainerSelector).on('click', this.studioSelector, function(e) {
      var controller = this.eventDelegate.controller;
      cbMethod = controller[this.eventDelegate.cbMethod]
      cbMethod.call( controller, e.target.id )
    }.bind(this))
  },


  registerEventDelegate: function( controller, cbMethod ) {
    this.eventDelegate = { controller: controller, cbMethod: cbMethod }
  },
  
  syncPlayer: function(trackData) {
    document.querySelector('.active').currentTime = trackData.currentTrackTime
  },

  updatePlayerData: function() {
    var updatedTrackTime = document.querySelector('.active').currentTime
    var updatedTrackNumber = document.querySelector('.active').id
    return { trackTime: updatedTrackTime, trackPlaying: updatedTrackNumber }
  },

  toggleActivePlayer: function(newTrackNumber) {
  //  document.querySelector('.active').classList.remove('active')
    document.querySelector('#' + newTrackNumber).classList.add('active')
  }

}