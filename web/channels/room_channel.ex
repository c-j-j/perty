
defmodule Perty.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  def handle_in("new_user", message, socket) do
    username = message["username"]

    changeset = Perty.User.changeset(%Perty.User{}, %{name: username})

    case Perty.Repo.insert(changeset) do
      {:ok, user} ->
        broadcast! socket, "new_user", %{username: username}
        {:reply, {:ok, %{user_id: user.id}}, socket}
      {:error, changeset} ->
        {:reply, {:error, %{issue: 'Unable to create user'}}, socket}
    end
  end
end
