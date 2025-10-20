const axios = require("axios");
import type { EmailDocument } from '../types/esConnect';

const slackUrl = process.env.SLACK_WEBHOOK_URL;
const webhookUrl = process.env.WEBHOOK_SITE_URL;


async function notifyInterested(emailData: EmailDocument) {
    if (emailData.aiCategory !== "Interested") return;

    
    await axios.post(slackUrl, {
        text: `New Interested Lead!\nFrom: ${emailData.from}\nSubject: ${emailData.subject}`,
    });

    
    await axios.post(webhookUrl, {
        event: "InterestedLead",
        email: emailData,
    });
}

module.exports = notifyInterested;