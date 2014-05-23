require 'spec_helper'

describe PagesController do
  context "#index" do
    it "successfully visit the index page" do
      visit root_path
      page.should have_content('Create a room')
    end
  end
end