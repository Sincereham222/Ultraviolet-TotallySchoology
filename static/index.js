const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', {
            scope: __uv$config.prefix
        }).then(() => {
            let url = input.value.trim();
            if (!isUrl(url)) {
                url = 'https://www.google.com/search?q=' + url;
            } else if (!(url.startsWith('https://') || url.startsWith('http://'))) {
                url = 'http://' + url;
            }

            window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
        }).catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    } else {
        console.error('Service Worker is not supported in this browser.');
        // Fallback behavior here
    }
});

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};
