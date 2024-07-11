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
  