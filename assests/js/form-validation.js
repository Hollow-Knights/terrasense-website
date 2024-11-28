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
    setErrorFor(nome, 'O nome é obrigatório');
  } else if (!isFullName(nomeValue)) {
    setErrorFor(nome, 'Por favor, insira seu nome completo (ex.: João Silva).');
  } else {
    setSuccessFor(nome, `${nome}, seu nome foi salvo!`);
  }

  if (emailValue === '') {
    setErrorFor(email, 'O e-mail é obrigatório.');
  } else  if (!checkEmail(emailValue)) {
    setErrorFor(email, 'Por favor, insira um email válido.');
  } else {
    setSuccessFor(email);
  }

  if (whatsappValue === '') {
    setErrorFor(whatsapp, 'O WhatsApp é obrigatório.');
  } else if (!telefone_validation(whatsappValue)) {
    setErrorFor(whatsapp, 'Por favor, digite um número de WhatsApp válido.');
  } else {
    setSuccessFor(whatsapp);
  }
  
  if (customMessageValue === '') {
    setErrorFor(customMessage, 'A mensagem é obrigatória.');
  } else if (customMessageValue.length < 30) {
    setErrorFor(customMessage, 'A mensagem deve ter no mínimo 30 caracteres.');
  } else if (customMessageValue.length > 500) {
    setErrorFor(customMessage, 'A mensagem não pode ter mais de 500 caracteres.');
  } else {
    setSuccessFor(customMessage, 'Mensagem enviada!');
  }

  const formControls = form.querySelectorAll('.form-control')

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.classList.contains('success'); // Verifica se todos os inputs têm a classe 'success'
  });

  const formMessage = document.querySelector('.validation-form'); // Seleciona o small da mensagem do formulário

  if (formIsValid) {
    // Define a mensagem de sucesso no small e torna-o visível
    formMessage.innerText = 'O formulário foi enviado com sucesso!';
    formMessage.style.visibility = 'visible';
    formMessage.style.paddingBottom = '16px';
    formMessage.style.color = '#b4d744'; // Adiciona cor para destacar o sucesso

  } else {
    // Mensagem para quando o formulário ainda for inválido
    formMessage.innerText = 'Por favor, preencha todos os campos corretamente antes de enviar.';
    formMessage.style.visibility = 'visible';
    formMessage.style.paddingBottom = '16px';
    formMessage.style.color = '#e74c3c'; // Adiciona cor para destacar o erro
  }
};

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');

  // Define a mensagem de erro
  small.innerText = message;

  // Aplica a classe de erro
  formControl.className = 'input-contact-form form-control error';
}

function setSuccessFor(input, message) {
  const formControl = input.parentElement;

  formControl.className = 'input-contact-form form-control success';
}

function isFullName(name) {
  // Divide o nome em partes
  const nameParts = name.trim().split(' ');

  // Conta as partes do nome que têm mais de 1 caractere
  const validParts = nameParts.filter(part => part.length > 1);

  // Retorna true se houver pelo menos duas partes válidas
  return validParts.length >= 2;
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function telefone_validation(telefone) {
  // Retira todos os caracteres não numéricos
  telefone = telefone.replace(/\D/g, '');

  // Verifica se o número tem a quantidade correta de dígitos
  if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

  // Verifica se começa com 9 para números de celular com 11 dígitos
  if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;

  // Verifica se o número não é uma sequência repetida
  for (let n = 0; n < 10; n++) {
    if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) return false;
  }

  // DDDs válidos
  const codigosDDD = [
    11, 12, 13, 14, 15, 16, 17, 18, 19,
    21, 22, 24, 27, 28, 31, 32, 33, 34,
    35, 37, 38, 41, 42, 43, 44, 45, 46,
    47, 48, 49, 51, 53, 54, 55, 61, 62,
    64, 63, 65, 66, 67, 68, 69, 71, 73,
    74, 75, 77, 79, 81, 82, 83, 84, 85,
    86, 87, 88, 89, 91, 92, 93, 94, 95,
    96, 97, 98, 99
  ];
  if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;

  // Verifica o número principal para telefones fixos antes de 2017
  if (new Date().getFullYear() < 2017) return true;
  if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;

  return true;
}