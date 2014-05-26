describe("Studio Collection Controller", function(){
  beforeEach(function(){
    testStudioView = jasmine.createSpyObj('testStudioView', ['redrawPlaylist', 'draw'])
    testStudioCollectionModel = jasmine.createSpyObj('testStudioCollectionModel', ['createNewStudio', 'removeStudio', 'fetchStudio', 'currentStudio', 'updateStudioTrack', 'state'])
    testStudioCollectionView = jasmine.createSpyObj('testStudioCollectionView', ['appendStudio', 'removeStudio', 'modifyStudio', 'draw', 'updateTrackState', 'renderStudioCollection'])
    testGeolocation = 'testGeoLocation'
    studioCollectionController = new StudioCollection.Controller({studioView: testStudioView, studioCollectionModel: testStudioCollectionModel, studioCollectionView: testStudioCollectionView, geoLocation: testGeolocation})
    studioCollectionController.currentUserState = "collectionPage"
  });

  it("should be defined", function(){
    expect(studioCollectionController).toBeDefined();
  }),

  it("calls 'createNewStudio' from 'createStudio'", function(){
      studioCollectionController.createStudio("fakeStudioData");
      expect(testStudioCollectionModel.createNewStudio).toHaveBeenCalled();
  }),

  it("calls 'removeStudio' from 'destroyStudio'", function(){
      studioCollectionController.destroyStudio("fakeStudioData");
      expect(testStudioCollectionModel.removeStudio).toHaveBeenCalled();
  }),

  it("calls 'renderStudioCollection' from 'constructStudio' if the currentUserState is 'collectionPage'", function(){
    spyOn(studioCollectionController, 'renderStudioCollection')
    studioCollectionController.constructStudio("fakeStudioData")
    expect(studioCollectionController.renderStudioCollection).toHaveBeenCalled();
  }),

  it("calls 'removeStudio' from 'destructStudio' if the currentUserState is 'collectionPage'", function(){
    studioCollectionController.destructStudio("fakeStudioData")
    expect(testStudioCollectionView.removeStudio).toHaveBeenCalled();

  }),

  it("calls 'testStudioCollectionView.modifyStudio' from 'modifyRenderedStudio' if currentUserState is 'collectionPage'", function(){
    studioCollectionController.modifyRenderedStudio("fakeStudioData")
    expect(testStudioCollectionView.modifyStudio).toHaveBeenCalled();
  })
})