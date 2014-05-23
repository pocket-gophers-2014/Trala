class CreateApis < ActiveRecord::Migration
  def change
    create_table :apis do |t|

      t.timestamps
    end
  end
end
