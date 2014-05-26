require 'spec_helper'

feature 'User can visit the home page' do
  scenario 'Renders home page', :js => true do
    visit root_path
    expect(page).to have_content('Join')
  end
end