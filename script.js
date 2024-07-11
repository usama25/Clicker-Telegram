document.getElementById('click-button').addEventListener('click', () => {
    const clickCountElement = document.getElementById('click-count');
    let count = parseInt(clickCountElement.textContent.split(': ')[1]);
    count += 1;
    clickCountElement.textContent = `Clicks: ${count}`;
  });
  