describe("Studio Collection Model", function(){
  beforeEach(function(){
    studioCollectionModel = new StudioCollection.Model
    studioCollectionModel.subscriber = jasmine.createSpyObj('subscriber', ['addStudio', 'modifyStudioState'])
  });

  it("is defined", function(){
    expect(studioCollectionModel).toBeDefined();
  }),

  it("calls 'addStudioToSubscriber' from 'createNewStudio'", function(){
    spyOn(studioCollectionModel, 'addStudioToSubscriber')
    studioCollectionModel.createNewStudio({ name: "fakeName", data: { listeners: "fakeNumber", playlist: "fakePlaylist" }})
    expect(studioCollectionModel.addStudioToSubscriber).toHaveBeenCalled();
  }),

  it("calls 'packageStudioData' when 'addStudioToSubscriber' is called", function(){
    spyOn(studioCollectionModel, 'packageStudioData')
    studioCollectionModel.addStudioToSubscriber("fakeStudioData")
    expect(studioCollectionModel.packageStudioData).toHaveBeenCalled();
  }),

  it("calls 'updateCollectionState' in 'subscriberStateReactor' if the passed-in action is 'add'", function(){
    spyOn(studioCollectionModel, 'updateCollectionState')
    studioCollectionModel.subscriberStateReactor("fakeStudioData", "add")
    expect(studioCollectionModel.updateCollectionState).toHaveBeenCalled();
  }),

  it("calls 'removeStudio' in 'subscriberStateReactor' if the passed-in action is 'destroy'", function(){
    spyOn(studioCollectionModel, 'removeStudio')
    studioCollectionModel.subscriberStateReactor("fakeStudioData", "destroy")
    expect(studioCollectionModel.removeStudio).toHaveBeenCalled();
  }),

  it("returns studioData when 'packageStudioData' is called", function(){
    var studio = { name: "fakeName", listeners: "fakeListeners", active: "fakeActive", removelistener: "fakeRemoveListener", playlist: "fakePlaylist" }
    expect(studioCollectionModel.packageStudioData(studio)).toEqual({ name: "fakeName", data: { flagtype: null, listeners: "fakeListeners", active: "fakeActive", removelistener: "fakeRemoveListener", playlist: "fakePlaylist" }})
  }),

  it("calls 'modifyStudioState' on the subscriber when 'updateStudioState' is called", function(){
    studioCollectionModel.updateStudioState("fakeNewStudioData")
    expect(studioCollectionModel.subscriber.modifyStudioState).toHaveBeenCalled();
  }),

  it("sets the model subscriber as the passed in argument in 'registerStudioCollectionSubscriber'", function(){
    studioCollectionModel.registerStudioCollectionSubscriber("fakeSubscriber")
    expect(studioCollectionModel.subscriber).toEqual("fakeSubscriber")
  }),

  it("sets the model controller as the passed in controller in 'registerController'", function(){
    studioCollectionModel.registerController("fakeController")
    expect(studioCollectionModel.controller).toEqual("fakeController")
  })
})