class AddTextColumnPost < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :description, :string
  end
end
