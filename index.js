(async () => {
  let process = require("process");
  process.on("uncaughtException", function (err) {
    console.log(`𝕖𝕣𝕣𝕠𝕣❕`);
    console.log(err);
  });
  const events = require("events");
  let Discord = require("discord.js");
  let Database = require("easy-json-database");
  let {
    MessageEmbed,
    MessageButton,
    MessageActionRow,
    Intents,
    Permissions,
    MessageSelectMenu,
  } = require("discord.js");
  let logs = require("discord-logs");
  const os = require("os-utils");
  const lyricsFinder = require("lyrics-finder");
  const write = require("write");
  let fs = require("fs");
  const devMode = typeof __E_IS_DEV !== "undefined" && __E_IS_DEV;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const s4d = {
    Discord,
    database: new Database(`./database.json`),
    fire: null,
    joiningMember: null,
    reply: null,
    tokenInvalid: false,
    tokenError: null,
    player: null,
    manager: null,
    Inviter: null,
    message: null,
    notifer: null,
    checkMessageExists() {
      if (!s4d.client)
        throw new Error(
          "You cannot perform message operations without a Discord.js client"
        );
      if (!s4d.client.readyTimestamp)
        throw new Error(
          "You cannot perform message operations while the bot is not connected to the Discord API"
        );
    },
  };
  s4d.client = new s4d.Discord.Client({
    intents: [
      Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0),
    ],
    partials: ["REACTION", "CHANNEL"],
  });
  s4d.client.on("ready", () => {
    console.log(s4d.client.user.tag + " is alive!");
  });
  logs(s4d.client);
  var prefix, arguments2, commandwithprefix, command;

  await s4d.client
    .login(
      "MTE4NzEyODUwMzEwNDE5MjUyMg.GbOGmx.vKk1q5l7D5MRluC8845ow7MKiwyVp0OhcOO6gs"
    )
    .catch((e) => {
      s4d.tokenInvalid = true;
      s4d.tokenError = e;
      if (e.toString().toLowerCase().includes("token")) {
        throw new Error("An invalid token was provided!");
      } else {
        throw new Error("Intents are not turned on!");
      }
    });

  s4d.client.on("ready", async () => {
    prefix = "!";
    s4d.client.application?.commands.create({
      name: "test",
      description: "test me",
      options: [],
    });
  });

  const http = require("http");
  const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("This site was created to keep bot on 25/8");
  });
  server.listen(3000);

  s4d.client.on("messageCreate", async (s4dmessage) => {
    arguments2 = s4dmessage.content.split(" ");
    commandwithprefix = arguments2.splice(0, 1)[0];
    if ((commandwithprefix || "").startsWith(prefix || "")) {
      command = commandwithprefix.slice(
        prefix.length + 1 - 1,
        commandwithprefix.length
      );
      if (command == "say") {
        s4dmessage.channel.send({
          content: String(""),
        });
        s4dmessage.channel.send({
          content: String(arguments2.join(" ")),
        });
      }
    }
  });

  return s4d;
})();
