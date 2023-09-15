const express = require('express');
const fs = require('fs');

const router = express.Router();

router.post('/chat',(request,response,next)=>{
    const{userName,message}= request.body;
    console.log(message, userName);
    const htmlData = fs.readFileSync('./ui/chat.html','utf-8');
    const newChat = `
    <div class="message">
    <p><strong>${userName}:</strong> ${message}</p>
</div>
    `
    const placeholderIndex = htmlData.indexOf('<div id="chat-card-placeholder"></div>');
    if(placeholderIndex!==-1){
        const modifiedHtmlData = htmlData.slice(0,placeholderIndex)+newChat+htmlData.slice(placeholderIndex);
        fs.writeFileSync('./ui/chat.html',modifiedHtmlData);
        response.send(`${modifiedHtmlData}`);
    }
    else{
        response.send(`${htmlData}`);
    }
})


module.exports = router;