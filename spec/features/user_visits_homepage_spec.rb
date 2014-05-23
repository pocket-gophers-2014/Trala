require 'spec_helper'

feature 'User can visit the home page' do
  scenario 'enter home page', :js => true do
    visit root_path
    expect(page).to have_content('Join a room')
  end
end