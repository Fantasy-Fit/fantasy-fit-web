class AddColumnsToParticipants < ActiveRecord::Migration[7.0]
  def change
    add_column :participants, :username, :string
    add_column :participants, :user_total_points, :integer
  end
end
