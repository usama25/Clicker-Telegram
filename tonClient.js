const { TonClient } = require('ton-client-node-js');
TonClient.useBinaryLibrary(libNode);

const client = new TonClient({
    network: {
        server_address: 'main.ton.dev',
    },
});

module.exports = client;
