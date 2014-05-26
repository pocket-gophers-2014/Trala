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
  }),

  // HEY***come back to test initUserStudioState***HEY

  it("calls 'fetchStudioCollection' from 'renderStudioCollection'", function(){
    spyOn(studioCollectionController, 'fetchStudioCollection')
    studioCollectionController.renderStudioCollection()
    expect(studioCollectionController.fetchStudioCollection).toHaveBeenCalled();
  }),

  it("calls 'buildStudioCollectionTemplate' from 'renderStudioCollection'", function(){
    spyOn(studioCollectionController, 'buildStudioCollectionTemplate')
    studioCollectionController.renderStudioCollection()
    expect(studioCollectionController.buildStudioCollectionTemplate).toHaveBeenCalled();
  }),

  it("calls 'studioCollectionView.draw' from 'renderStudioCollection'", function(){
    studioCollectionController.renderStudioCollection()
    expect(testStudioCollectionView.draw).toHaveBeenCalled();
  }),

// HEY***come back to test 'playTrack'***HEY

  it("calls 'fetchCurrentTrackStatus' from 'fetchTrackState'", function(){
    spyOn(studioCollectionController, 'fetchCurrentTrackStatus')
    studioCollectionController.fetchTrackState()
    expect(studioCollectionController.fetchCurrentTrackStatus).toHaveBeenCalled();
  }),

  it("calls 'updateStudioTrack' from 'fetchTrackState'", function(){
    spyOn(studioCollectionController, 'fetchCurrentTrackStatus')
    studioCollectionController.fetchTrackState()
    expect(testStudioCollectionModel.updateStudioTrack).toHaveBeenCalled();
  }),

  

  it("calls 'draw' from 'loadStudioWithPlayer'", function(){
    spyOn(studioCollectionController, 'buildPlayer')
    studioCollectionController.loadStudioWithPlayer("fakeSong")
    expect(studioCollectionController.buildPlayer).toHaveBeenCalled();
  })
})