document.addEventListener('DOMContentLoaded', () => {
    // Morph entry: установить фон overlay из sessionStorage
    const morphEntry = document.getElementById('morph-entry');
    const savedImg = sessionStorage.getItem('morphImg');

    if (morphEntry && savedImg) {
        morphEntry.style.backgroundImage = `url('${savedImg}')`;
        sessionStorage.removeItem('morphImg');
    } else if (morphEntry) {
        // Если зашли напрямую — просто скрыть overlay
        morphEntry.style.animation = 'none';
        morphEntry.style.opacity = '0';
    }
});
