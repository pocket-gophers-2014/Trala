StudioCollection.View = function(){
  this.mainContainerSelector = '.main-container'
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

  updateTrackState: function(trackData) {
    document.getElementById('audio_player').currentTime = trackData
  }

}