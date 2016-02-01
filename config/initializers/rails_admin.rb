RailsAdmin.config do |config|

  ### Popular gems integration

  ## == Devise ==
  config.authenticate_with do
    warden.authenticate! scope: :user
  end
  config.current_user_method(&:current_user)

  ## == Cancan ==
  config.authorize_with :cancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.model 'Playlist' do
    list do
      field :title do
        pretty_value do
          bindings[:view].tag(:a, href: "/playlist/#{bindings[:object].slug}") << bindings[:object].title
        end
      end
      field :user_id do
        pretty_value do
          bindings[:view].render :partial => "admin/user", :locals => {:user => User.find(bindings[:object].user_id) }
        end
      end
      field :share_image do
        pretty_value do
          bindings[:view].tag(:img, { :src => bindings[:object].share_image.url, :width => 250, :height => 130 })
        end
      end
      field :created_at
    end
  end


end
