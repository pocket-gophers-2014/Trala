$(document).ready(function() {
  //geoLocaitonSetup
  locationManager = new Data.LocationManager()
  locationManager.registerCoords()

  studioCollectionModel = new StudioCollection.Model()
  studioCollectionView = new StudioCollection.View()
  //var studioModel = new Studio.Model();
  var studioView = new Studio.View();

  studioCollectionController = new StudioCollection.Controller({studioCollectionModel:studioCollectionModel,
                                                                studioCollectionView: studioCollectionView,
                                                                studioView: studioView,
                                                                geoLocation: locationManager
                                                                 })

  studioCollectionView.registerEventDelegate(studioCollectionController, 'initUserStudioState')
  studioCollectionView.bindEvents()

  fbTest = new Data.FirebaseManager('https://tralatest.firebaseio.com/studioCollection', studioCollectionModel)
  studioCollectionModel.registerStudioCollectionSubscriber(fbTest)
  studioCollectionModel.registerController(studioCollectionController)
  // studioCollectionController.initStudioCollection()
  fbTest.setDataTriggers()

  // App Controller Setup
  var appController = new App.Controller()
  var appView = new App.View()

  appView.registerEventDelegate(appController)
  appView.bindEvents()
  appController.registerStudioCollectionController(studioCollectionController, "renderStudioCollection")
  appController.registerStudioController(studioCollectionController, "loadInitialStudio")


  //Studio Setup - TODO cleanup when search is complete
  songManager = new Data.SongManager();
  songManager.init()
  var searchView = new Search.View()
  searchController = new Search.Controller( searchView,  songManager )
  searchController.registerSongSelectionSubscriber(studioCollectionController, "addSong")
  appController.registerSearchController(searchController, "loadWidget")
  searchView.registerEventDelegate(searchController, { search: "searchSongs", songSelection: "selectSong" })
  searchView.bindEvents()
  // studioController.init();

})