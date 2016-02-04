describe "Creating a Playlist", :js => true, :driver => :webkit do
  # before do
  #   include Devise::TestHelpers, type: :feature
  #   Capybara.current_driver = :selenium
  #   page.driver.browser.manage.window.resize_to(1920, 1080)
  # end

  # it "works" do
  #   visit '/'
  #   expect(page).to have_content 'Wikipedia Playlists'
  #   expect(page).to have_content 'Lorem ipsum In ea nostrud do ullamco veniam officia velit aliqua pariatur fugiat cupidatat labore deserunt eu tempor sunt nulla laborum culpa voluptate laborum pariatur mollit.'
  #   expect(page).to have_content 'Create a Playlist'
  #   click_link 'Create a Playlist'
  #   expect(page).to have_content 'Wikipedia Playlist Builder'
  #   expect(page).to have_content 'Celebrate the joy of knowledge by creating a Playlist of your 3–5 favorite Wikipedia articles, then sharing your Playlist on social media.'
  #   click_button 'Start'
  #   expect(page).to have_content 'Name of your Playlist'
  #   fill_in('Playlist Name', :with => 'An Amazing Playlist Title')
  #   click_button 'Next'
  #   expect(page).to have_content 'Lets add your first Wikipedia Article!'
  #   click_button 'Add Wikipedia Article', :match => :first
  #   expect(page).to have_content 'Add Article'
  #   fill_in('Search', :with => 'Leonardo da Vinci')
  #   expect(page).to have_content 'Search Results For: "Leonardo da Vinci"'
  #   expect(page).to have_content 'Leonardo da Vinci'
  #   expect(page).to have_content 'Italian Renaissance polymath'
  #   click_button 'Add to Playlist', :match => :first
  #   page.find('.article-card__title:nth-of-type(1)', :match => :first, :text => 'Leonardo da Vinci').text
  # end
end