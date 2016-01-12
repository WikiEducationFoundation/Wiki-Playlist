module ApplicationHelper
  def is_admin
    if user_signed_in?
      return current_user.admin
    end
  end
end
