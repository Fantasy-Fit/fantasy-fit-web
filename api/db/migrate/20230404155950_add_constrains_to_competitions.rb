class AddConstrainsToCompetitions < ActiveRecord::Migration[7.0]
  def change
    change_column_null :competitions, :identifier, false 
    add_index :competitions, :identifier, unique: true
  end
end
