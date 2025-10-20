require('dotenv').config();

function loadAccounts() {
  const accounts = [];
  let index = 1;

  while (process.env[`IMAP_USER_${index}`]) {
    const email = process.env[`IMAP_USER_${index}`] || "";
    const provider = email.includes('gmail')
      ? 'gmail'
      : email.includes('outlook')
      ? 'outlook'
      : 'other';

    accounts.push({
      id: `account_${index}`,
      email,
      provider,
    });

    index++;
  }

  return accounts;
}

module.exports = {loadAccounts};
