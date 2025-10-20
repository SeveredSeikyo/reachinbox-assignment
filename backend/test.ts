const axios = require('axios');

const test = async () => {
    try {
        const response = await axios.get('http://localhost:5000/health');
        if (response.status === 200 && response.data.status === 'ok') {
            console.log('Health check passed!');
            process.exit(0);
        } else {
            console.error('Health check failed:', response.data);
            process.exit(1);
        }
    } catch (error: any) {
        console.error('Health check failed:', error.message);
        process.exit(1);
    }
};

test();
