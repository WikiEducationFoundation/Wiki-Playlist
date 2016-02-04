module ApplicationHelper
  def is_admin
    if user_signed_in?
      return current_user.admin
    end
  end

  def truncate_summary(text)
    truncate(text, :length => 300, :omission => '...')
  end
end
