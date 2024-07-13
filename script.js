document.getElementById('click-button').addEventListener('click', () => {
  const clickCountElement = document.getElementById('click-count');
  let count = parseInt(clickCountElement.textContent.split(': ')[1]);
  count += 1;
  clickCountElement.textContent = `Clicks: ${count}`;

  // Shake animation
  const button = document.getElementById('click-button');
  button.classList.add('shake');
  setTimeout(() => {
    button.classList.remove('shake');
  }, 300);

  // Coin animation
  const coinContainer = document.getElementById('coin-container');
  const coin = document.createElement('div');
  coin.classList.add('coin');
  coin.style.left = `${Math.random() * 80 + 10}%`;
  coinContainer.appendChild(coin);

  setTimeout(() => {
    coin.remove();
  }, 1000);
});

document.getElementById('connect-wallet-button').addEventListener('click', async () => {
  const walletAddress = prompt("Enter your TON Wallet address:");
  if (walletAddress) {
      try {
          const response = await fetch('http://localhost:3000/connect-wallet', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ walletAddress })
          });
          const data = await response.json();
          if (data.success) {
              document.getElementById('wallet-info').textContent = `Wallet connected: ${data.walletAddress}`;
          } else {
              document.getElementById('wallet-info').textContent = 'Wallet connection failed';
          }
      } catch (error) {
          console.error('Error connecting wallet:', error);
          document.getElementById('wallet-info').textContent = 'Error connecting wallet';
      }
  }
});
