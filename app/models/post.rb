class Post < ApplicationRecord
  belongs_to :competition
  belongs_to :user
end
