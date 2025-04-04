import 'dotenv/config'
import { Client,Events,GatewayIntentBits } from "discord.js";
const token =  process.env.DISCORD_TOKEN
import axios from 'axios';
// Importing essentials from discord.js.
// First import step is to setup our client that would login into discord and helping us to interact with our server on discord
const client = new Client({intents:[GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent]})
// Intent meaning what is that we want our bot to do.
// using the client to listen the messages and respond on them
client.on('messageCreate', (messgaevalue) => {
    if(messgaevalue.author.bot) return 
})

 client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand) return;
    // This line helps to ensure that the bot only interacts to the slash command not other events like button presses and menu selection.
     
     if(interaction.commandName === 'joke'){
      const response = await axios.get('https://icanhazdadjoke.com/',{
        headers :{Accept : 'application/json'}
        // This line would make sure that we receive the data in json format meaning that our bot wants the data
        // in json format.
      })
      // Axios is helping us to make an get request to the joke api to fetch data from it.
      //
      await interaction.reply(response.data.joke)
      // Finally getting the joke from the response and telling our bot to give the user.
     }

 })

client.login(token)
 