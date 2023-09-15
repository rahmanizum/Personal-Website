const express = require('express');
const fs = require('fs');

const postRoute = require('./routes/post');
const app = express();

app.use(express.urlencoded({extended:false}))

app.get('/chat',(request,response,next)=>{
    response.sendFile('chat.html',{root:'ui'})
})

app.get('/signin',(request,response,next)=>{
    response.sendFile('signin.html',{root:'ui'});
});
app.get('/signup',(request,response,next)=>{
response.sendFile('signup.html',{root:'ui'});
})

app.get('/',(request,response,next)=>{
    response.sendFile('home.html',{root:'ui'});
})

app.use(postRoute);

app.use('/',(request,response,next)=>{
    response.sendFile('notfound.html',{root:'ui'});
})

app.listen(8585,()=>{
    console.log("Server is running on port 8585");
})