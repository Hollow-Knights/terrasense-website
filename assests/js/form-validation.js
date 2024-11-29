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
    setSuccessFor(nome, 'Seu nome foi salvo!');
  }

  if (emailValue === '') {
    setErrorFor(email, 'O e-mail é obrigatório.');
  } else  if (!checkEmail(emailValue)) {
    setErrorFor(email, 'Por favor, insira um email válido.');
  } else {
    setSuccessFor(email);
  }

  if (whatsappValue === '') {
    setErrorFor(whatsapp, 'O whatsapp é obrigatório.');
  } else if (whatsappValue.length < 15) {
    setErrorFor(whatsapp, 'Por favor, digite um número de whatsapp válido.');
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

/* Máscaras WhatsApp */
function mascara(o,f){
  v_obj=o
  v_fun=f
  setTimeout("execmascara()",1)
}
function execmascara(){
  v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
  v=v.replace(/\D/g,""); //Remove tudo o que não é dígito
  v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
  v=v.replace(/(\d)(\d{4})$/,"$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
  return v;
}
function id( el ){
return document.getElementById( el );
}
window.onload = function(){
id('whatsapp').onkeyup = function(){
  mascara( this, mtel );
}
}