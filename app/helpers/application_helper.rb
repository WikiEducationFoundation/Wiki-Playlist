module ApplicationHelper
  def is_admin
    if user_signed_in?
      return current_user.admin
    end
  end

  def truncate_summary(text)
    truncate(text, :length => 300, :omission => '...')
  end

  def truncate_username(text)
    truncate(text, :length => 20, :omission => '...')
  end

  def playlist_caption(caption)
    if caption.nil? || caption.empty?
      return "Share the joy of knowledge"
    else
      return caption
    end
  end
end
