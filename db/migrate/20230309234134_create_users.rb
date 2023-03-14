class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.string :avatar
      t.string :gender
      t.integer :year_of_birth
      t.string :location

      t.timestamps
    end
  end
end
