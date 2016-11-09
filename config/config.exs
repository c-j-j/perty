# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :perty,
  ecto_repos: [Perty.Repo]

# Configures the endpoint
config :perty, Perty.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "/NVXfPfZLl/n4Ghrj7RPif9Ds9lVKSC9Uk3q16mjktDiv1XQQWgQmRmQT7m3GlE3",
  render_errors: [view: Perty.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Perty.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
