class CreatePatients < ActiveRecord::Migration[7.1]
  def change
    create_table :patients do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :phone, null: false
      t.date :date_of_birth, null: false
      t.string :address, null: false
      t.string :gender, null: false
      t.text :medical_history
      t.timestamps
    end

    add_index :patients, :email, unique: true
  end
end