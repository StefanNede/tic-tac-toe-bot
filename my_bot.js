const Discord = require("discord.js");
const client = new Discord.Client();
require('dotenv').config()

prefix = "t.";
token = process.env.TOKEN;

client.once("ready", () => {
    client.user.setActivity("t.help");
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    if (message.content.toLowerCase().startsWith(`${prefix}help`)) {
        message.channel.send({embed: {
    color: 15844367,
    title: "Tic-Tac-Toe Bot",
    description: "I am a tic tac toe bot",
    fields: [{
        name: "**Commands**",
        value: "- t.play bot => starts a game against the bot\n- t.play <mention> => starts a game against the user mentioned"
      }
    ],
    timestamp: new Date()
  }
});
    }
    if (message.content.toLowerCase() === `${prefix}play bot`) {
        playBot(message);
    }
    else if (message.content.toLowerCase().startsWith(`${prefix}play`)) {
        playUser(message);
    }
})

const displayBoard = (message, board) => {
    message.channel.send("** ** " + `${board[0]} | ${board[1]} | ${board[2]}\n---------\n ${board[3]} | ${board[4]} | ${board[5]}\n---------\n ${board[6]} | ${board[7]} | ${board[8]}`);
}

const getComputerChoice = (board) => {
    let choice = Math.floor(Math.random() * 9);
    if (board[choice] !== "x" && board[choice] !== "0") {
        return choice; 
    } else {
        return getComputerChoice(board);
    }
}

const checkPersonWin = (board, person) => {
    const token = person === "user" ? "x":"0";
    if (board[0] === token && (board[0] === board[1] && board[1] === board[2]) || (board[0] === board[3] && board[3] === board[6]) || (board[0] === board[4] && board[4] === board[8])) {
        return true;
    } 
    else if (board[1] === token && (board[1] === board[4] && board[4] === board[7])) {
        return true;
    }
    else if (board[2] === token && (board[2] === board[5] && board[5] === board[8])) {
        return true;
    }
    else if (board[3] === token && (board[3] === board[4] && board[4] === board[5])) {
        return true;
    }
    else if (board[6] === token && ((board[6] === board[7] && board[7] === board[8]) || (board[6] === board[4] && board[4] === board[2]))) {
        return true;
    }
    else {
        return false;
    }
}

const checkWin = (board) => {
    if (checkPersonWin(board,"user") === true) {
        return "user";
    } else if (checkPersonWin(board, "bot") === true){
        return "bot"
    } else {
        return "neither";
    }
}


const playBot = async (message) => {
    board = ["**  **", "  ", "  "
            , "  ", "  ", "  "
            , "  ", "  ", "  "];
    message.channel.send({embed: {
    color: 15844367,
    title: "template",
    description: "1|2|3\n------\n4|5|6\n------\n7|8|9"
  }});
    message.channel.send("Please select a box by typing a number from 1-9: ");
    client.on("message", async message => {
        // the person who sent the message
        const user = message.author;
        if (message.author.bot) return;
        const box = message.content;
        const isnum = parseInt(box) ? true: false;
        if (!isnum || parseInt(box)> 9 || parseInt(box)< 0) return;
        if (board[parseInt(box)-1] === "x" || board[parseInt(box)-1] === "0") return;
        board[parseInt(box)-1] = "x";
        const compIndex = getComputerChoice(board);
        board[compIndex] = "0";
        displayBoard(message, board);
        if (checkWin(board) === "bot") {
            message.channel.send("The bot won");
            return;
        } else if (checkWin(board) === "user") {
            message.channel.send(`<@${user.id}> won`)
            .then(function (message) {
          message.react("🎉")
    			});
            return;
        }
    })
    displayBoard(message, board);
}

const playUser = async (message) => {
  const splitMessage = message.content.split(" ");
  const personMentioned = splitMessage[splitMessage.length-1];
  message.channel.send("Waiting for response from " + personMentioned + " y for accept, anything else to reject");
  client.on("message", async message => {
    if (message.author.bot) return;
    if (message.author.id === personMentioned.substring(3,personMentioned.length -1) && (message.content === "y")){
        startGame(message);
        return;
      }
    else {
      return;
    }
  })
}

const startGame = async message => {
    board = ["**  **", "  ", "  "
                , "  ", "  ", "  "
                , "  ", "  ", "  "];
        message.channel.send({embed: {
        color: 15844367,
        title: "template",
        description: "1|2|3\n------\n4|5|6\n------\n7|8|9"
      }});
    message.channel.send("Please select a box by typing a number from 1-9: ");
    client.on("message", async message => {
      // do some stuff in here
    })
}

client.login(token);

