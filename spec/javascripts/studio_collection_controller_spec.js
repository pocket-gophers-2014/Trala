describe("Studio Collection Controller", function(){
  beforeEach(function(){
    testStudioView = new Studio.View();
    testStudioCollectionModel = new StudioCollection.Model();
    testStudioCollectionView = new StudioCollection.View();
    testGeolocation = new Data.LocationManager()
    testCurrentUserState = 'collectionPage'


    studioCollectionController = new StudioCollection.Controller({studioView: testStudioView, studioCollectionModel: testStudioCollectionModel, studioCollectionView: testStudioCollectionView, geoLocation: testGeolocation})
  });

  it("should be defined", function(){
    expect(studioCollectionController).toBeDefined();
  })
})