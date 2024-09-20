let debounceTimeout;

function searchFunction() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const input = document.getElementById('searchInput');
        const filter = input.value.toLowerCase();
        const cards = document.getElementsByClassName('card-log');

        cards.forEach(card => {
            const cardText = card.textContent || card.innerText;
            card.style.display = cardText.toLowerCase().includes(filter) ? "" : "none";
        });
    }, 300);
}