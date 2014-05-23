module Api
  class Creator
    attr_reader :client
    def initialize
      @client = SoundCloud.new({
      :client_id => ENV['CLIENT_ID'],
      :client_secret => ENV['CLIENT_SECRET'],
      :username => ENV['USERNAME'],
      :password => ENV['PASSWORD']
      })
    end

    def create_room title
      @client.post '/playlists', :playlist => {
        :title => title,
        :sharing => 'public'
      }
    end

    def add_song playlist, song
      # grab the playlist url ( i.e. /ayyzee/nameOfPlaylist )
      playlist = @client.get(playlist).first 
      @client.put( playlist.uri, :playlist => {
        :track => song 
      })
    end

  end
end
