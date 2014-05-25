describe("Song Manager", function() {
	describe("searchSongs", function(){
		
		beforeEach(function(){
			soundCloud = jasmine.createSpyObj('soundCloud', ['get'])
			songManager = new Data.SongManager();
			// songManager.soundCloud = soundCloud
		})

		it("should call soundCloud#get ", function(){
			songManager.searchSongs('2pac', 'function')
			expect(soundCloud.get).toHaveBeenCalled();
		})
	})
})