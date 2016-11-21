defmodule Perty.RoomView do
  use Perty.Web, :view

  def render("index.json", %{rooms: rooms}) do
    %{data: render_many(rooms, Perty.RoomView, "room.json")}
  end

  def render("show.json", %{room: room}) do
    %{data: render_one(room, Perty.RoomView, "room.json")}
  end

  def render("room.json", %{room: room}) do
    %{id: room.id,
      title: room.title}
  end
end
