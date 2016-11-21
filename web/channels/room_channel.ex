defmodule Perty.RoomChannel do
  use Phoenix.Channel

  def join("room:" <> room_id, message, socket) do
    case message do
      %{"user_id" => user_id} ->
        send(self, {:after_join, user_id})
        {:ok, socket}
      _ ->
        {:ok, socket}
    end
  end

  intercept ["new_user"]

  def handle_info({:after_join, user_id}, socket) do
    user = Perty.Repo.get(Perty.User, user_id)
    socket = assign(socket, :user_id, user.id)

    broadcast! socket, "new_user", user_presenter(user)

    push socket, "logged_in", user_presenter(user)
    {:noreply, socket}
  end

  def handle_in("register", message, socket) do
    username = message["username"]

    changeset = Perty.User.changeset(%Perty.User{}, %{name: username})

    case Perty.Repo.insert(changeset) do
      {:ok, user} ->
        socket = assign(socket, :user_id, user.id)
        broadcast! socket, "new_user", user_presenter(user)

        {:reply, {:ok, %{user_id: user.id}}, socket}
      {:error, _} ->
        {:reply, {:error, %{issue: 'Unable to create user'}}, socket}
    end
  end

  def handle_out("new_user", message, socket) do
    notify_others_of_new_user(message, socket)
    {:noreply, socket}
  end

  def notify_others_of_new_user(message, socket) do
    if message.user_id != socket.assigns[:user_id] do
      push socket, "new_user", message
    end
  end

  def user_presenter(user) do
    %{username: user.name,
      user_id: user.id}
  end
end
