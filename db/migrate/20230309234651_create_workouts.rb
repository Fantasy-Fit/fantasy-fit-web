class CreateWorkouts < ActiveRecord::Migration[7.0]
  def change
    create_table :workouts do |t|
      t.string :activity
      t.integer :duration
      t.string :intensity
      t.datetime :date
      t.integer :avg_HR
      t.integer :calories
      t.integer :points
      t.integer :claps
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :competition, null: false, foreign_key: true

      t.timestamps
    end
  end
end
