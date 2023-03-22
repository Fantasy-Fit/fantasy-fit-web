class CreateCompetitions < ActiveRecord::Migration[7.0]
  def change
    create_table :competitions do |t|
      t.string :name
      t.string :identifier
      t.boolean :public

      t.timestamps
    end
  end
end
