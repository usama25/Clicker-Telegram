document.addEventListener('DOMContentLoaded', () => {
  let perClickValue = 1;
  const upgradeCosts = Array(10).fill(10);
  const upgradeValues = Array(10).fill(0);

  const menuItems = document.getElementById('menu-items');
  for (let i = 0; i < 10; i++) {
    const li = document.createElement('li');
    li.innerHTML = `
      Item ${i + 1} (Level <span id="item-level-${i}">0</span>)
      <button id="upgrade-button-${i}" data-index="${i}" disabled>Upgrade (Cost: <span id="item-cost-${i}">${upgradeCosts[i]}</span>)</button>
    `;
    menuItems.appendChild(li);
  }

  document.getElementById('menu-button').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'block';
  });

  document.getElementById('close-menu').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
  });

  function updateUpgradeButtons() {
    const clickCountElement = document.getElementById('click-count');
    let count = parseInt(clickCountElement.textContent.split(': ')[1]);

    for (let i = 0; i < 10; i++) {
      const button = document.getElementById(`upgrade-button-${i}`);
      if (count >= upgradeCosts[i]) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    }
  }

  for (let i = 0; i < 10; i++) {
    document.getElementById(`upgrade-button-${i}`).addEventListener('click', (event) => {
      const index = parseInt(event.target.getAttribute('data-index'));
      const clickCountElement = document.getElementById('click-count');
      let count = parseInt(clickCountElement.textContent.split(': ')[1]);

      if (count >= upgradeCosts[index]) {
        count -= upgradeCosts[index];
        clickCountElement.textContent = `Coins: ${count}`;

        upgradeValues[index] += 1;
        document.getElementById(`item-level-${index}`).textContent = upgradeValues[index];

        upgradeCosts[index] = Math.floor(upgradeCosts[index] * 1.5);
        document.getElementById(`item-cost-${index}`).textContent = upgradeCosts[index];

        perClickValue += 1;

        updateUpgradeButtons();
      }
    });
  }

  document.getElementById('click-button').addEventListener('click', (event) => {
    const clickCountElement = document.getElementById('click-count');
    let count = parseInt(clickCountElement.textContent.split(': ')[1]);
    count += perClickValue;
    clickCountElement.textContent = `Coins: ${count}`;

    updateUpgradeButtons();

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

  // Initialize buttons state
  updateUpgradeButtons();
});
