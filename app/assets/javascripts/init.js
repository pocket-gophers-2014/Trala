$(document).ready(function() {
  studioCollectionModel = new StudioCollection.Model()
  studioCollectionView = new StudioCollection.View()
  //var studioModel = new Studio.Model();
  var studioView = new Studio.View();
  
  studioCollectionController = new StudioCollection.Controller({studioCollectionModel: studioCollectionModel,
                                                                studioCollectionView: studioCollectionView,
                                                                 studioView: studioView
                                                                 })
  
  fbTest = new Data.FirebaseManager('https://trala.firebaseio.com/studioCollection', studioCollectionModel)
  studioCollectionModel.registerStudioCollectionSubscriber(fbTest)
  studioCollectionModel.registerController(studioCollectionController)
  studioCollectionController.initStudioCollection()
  fbTest.setDataTriggers()


  //Studio Setup - TODO cleanup when search is complete
  var songManager = new Data.SongManager();
  songManager.init()
 // studioController.init(); 

// App Controller Setup
var appController = new App.Controller()
var appView = new App.View()
var searchController = new Search.Controller()

appView.registerEventDelegate(appController)
appView.bindEvents()
appController.registerStudioCollectionController(studioCollectionController, "loadInitialStudioCollection")
appController.registerStudioController(studioCollectionController, "loadInitialStudio")
appController.registerSearchController(searchController, "loadWidget")
  
})