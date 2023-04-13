class AddIconTocompetitions < ActiveRecord::Migration[7.0]
  def change
    add_column :competitions, :icon, :string
  end
end
