defmodule Perty.RoomChannelTest do
  use Perty.ConnCase
  use Phoenix.ChannelTest

  test "creates a new user" do
    {:ok, _, socket} = socket("user:id", %{})
    |> subscribe_and_join(Perty.RoomChannel, "room:lobby")

    message = %{"username" => "Chris"}
    ref = push socket, "register", message
    assert_reply ref, :ok
    assert Repo.get_by(Perty.User, name: "Chris")
  end

  test "does broadcast back to all other users" do
    {:ok, _, socket} = socket("user:id", %{user_id: 1})
    |> subscribe_and_join(Perty.RoomChannel, "room:lobby")

    broadcast_from socket, "new_user", %{user_id:  2}
    assert_push "new_user", %{user_id: 2}
  end

  test "does not broadcast back to new user" do
    {:ok, _, socket} = socket("user:id", %{user_id: 1})
    |> subscribe_and_join(Perty.RoomChannel, "room:lobby")

    broadcast_from socket, "new_user", %{user_id:  1}
    refute_push "new_user", %{user_id: _}
  end

  test "logs user in when they join" do
    {:ok, user} = Perty.User.changeset(%Perty.User{}, %{name: "username"})
    |> Perty.Repo.insert

    user_id = user.id

    {:ok, _, _socket} = socket("user:id", %{})
    |> subscribe_and_join(Perty.RoomChannel, "room:lobby", %{"user_id" => user_id})

    assert_push "logged_in", %{user_id: user_id}
  end

  test "broadcasts to other user when new user logins" do
    {:ok, user} = Perty.User.changeset(%Perty.User{}, %{name: "username"})
    |> Perty.Repo.insert

    user_id = user.id

    {:ok, _, _socket} = socket("user:id", %{user_id: 1})
    |> subscribe_and_join(Perty.RoomChannel, "room:lobby", %{"user_id" => user_id})

    assert_broadcast "new_user", %{user_id: user_id}
  end
end
