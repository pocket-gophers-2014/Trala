describe("Search Controller", function(){
  beforeEach(function(){
    testView = jasmine.createSpyObj('testView', ['updateResults', 'drawInitial']);
    testSongManager = jasmine.createSpyObj('testSongManager', ['searchSongs'])
    searchController = new Search.Controller(testView, testSongManager)
  });

  it("should be defined", function(){
    expect(searchController).toBeDefined();
  }),

  it("has function 'loadWidget'", function(){
    expect(searchController.loadWidget).toBeDefined();
  }),

  it("has function 'searchSongs'", function(){
    expect(searchController.searchSongs).toBeDefined();
  }),

  it("has function 'updateResults'", function(){
    expect(searchController.updateResults).toBeDefined();
  }),

  it("has function 'buildSearchWidget'", function(){
    expect(searchController.buildSearchWidget).toBeDefined();
  }),

  it("has function 'buildResultsTemplate'", function(){
    expect(searchController.buildResultsTemplate).toBeDefined();
  }),

  it("calls 'buildSearchWidget' and returns the search_page Handlebars template", function(){
    expect(searchController.buildSearchWidget()).toEqual(HandlebarsTemplates.search_page)
  }),

  it("calls 'searchSongs' with the songManager when 'searchSongs' is called", function(){
    searchController.searchSongs("fake query")
    expect(testSongManager.searchSongs).toHaveBeenCalled();
  }),

  it("calls 'drawInitial' with the view when 'loadWidget' is called", function(){
    searchController.loadWidget()
    expect(testView.drawInitial).toHaveBeenCalled();
  })

})