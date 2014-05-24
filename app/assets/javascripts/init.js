$(document).ready(function() {
  sModel = new StudioCollection.Model()
  sView = new StudioCollection.View()
  
  studioCollectionController = new StudioCollection.Controller(sModel, sView)
  fbTest = new Data.FirebaseManager('https://trala.firebaseio.com/studioCollection', sModel)
  sModel.registerStudioCollectionSubscriber(fbTest)
  sModel.registerController(studioCollectionController)
  studioCollectionController.init()
  fbTest.setDataTriggers()


  //Studio Setup - TODO cleanup when search is complete
  var songManager = new Data.SongManager();
  songManager.init()
  var studioModel = new Studio.Model();
  var studioView = new Studio.View();
  studioController = new Studio.Controller({model: studioModel,
  																					view: studioView,
  																		 			songManager: songManager})
 // studioController.init(); 

// App Controller Setup
var appController = new App.Controller()
var appView = new App.View()
var searchController = new Search.Controller()

appView.registerEventDelegate(appController)
appView.bindEvents()
appController.registerStudioCollectionController(studioCollectionController, "loadInitial")
appController.registerStudioController(studioController, "loadInitial")
appController.registerSearchController(searchController, "loadWidget")
  
})