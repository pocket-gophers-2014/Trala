require 'spec_helper'

describe PagesController do
  context "#index" do
    xit "successfully visit the index page" do
      get :index
      expect(response).to have_content('Create a room')
    end
  end
end