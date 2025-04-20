//Redirecionamento para o catalogo
function redirectToCatalog() {
  window.location.href = 'catalogo.html';
}

//Redirecionamento para a pagina principal
function redirectToHome() {
  window.location.href = 'index.html';
}
document.getElementById('explorarBtn').addEventListener('click', redirectToCatalog);

//Redirecionamento do ver mais
function redirectToBook() {
  window.location.href = 'catalogo.html';
}
document.getElementById('livroBtn').addEventListener('click', redirectToBook);

//Exibir a data atual no campo de cadastro
document.addEventListener('DOMContentLoaded', function() {
  const cadastroInput = document.getElementById('cadastro');
  if (cadastroInput) {
      const hoje = new Date();
      const dataFormatada = hoje.toDateString();
      cadastroInput.value = dataFormatada;
  }
});

// Modal de Autenticação
const modal = document.getElementById('authModal');
const authButton = document.querySelector('.secondary-header .menu button');
const closeBtn = document.querySelector('.close');
const tabBtns = document.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('.auth-forms form');

// Abrir modal
authButton.addEventListener('click', () => {
  modal.style.display = 'block';
  
  const savedEmail = localStorage.getItem('savedEmail');
  const savedPassword = localStorage.getItem('savedPassword');
  
  if (savedEmail && savedPassword) {
    const loginForm = document.getElementById('loginForm');
    loginForm.querySelector('input[type="email"]').value = savedEmail;
    loginForm.querySelector('input[type="senha"]').value = savedPassword;
    loginForm.querySelector('#lembrar-senha').checked = true;
  }
});

// Fechar modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Fechar ao clicar fora do modal
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Alternar entre tabs
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class de todos os botões e forms
    tabBtns.forEach(b => b.classList.remove('active'));
    forms.forEach(f => f.classList.remove('active'));
    
    // Adiciona active class ao botão clicado e form correspondente
    btn.classList.add('active');
    document.getElementById(`${btn.dataset.tab}Form`).classList.add('active');
  });
});

// Manipular submissão do formulário de login
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  const password = e.target.querySelector('input[type="senha"]').value;
  const rememberPassword = e.target.querySelector('#lembrarsenha').checked;

  if (rememberPassword) {
    localStorage.setItem('savedEmail', email);
    localStorage.setItem('savedPassword', password);
  } else {
    localStorage.removeItem('savedEmail');
    localStorage.removeItem('savedPassword');
  }

  console.log('Login submit', { email, rememberPassword });
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // Adicione aqui a lógica de registro
  console.log('Register submit');
});

function openPDF(pdfPath) {
  window.open(pdfPath, '_blank', `
    toolbar=no,
    location=no,
    status=no,
    menubar=no,
    scrollbars=yes,
    resizable=yes,
    width=800,
    height=600
    `);
}


