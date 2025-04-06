import 'dotenv/config'
import Sentiment from 'sentiment';
import { Client,Events,GatewayIntentBits } from "discord.js";
const token =  process.env.DISCORD_TOKEN
const sentiment = new Sentiment()
import axios from 'axios';
// Importing essentials from discord.js.
// First import step is to setup our client that would login into discord and helping us to interact with our server on discord
const client = new Client({intents:[GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent]})
// Intent meaning what is that we want our bot to do.
// using the client to listen the messages and respond on them
client.on('messageCreate', async (messgaevalue) => {
    if(messgaevalue.author.bot) return 
    // we would be using sentiment to analyze the message sentiment
     const analysisresult = sentiment.analyze(messgaevalue.content)

      if(analysisresult.score <0){
        const motivationalresponse = await axios.get('https://zenquotes.io/api/quotes/random',)
        await messgaevalue.reply(motivationalresponse.data[0].q)
// The API is returning us with contents, quotes and then a quote so we would access the contents first, then go to the quotes array, taking the first quote and access only the 
// quote property from it.
      }
      else if(analysisresult.score > 0 ){
        var jokeresponse = await axios.get('https://icanhazdadjoke.com/',{
          headers: {Accept : 'application/json'}
        })
        await messgaevalue.reply(jokeresponse.data.joke)
      }
      else{
        messgaevalue.reply('you want to talk I am there dont worry about the world')
      }
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
     else if(interaction.commandName === 'chatclear'){
      let messages = await interaction.channel.messages.fetch({limit:50})
      await interaction.channel.bulkDelete(messages,true)
      interaction.reply('Chats cleared')
      // we can use a do while loop, like the messages would be clearing until all the messages in the channel gets empty.
     }

 })

client.login(token)
 