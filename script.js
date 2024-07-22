document.addEventListener('DOMContentLoaded', () => {
  const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://dreamparktech.com/tonconnect-manifest.json',
    buttonRootId: 'ton-connect'
  });

  async function connectToWallet() {
    const connectedWallet = await tonConnectUI.connectWallet();
    console.log(connectedWallet);
  }

  connectToWallet().catch(error => {
    console.error('Error connecting to wallet:', error);
  });

  const tabs = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  const clickButton = document.getElementById('click-button');
  const clickCountDisplay = document.getElementById('click-count');
  const coinContainer = document.getElementById('coin-container');
  let coinCount = 0;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  clickButton.addEventListener('click', (event) => {
    coinCount++;
    clickCountDisplay.textContent = `Coins: ${coinCount}`;
    clickButton.classList.add('shake');
    setTimeout(() => {
      clickButton.classList.remove('shake');
    }, 300);

    // Get the click position relative to the button
    const rect = clickButton.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Create the coin element
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.style.left = `${rect.left + x}px`; // Adjust by half the coin's width
    coin.style.top = `${rect.top + y}px`; // Adjust by half the coin's height
    coinContainer.appendChild(coin);

    setTimeout(() => {
      coin.remove();
    }, 1000);
  });

  const menuItems = [
    { name: 'Upgrade 1', price: 10, image: 'coin.png' },
    { name: 'Upgrade 2', price: 10, image: 'coin.png' },
    { name: 'Upgrade 3', price: 10, image: 'coin.png' },
    { name: 'Upgrade 4', price: 10, image: 'coin.png' },
    // Add more items as needed
  ];

  const marketContainer = document.querySelector('.market-container');

  menuItems.forEach(item => {
    const itemBlock = document.createElement('div');
    itemBlock.classList.add('item-block');

    const itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemImage.alt = item.name;

    const itemName = document.createElement('h3');
    itemName.textContent = item.name;

    const itemPrice = document.createElement('p');
    itemPrice.textContent = `Price: ${item.price} coins`;

    const upgradeButton = document.createElement('button');
    upgradeButton.textContent = 'Upgrade';
    upgradeButton.addEventListener('click', () => {
      if (coinCount >= item.price) {
        coinCount -= item.price;
        clickCountDisplay.textContent = `Coins: ${coinCount}`;
        item.price *= 1.5; // Increase the price for the next upgrade
        itemPrice.textContent = `Price: ${Math.round(item.price)} coins`;
        console.log(`${item.name} upgraded!`);
      } else {
        alert('Not enough coins!');
      }
    });

    itemBlock.appendChild(itemImage);
    itemBlock.appendChild(itemName);
    itemBlock.appendChild(itemPrice);
    itemBlock.appendChild(upgradeButton);

    marketContainer.appendChild(itemBlock);
  });
});
