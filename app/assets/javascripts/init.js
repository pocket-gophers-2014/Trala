$(document).ready(function() {
  studioCollectionModel = new StudioCollection.Model()
  studioCollectionView = new StudioCollection.View()
  var studioModel = new Studio.Model();
  var studioView = new Studio.View();

  studioCollectionController = new StudioCollection.Controller({studioCollectionModel:studioCollectionModel,
                                                                studioCollectionView: studioCollectionView,
                                                                studioModel: studioModel,
                                                                studioView: studioView
                                                                 })

  fbTest = new Data.FirebaseManager('https://trala.firebaseio.com/studioCollection', studioCollectionModel)
  studioCollectionModel.registerStudioCollectionSubscriber(fbTest)
  studioCollectionModel.registerController(studioCollectionController)
  studioCollectionController.initStudioCollection()
  fbTest.setDataTriggers()

  // App Controller Setup
  var appController = new App.Controller()
  var appView = new App.View()

  appView.registerEventDelegate(appController)
  appView.bindEvents()
  appController.registerStudioCollectionController(studioCollectionController, "loadInitialStudioCollection")
  appController.registerStudioController(studioCollectionController, "loadInitialStudio")


  //Studio Setup - TODO cleanup when search is complete
  var songManager = new Data.SongManager();
  songManager.init()
  var searchView = new Search.View()
  searchController = new Search.Controller( searchView,  songManager )
  appController.registerSearchController(searchController, "loadWidget")
  searchView.registerEventDelegate(searchController, "searchSongs")
  searchView.bindEvents()
  // studioController.init();
})