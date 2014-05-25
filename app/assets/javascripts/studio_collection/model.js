StudioCollection.Model = function() {
  this.state = []
}

StudioCollection.Model.prototype = {
 updateState: function(stateData) {
  this.state = stateData
  this.controller.renderCollection()
 },

 updateStudioState: function(studio, data) {
  this.subscriber.modifyStudioState(studio, data)
 },

  registerStudioCollectionSubscriber: function(subscriber) {
    this.subscriber = subscriber
  },

  registerController: function(controller) {
    this.controller = controller
  }

}