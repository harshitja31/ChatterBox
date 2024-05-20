const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main()
     .then(()=>{
        console.log("Connection Successful")
    })
     .catch((err)=>{
        console.log(err)
    });

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: "Harshit",
        to: "Anjali",
        message: "Hye! How are you.",
        created_at: new Date()
    },
    {
        from: "Anjali",
        to: "Harshit",
        message: "I'm good, thanks! How about you?",
        created_at: new Date()
    },
    {
        from: "Raj",
        to: "Simran",
        message: "Hey, did you finish the project?",
        created_at: new Date()
    },
    {
        from: "Simran",
        to: "Raj",
        message: "Almost done, just a few tweaks left.",
        created_at: new Date()
    },
    {
        from: "Amit",
        to: "Priya",
        message: "What time is the meeting tomorrow?",
        created_at: new Date()
    },
    {
        from: "Priya",
        to: "Amit",
        message: "It's at 10 AM. Don't be late!",
        created_at: new Date()
    },
    {
        from: "Karan",
        to: "Naina",
        message: "Want to grab coffee later?",
        created_at: new Date()
    },
    {
        from: "Naina",
        to: "Karan",
        message: "Sure! Let's meet at 5 PM.",
        created_at: new Date()
    },
    {
        from: "Rohan",
        to: "Meera",
        message: "Happy Birthday! Have a great day!",
        created_at: new Date()
    },
    {
        from: "Meera",
        to: "Rohan",
        message: "Thank you so much!",
        created_at: new Date()
    }
];

Chat.insertMany(allChats);
