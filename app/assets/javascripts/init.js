$(document).ready(function() {
  // App controller/view setup
  var appController = new App.Controller();
  var appView = new App.View();
  appView.registerEventDelegate(appController);
  appView.bindEvents();
  
  //Geo location setup
  locationManager = new Data.LocationManager();
  locationManager.registerBrowserCoords();

  //Firebase setup
  var firebaseORM = new Data.FirebaseORM();
  var firebaseManager = new Data.FirebaseManager('https://trala.firebaseio.com/studioCollection', firebaseORM);
  firebaseManager.setDataTriggers();
  firebaseORM.registerFirebaseManager(firebaseManager);

  //Studio Collection Setup
  var studioCollectionModel = new StudioCollection.Model();
  var studioCollectionView = new StudioCollection.View();
  var studioView = new Studio.View();
  var studioBuilderView = new StudioBuilder.View();
  var studioBuilderController = new StudioBuilder.Controller(studioBuilderView, locationManager);
  var studioCollectionController = new StudioCollection.Controller({studioCollectionModel:studioCollectionModel,
                                                                    studioCollectionView: studioCollectionView,
                                                                    locationManager: locationManager,
                                                                    studioView: studioView,
                                                                    });
  firebaseORM.registerSubscriber(studioCollectionModel)
  studioCollectionModel.registerStudioCollectionSubscriber(firebaseORM);
  studioCollectionModel.registerController(studioCollectionController);
  studioCollectionView.registerEventDelegate(studioCollectionController, 'initUserStudioState');
  studioCollectionView.bindEvents();
  appController.registerStudioCollectionController(studioCollectionController, "renderCollectionPage");
  appController.registerStudioController(studioCollectionController, "loadInitialStudio");
  studioBuilderController.registerNewStudioSubscriber( studioCollectionController, 'initStudioCreation');


  //Song manager setup
  var songManager = new Data.SongManager();
  songManager.init()

  //Seach Setup
  var searchView = new Search.View()
  searchController = new Search.Controller( searchView,  songManager )
  searchController.registerSongSelectionSubscriber(studioBuilderController, "addSong")
  appController.registerSearchController(searchController, "loadWidget")
  searchView.registerEventDelegate(searchController, { search: "searchSongs", songSelection: "selectSong" })
  searchView.bindEvents()
})