require 'spec_helper'

feature 'User can visit the home page' do
  scenario 'Home page renders', :js => true do
    visit root_path
    expect(page).to have_content('Create a room')
  end
end