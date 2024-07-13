document.getElementById('click-button').addEventListener('click', (event) => {
  const clickCountElement = document.getElementById('click-count');
  let count = parseInt(clickCountElement.textContent.split(': ')[1]);
  count += 1;
  clickCountElement.textContent = `Coins: ${count}`;

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

  // Get click coordinates relative to the container
  const containerRect = coinContainer.getBoundingClientRect();
  const x = event.clientX - containerRect.left;
  const y = event.clientY - containerRect.top;
  coin.style.left = `${x}px`;
  coin.style.top = `${y}px`;

  coinContainer.appendChild(coin);

  setTimeout(() => {
    coin.remove();
  }, 1000);
});
