const loading = document.querySelector('.loading');
const iframe = document.querySelector('iframe');

iframe.addEventListener('load', function() {
  loading.style.display = 'none';
});