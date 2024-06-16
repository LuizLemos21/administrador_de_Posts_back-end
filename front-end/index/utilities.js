// utilities.js
function updateCountdown(element, targetDate) {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        element.innerText = 'Time to publish!';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    element.innerText = `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}
