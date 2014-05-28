$(document).ready(function() {
  //geoLocaitonSetup
  locationManager = new Data.LocationManager()
  locationManager.registerBrowserCoords(navigator) // Better name?: registerBrowsersCoords?

  /* 1.  Did you mean for both of these to be globals? Not a fan, if so.*/
  /* 2.  Why not just call this a studioCollection?  having "Model" in the name
   * doesn't make it a model, being the thing that is modeled in views and
   * contexts makes it a model.
   */
  studioCollectionModel = new StudioCollection.Model()
  studioCollectionView = new StudioCollection.View()

  var studioView = new Studio.View(); // Remember long-winded discussion about calling this thing a PlayerView or something like that.  steven is boring.

  /* Hm, something funny about this opts object here...why is it just a mirror
   * of what's on the right side (barring geoLocation?).  I don't see what
   * these keys point to based on a quick read.   Why is it the case that I
  * need
  * a studioCollectionModel a studioCollectionView and a studioView to
  * initialize a StudioCollection.Controller?*/

  studioCollectionController = new StudioCollection.Controller({studioCollectionModel:studioCollectionModel,
                                                               studioCollectionView: studioCollectionView,
                                                               //studioView: studioView,
                                                               playerView: musicPlayerView,
                                                               geoLocation: locationManager
  })

  /* since you've hard coded this to 'click' ; maybe
   * registerClickEventDelegate?
   */


  /* OR. maybe collapse the following two lines into one call? */
  studioCollectionView.registerEventDelegate(studioCollectionController, 'initUserStudioState')
  studioCollectionView.bindEvents()

  /* confused about the name `fbTest` -- what's testing here? */
  fbTest = new Data.FirebaseManager('https://trala.firebaseio.com/studioCollection', studioCollectionModel)
  studioCollectionModel.registerStudioCollectionSubscriber(fbTest)
  studioCollectionModel.registerController(studioCollectionController)

  /* seems like this registration could go into the new() call above...*/
  // studioCollectionController.initStudioCollection()
  fbTest.setDataTriggers()


  // studioCollectionController.initStudioCollection()

  // Since this is so important, it seems like it should happen first?  This is
  // your opening landing page, right?
  //
  // App Controller Setup
  /* You're telling me that your Application's overall controller is dependent
   * on some sub-controller?  Specifically in the lines where you call
   * registerStudioCollectionController
   *
   * Also people expect applicationControllers to be declared at the top of
   * their defining scope.
   */
  var appController = new App.Controller()
  var appView = new App.View()

  appView.registerEventDelegate(appController)
  appView.bindEvents()

  /* these arguments suggest to me that there's a registration and a callback
   * relationship afoot here, but the method name on appController does not
   * hint at that being what's going on
   *
   * I *think* what you have here is an implementation of the pub/sub pattern
   *
   */
  // This is awesomely elegant, but it feels a bit over-engineered to me.  And
  // I love me some over-engineering.  But...i think..maybe just a simple name
  // without this hint of pub/sub patterns and super OO monkey-foo is a better
  // way to go.
  appController.registerStudioCollectionController(studioCollectionController, "renderStudioCollection")
  appController.registerStudioController(studioCollectionController, "loadInitialStudio")


  //Studio Setup - TODO cleanup when search is complete
  songManager = new Data.SongManager();
  songManager.init()

  var searchView = new Search.View()
  searchController = new Search.Controller( searchView,  songManager )
  searchController.registerSongSelectionSubscriber(studioCollectionController, "addSong")

  /* This feels a bit wonky, possible overengineering (said Phil!  he's the
   * guy!  not me.  i'm nice.)
   */
  appController.registerSearchController(searchController, "loadWidget")
  searchView.registerEventDelegate(searchController, { search: "searchSongs", songSelection: "selectSong" })
  searchView.bindEvents()
  // studioController.init();

})
