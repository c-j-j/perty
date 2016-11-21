defmodule Perty.Repo.Migrations.CreateRoom do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :title, :string

      timestamps()
    end

  end
end
