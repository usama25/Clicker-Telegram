const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tonClient = require('./tonClient');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;

app.post('/connect-wallet', async (req, res) => {
    const { walletAddress } = req.body;

    if (!walletAddress) {
        return res.status(400).json({ success: false, message: 'Wallet address is required' });
    }

    try {
        // Check wallet balance or any other operation to validate the wallet address
        const account = await tonClient.net.query_collection({
            collection: 'accounts',
            filter: { id: { eq: walletAddress } },
            result: 'balance',
        });

        if (account.result.length > 0) {
            res.json({ success: true, message: 'Wallet connected', walletAddress });
        } else {
            res.json({ success: false, message: 'Invalid wallet address' });
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
