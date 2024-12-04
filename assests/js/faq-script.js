const buttons = document.querySelectorAll('.faq-btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const description = button.closest('.question').querySelector('.faq-description');
    description.classList.toggle('faq-description-off');

    const img = button.querySelector('img');

    if (description.classList.contains('faq-description-off')) {
      img.src = './src/faq-icons/faq-arrow-close.svg';
    } else {
      img.src = './src/faq-icons/faq-arrow-open.svg';
    };
  });
});