defmodule Perty.RoomChannelTest do
  use Perty.ConnCase
  use Phoenix.ChannelTest

  test "creates a new user" do
    {:ok, _, socket} = socket("user:id", %{})
    |> subscribe_and_join(Perty.RoomChannel, "room:lobby", %{})

    message = %{"username" => "Chris"}
    ref = push socket, "new_user", message
    assert_reply ref, :ok
    assert Repo.get_by(Perty.User, name: "Chris")
  end

  test "does broadcast back to all other users" do
    {:ok, _, socket} = socket("user:id", %{user_id: 1})
    |> subscribe_and_join(Perty.RoomChannel, "room:lobby", %{})

    broadcast_from socket, "new_user", %{user_id:  2}
    assert_push "new_user", %{user_id: 2}
  end

  test "does not broadcast back to new user" do
    {:ok, _, socket} = socket("user:id", %{user_id: 1})
    |> subscribe_and_join(Perty.RoomChannel, "room:lobby", %{})

    broadcast_from socket, "new_user", %{user_id:  1}
    refute_push "new_user", %{user_id: _}
  end
end
