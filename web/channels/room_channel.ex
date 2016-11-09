defmodule Perty.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    socket = assign(socket, :bar, "BAR")
    {:ok, socket}
  end

  intercept ["new_user"]

  def handle_in("new_user", message, socket) do
    username = message["username"]
    user_id = message["user_id"]
    socket = assign(socket, :foo, "Bar")
    broadcast! socket, "new_user", %{username: username, user_id: user_id}
    {:noreply, socket}
  end

  def handle_out("new_user", message, socket) do
    if message.user_id == socket.assigns[:user_id] do
      push socket, "user_joined", %{users: "All Users"}
    else
      push socket, "user_joined", %{new_user: message.username}
    end
    {:noreply, socket}
  end

end
