describe("Search Controller", function(){
  beforeEach(function(){
    testView = jasmine.createSpyObj('testView', ['updateResults']);
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
  })

})