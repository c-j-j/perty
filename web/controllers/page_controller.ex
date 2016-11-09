defmodule Perty.PageController do
  use Perty.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
