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

  it("returns trackData when 'fetchCurentTrackStatus' is called", function(){

  }),

  it("returns the state of the model when 'fetchStudioCollection' is called", function(){
    expect(studioCollectionController.fetchStudioCollection()).toEqual(testStudioCollectionModel.state)
  }),

  it("returns the list_room handlebars template when buildStudioCollectionTemplate is called", function(){
    expect(studioCollectionController.buildStudioCollectionTemplate("fakeStudioCollection")).toEqual(HandlebarsTemplates['list_room']("fakeStudioCollection"))
  }),

  it("returns the player handlebars template when 'buildPlayer' is called", function(){
    expect(studioCollectionController.buildPlayer("fakeSong")).toEqual(HandlebarsTemplates['player']("fakeSong"))
  }),

  it("returns the song_basket_item handlebars template when 'buildPlaylist' is called", function(){
    expect(studioCollectionController.buildPlaylist("fakePlaylist")).toEqual(HandlebarsTemplates['song_basket_item']("fakePlaylist"))
  }),

  it("calls 'buildPlayer' from 'loadStudioWithPlayer'", function(){
    spyOn(studioCollectionController, 'buildPlayer')
    studioCollectionController.loadStudioWithPlayer("fakeSong")
    expect(studioCollectionController.buildPlayer).toHaveBeenCalled();
  })

  it("calls 'draw' from 'loadStudioWithPlayer'", function(){
    spyOn(studioCollectionController, 'buildPlayer')
    studioCollectionController.loadStudioWithPlayer("fakeSong")
    expect(studioCollectionController.buildPlayer).toHaveBeenCalled();
  }),

  it("defines 'loadInitialStudio'", function(){
    expect(studioCollectionController.loadInitialStudio).toBeDefined();
  })
})