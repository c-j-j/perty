defmodule Perty.Repo.Migrations.CreateStory do
  use Ecto.Migration

  def change do
    create table(:stories) do
      add :description, :string

      timestamps()
    end

  end
end
