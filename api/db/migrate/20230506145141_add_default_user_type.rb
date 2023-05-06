class AddDefaultUserType < ActiveRecord::Migration[7.0]
  def change
    change_column_default :users, :user_type, "player"
  end
end
