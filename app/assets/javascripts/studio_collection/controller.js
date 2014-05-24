StudioCollection.Controller = function(model, view, fbManager) {
  //this.view = view
  this.model = model
  this.view = view
  this.model.fbManager = fbManager
}

StudioCollection.Controller.prototype = {
  init: function() {
    this.view.addUl()
  },

  fetchCollection: function() {
    return this.model.state
  },

  renderCollection: function() {
    var tempCollection = this.fetchCollection()
    for (var i = 0; i < tempCollection.length; i++) {
        this.view.renderStudioCollection(tempCollection[i])
    }
  }	
}