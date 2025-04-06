import { version } from "mongoose"
import { REST, Routes } from 'discord.js';
import 'dotenv/config'
const token = process.env.DISCORD_TOKEN
const clientid = process.env.CLIENT_ID
const commands = [
    {
        name:'joke',
        description:'Replies the user with an joke from an custom API',
    },
    {
      name:'chatclear',
      description: 'Helps to clear the chat'
    }
];

const rest = new REST({version: '10'}).setToken(token)

try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands(clientid), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
  // this code would help us to register our commands onto our server.