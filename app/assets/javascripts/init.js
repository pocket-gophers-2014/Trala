$(document).ready(function() {
  sModel = new StudioCollection.Model()
  sView = new StudioCollection.View()
  
  sTest = new StudioCollection.Controller(sModel, sView)
  fbTest = new Data.FirebaseManager('https://trala.firebaseio.com/studioCollection', sModel)
  sModel.registerStudioCollectionSubscriber(fbTest)
  sModel.registerController(sTest)
  sTest.init()
  fbTest.setDataTriggers()


  ///Studio Setup
  songManager = new Data.SongManager();
  var studioModel = new Studio.Model();
  var studioView = new Studio.View();
  studioController = new Studio.Controller({model: studioModel, view: studioView})
})