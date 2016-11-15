defmodule Perty.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  intercept ["new_user"]

  def handle_in("new_user", message, socket) do
    username = message["username"]

    changeset = Perty.User.changeset(%Perty.User{}, %{name: username})

    case Perty.Repo.insert(changeset) do
      {:ok, user} ->
        socket = assign(socket, :user_id, user.id)
        broadcast! socket, "new_user", %{username: username,
                                         user_id: user.id}

        {:reply, {:ok, %{user_id: user.id}}, socket}
      {:error, _} ->
        {:reply, {:error, %{issue: 'Unable to create user'}}, socket}
    end
  end

  def handle_out("new_user", message, socket) do
    if message.user_id != socket.assigns[:user_id] do
      push socket, "new_user", message
    end
    {:noreply, socket}
  end
end
