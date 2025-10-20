const connectIMAP = require('./services/imapService.ts');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const emailRouter = require('./api/emailRoute');

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;


const user_creds_1 = {
    accountId: process.env.IMAP_USER_1 || "",
    user: process.env.IMAP_USER_1 || "",
    password: process.env.IMAP_PASS_1 || ""
}

const user_creds_2 = {
    accountId: process.env.IMAP_USER_2 || "",
    user: process.env.IMAP_USER_2 || "",
    password: process.env.IMAP_PASS_2 || ""
}

async function client(){
    await connectIMAP(user_creds_1);
    await connectIMAP(user_creds_2);
}

client();

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api',emailRouter);

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})