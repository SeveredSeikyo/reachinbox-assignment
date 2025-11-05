const connectIMAP = require('./services/imapService.ts');
import type { Request, Response } from "express";
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const emailRouter = require('./api/emailRoute');

const allowed_origin = process.env.ALLOWED_ORIGIN;

const corsOptions = {
  origin: allowed_origin,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, 
  optionsSuccessStatus: 200
};


const app = express();
app.use(cors(corsOptions));
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

app.get('/health', (req:Request, res:Response) => {
    res.json({ status: 'ok' });
});

app.use('/api',emailRouter);

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})