const express = require('express');
const app = express();

const mongoose = require('mongoose');
const path = require('path');

const Chat = require('./models/chat.js');
const methodOverride = require('method-override');

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


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


let port = 5000;

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})



app.get("/",(req,res)=>{
    res.render("welcome.ejs");
})

app.post("/",(req,res)=>{
    res.redirect("/chat");
})


app.get("/chat",async (req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs",{ chats });
})

app.get("/chat/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/chat",(req,res)=>{
    let { from, to, message} = req.body;
    let msg = new Chat({
        from:from,
        to:to,
        message:message,
        created_at:new Date()
    });
    msg.save()
            .then(res => {
                console.log(res)
            })
            .catch(err =>{
                console.log(err)
            });
    res.redirect("/chat");
});

app.get("/chat/:id/edit",async(req,res)=>{
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render('edit.ejs' ,{ chat })
});

app.put("/chat/:id", async (req, res) => {
    let { id } = req.params;
    let { message: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, { message: newMsg }, { runValidators: true, new: true });
    console.log(updatedChat);
    res.redirect("/chat");
})
app.delete("/chat/:id",async (req,res)=>{
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id,{new:true})
    console.log(deletedChat);
    res.redirect("/chat");
})