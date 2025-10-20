const { imapLogger } = require("../utils/logger.ts");
const { ImapFlow } = require("imapflow");
const esConnect = require('./elasticService.ts');
const { simpleParser } = require('mailparser');
const categorizeEmail = require('./aiService.ts');
import type { ImapConnectCredentials } from "../types/imapConnect.js";
const notifyInterested = require('./webhookService.ts');
require('dotenv').config();

interface AddressObject {
    name?: string;
    address: string;
}



const imapFlowOptions = (user: string, pass: string) => {
    return{
        host: process.env.IMAP_HOST,
        port: 993,
        secure: true,
        auth: {
            user: user,
            pass: pass
        },
        logger: {
            info: (msg: unknown) => imapLogger.info(msg),
            error: (msg: unknown) => imapLogger.error(msg),
            debug: (msg: unknown) => imapLogger.debug(msg),
        }
    }
}

async function connectIMAP(imapConnectCredentials: ImapConnectCredentials){
    const client = new ImapFlow(imapFlowOptions(imapConnectCredentials.user, imapConnectCredentials.password));

    try{
        await client.connect();
        imapLogger.info(`Connected to IMAP Server for ${imapConnectCredentials.user}`);
    }catch(err){
        imapLogger.error(`Failed to connect: `,err)
    }
    const lockInbox = await client.getMailboxLock("INBOX");

    try{
        const since = new Date();
        since.setDate(since.getDate() - 30);

        const mailUids = await client.search({since});

        const emails = client.fetch(
            mailUids,
            {
                envelope: true,
                bodystructure: true,
                source: true
            }
        )

        for await (const mail of emails){
            const parsedMail = await simpleParser(mail.source);
            const mailDocument = {
                id: mail.envelope.messageId,
                accountId: imapConnectCredentials.accountId,
                folder: "INBOX", 
                subject: parsedMail.subject || "",
                body: parsedMail.html || parsedMail.text || "",
                date: parsedMail.date || new Date(),
                aiCategory: 'Uncategorized',
                indexedAt: new Date()
            }
            await esConnect(mailDocument);
        }
        imapLogger.info("Emails Fetched Successfully.");
    } catch(err){
        imapLogger.error(`Failed to fetch emails: `,err);
    } finally{
        lockInbox.release();
    }

    client.on("exists", async () => {
        imapLogger.info(`[${imapConnectCredentials.user}] New email detected!`);

        
        const lock = await client.getMailboxLock("INBOX");
        try {
        
            const mail = await client.fetchOne(client.mailbox.exists, {
                envelope: true,
                bodystructure: true,
                source: true
            })

            const parsedMail = await simpleParser(mail.source);
            const emailText = `sub: ${parsedMail.subject || ""} \n body: ${parsedMail.html || parsedMail.text || ""}`
            const aiCategory = await categorizeEmail(emailText);
            console.log(aiCategory);
            const mailDocument = {
                id: mail.envelope.messageId,
                accountId: imapConnectCredentials.accountId,
                folder: "INBOX", 
                subject: parsedMail.subject || "",
                body: parsedMail.html || parsedMail.text || "",
                from: parsedMail.from?.text || "",
                to: parsedMail.to?.value.map((v:AddressObject) => v.address) || [],
                date: parsedMail.date || new Date(),
                aiCategory: aiCategory,
                indexedAt: new Date()
            }
            await esConnect(mailDocument);
            await notifyInterested(mailDocument);

            imapLogger.info(`Fetched: ${mail.uid}: ${mail.envelope.subject}`);
        
        } finally {
        lock.release();
        }
    });

    
    (async function idleLoop() {
        while (!client.closed) {
        try {
            await client.idle();
        } catch (err) {
            imapLogger.error(`[${imapConnectCredentials.user}] Idle error:`, err);
            await new Promise((r) => setTimeout(r, 30000));
        }
        }
    })();

    return client;

}

module.exports = connectIMAP;