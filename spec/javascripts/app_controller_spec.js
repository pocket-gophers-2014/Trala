describe("App Controller", function(){
	var appController;
   beforeEach(function() { appController = new App.Controller(); });

	it("should be defined", function(){
		expect(appController).toBeDefined();
	}),

	it("has function 'loadNewStudio' ", function(){
		expect(appController.loadNewStudio).toBeDefined();
	}),

	it("has function 'loadStudioCollection' ", function(){
		expect(appController.loadStudioCollection).toBeDefined();
	}),

	it("has function 'registerStudioCollectionController' ", function(){
		expect(appController.registerStudioCollectionController).toBeDefined();
	}),

	it("has function 'registerStudioController' ", function(){
		expect(appController.registerStudioController).toBeDefined();
	}),

	it("has function 'registerSearchController' ", function(){
		expect(appController.registerSearchController).toBeDefined();
	})
});