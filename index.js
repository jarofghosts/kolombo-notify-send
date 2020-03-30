#!/usr/bin/env node

const http = require("http")
const url = require("url")
const fs = require("fs")

const meow = require("meow")

const server = process.env.KOLOMBO_SERVER
const silentFailure = Boolean(process.env.KOLOMBO_NOTIFY_SEND_SILENT_FAIL)

const cli = meow({flags: {icon: {type: "string"}}})

if (!server) {
  if (silentFailure) return

  console.error("KOLOMBO_SERVER not set")
  process.exit(1)
}

const data = {title: cli.input[0], message: cli.input[1], server}

if (cli.flags.icon) {
  data.icon = fs.readFileSync(cli.flags.icon).toString("base64")
  data.iconFilename = cli.flags.icon
}

const {hostname, port} = url.parse(server)

const body = JSON.stringify(data)

const request = http.request(
  {
    method: "POST",
    hostname,
    port,
    path: "/notification",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body)
    }
  },
  res => {
    if (res.statusCode !== 200) {
      if (silentFailure) return
      console.log(
        JSON.stringify(
          {title: data.title, message: data.message, server},
          null,
          2
        )
      )
      console.error("error communicating with kolombo server")
      process.exit(1)
    }
  }
)

request.write(body)
request.end()
