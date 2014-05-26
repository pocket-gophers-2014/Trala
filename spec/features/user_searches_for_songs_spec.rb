require 'spec_helper'

feature 'User can create a new studio' do
  scenario 'click on create room button', :js => true do
      visit root_path
      page.find("#create-studio").click
      expect(page).to have_content('Your playlist')
  end
end

feature 'Search renders new results' do
  scenario 'render results after searching', :js => true do
    visit root_path
    page.find("#create-studio").click
    fill_in('all_search', :with => 'Beethoven')
    page.find('#search-submit').click
    expect(page).to have_content('Song Id:')
  end
end