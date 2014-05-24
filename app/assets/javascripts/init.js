$(document).ready(function() {
  sModel = new StudioCollection.Model()
  sView = new StudioCollection.View()
  
  sTest = new StudioCollection.Controller(sModel, sView)
  fbTest = new Data.FirebaseManager('https://trala.firebaseio.com/studioCollection', sModel)
  sModel.registerStudioCollectionSubscriber(fbTest)
  sModel.registerController(sTest)
  sTest.init()
  fbTest.setDataTriggers()
})