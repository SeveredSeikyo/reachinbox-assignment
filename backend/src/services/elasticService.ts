const { Client } = require('@elastic/elasticsearch');
import type { EmailDocument } from '../types/esConnect';
const { esLogger } = require('../utils/logger');
require('dotenv').config();

const esClient = new Client({
    node: process.env.ELASTIC_URL
});

async function esConnect(emailDocument: EmailDocument){
    
    if(!(await esClient.indices.exists({ index: "emails" }))){
        await esClient.indices.create({
            index: "emails",
            body: {
                mappings: {
                properties: {
                    accountId: { type: "keyword" },
                    folder: { type: "keyword" },
                    subject: { type: "text" },
                    body: { type: "text" },
                    date: { type: "date" },
                    aiCategory: { type: "keyword" },
                },
                },
            },
        });
    }

    try{
        await esClient.index({
            index: "emails",
            id: emailDocument.id,
            document: emailDocument,
            op_type: "create"
        });
    }catch(err){
        esLogger.error(`Error Occurred: `,err)
    }
}

module.exports = esConnect