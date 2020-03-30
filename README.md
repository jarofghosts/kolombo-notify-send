# kolombo-notify-send

`notify-send` replacement for interacting with kolombo

## what is this

This module is meant to be used alongside the [kolombo-server](https://github.com/jarofghosts/kolombo)
in a Docker environment. It serves as the `notify-send` executable inside of Docker and forwards messages
to the kolombo-server, which notifies you on your host!

## usage

If you are looking to proxy notifications for a node app, the recommended usage is to install `kolombo-notify-send`
as a regular dependency and start your process with `npm`, which should put the executable in your `PATH`.

Alternatively you can install this executable globally with `npm i -g kolombo-notify-send`

### configuration

#### environment variables

- `KOLOMBO_SERVER` (required) - Full URL with protocol to kolombo-server instance. Example: `http://localhost:3000/`
- `KOLOMBO_NOTIFY_SEND_SILENT_FAILED` (optional) - Set to any value to prevent logging errors and exiting with an
  error code if the notification cannot be proxied.

## license

MIT
