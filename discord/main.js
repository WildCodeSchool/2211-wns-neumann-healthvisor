import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ],
});

console.log(process.env.TOKEN);

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  console.log("#ID Channel : ", process.env.CHANNEL_ID);
  const channel = client.channels.cache.get(process.env.CHANNEL_ID);

  const message = process.argv[2]
  console.log('message: ', message);
  channel.send(message);

  client.destroy();
});

console.log("#Token : ", process.env.TOKEN);
client.login(process.env.TOKEN);
