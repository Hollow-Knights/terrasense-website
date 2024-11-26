const form = document.getElementById('form');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const whatsapp = document.getElementById('whatsapp');
const customMessage = document.getElementById('custom-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const nomeValue = nome.value;
  const emailValue = email.value;
  const whatsappValue = whatsapp.value;
  const customMessageValue = customMessage.value;

  if (nomeValue === '') {
    setErrorFor(nome, 'Por favor, escreva seu nome para sabermos como vamos te chamar.');
  } else {
    setSuccessFor(nome);
  }

  if (emailValue === '') {
    setErrorFor(email, 'O e-mail é obrigatório.');
  } else  if (!checkEmail(emailValue)) {
    setErrorFor(email, 'Por favor, insira um email válido.');
  } else {
    setSuccessFor(email);
  }

  if (whatsappValue === '') {
    setErrorFor(whatsapp, 'O whatsApp é obrigatório.');
  } else if (!checkWhatsapp(whatsappValue)) {
    setErrorFor(whatsapp, 'Por favor, digite um número de whatsapp válido.')
    setSuccessFor(whatsapp);
  }

  if (customMessageValue === '') {
    setErrorFor(customMessage, 'Escreva uma mensagem descrevendo qual a sua dúvida.');
  } else {
    setSuccessFor(customMessage);
  }

  const formControls = form.querySelectorAll('.form-control')

  const formIsValid = [...formControls].every((formControl) => {
    return (formControl.classnome === 'form-control success');
  });

  if (formIsValid) {
    console.log('O formulário está 100% válido!')
  } else {
    console.log('O formulário está inválido...')
  }
};

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');

  small.innerText = message;

  formControl.classnome = 'form-control error';
}

function setSuccessFor(input, message) {
  const formControl = input.parentElement;

  formControl.classnome = 'form-control success';
}

function checkWhatsapp(whatsapp) {
  if (Number.isInteger(whatsapp) && whatsapp.toString().length === 11) {
    return true;
  } else {
    return false;
  };
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}