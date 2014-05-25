require 'spec_helper'

feature 'User can create a new studio' do
  scenario 'click on create room button', :js => true do
      visit root_path
      page.find("#create-studio").click
      expect(page).to have_content('Your playlist')
  end
end


# This test is currently breaking because the AJAX call is not going through in Firefox (which is the browser that Capybara is running in). I'm pushing it up right now and it SHOULD work, but we need to look into why stuff is breaking in Firefox
feature 'Search renders new results' do
  scenario 'render results after searching', :js => true do
    visit root_path
    page.find("#create-studio").click
    fill_in('all_search', :with => 'Beethoven')
    page.find("Submit").click #This line not working, will come back to fix it
    expect(page).to have_content('Song Id:')
  end
end