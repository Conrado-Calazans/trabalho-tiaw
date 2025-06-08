// Redirecionamento para o catalogo
function redirectToCatalog() {
  window.location.href = 'catalogo.html';
}

// Redirecionamento para a pagina principal
function redirectToHome() {
  window.location.href = 'index.html';
}
document.getElementById('explorarBtn')?.addEventListener('click', redirectToCatalog);
document.getElementById('livroBtn')?.addEventListener('click', redirectToCatalog);

// Exibir a data atual no campo de cadastro
document.addEventListener('DOMContentLoaded', function() {
  const cadastroInput = document.getElementById('cadastro');
  if (cadastroInput) {
    const hoje = new Date();
    const dataFormatada = hoje.toDateString();
    cadastroInput.value = dataFormatada;
  }
})
 // Campo de busca global
  
 function removerAcentos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', async function () {
    const termo = removerAcentos(this.value.trim().toLowerCase());
    const container = document.querySelector('.livros-grid') || createResultContainer(this);

    try {
      const res = await fetch('db.json');
      const data = await res.json();
      const livros = data.livros.items;

      const resultados = livros.filter(livro => {
        const titulo = removerAcentos(livro.titulo.toLowerCase());
        const autor = removerAcentos(livro.autor?.toLowerCase() || '');
        const generos = removerAcentos(livro.genero.join(' ').toLowerCase());
        const desc = removerAcentos(livro.descricao?.toLowerCase() || '');

        return (
          titulo.includes(termo) ||
          autor.includes(termo) ||
          generos.includes(termo) ||
          desc.includes(termo)
        );
      });

      container.innerHTML = resultados.length
        ? ''
        : '<p>Nenhum livro encontrado.</p>';

      resultados.forEach(livro => {
        container.innerHTML += `
          <div class="livro-card">
            <div class="livro-icon">
              <img src="images/${livro.imagem}" alt="${livro.titulo}">
            </div>
            <div class="livro-info">
              <h3>${livro.titulo}</h3>
              <p>${livro.descricao}</p>
              <p>${livro.autor ? 'Autor: ' + livro.autor + '<br>' : ''}Gênero: ${livro.genero.join(', ')}</p>
              <div class="card-actions">
                <button onclick="openPDF('pdfs/${livro.pdf}')">Ler</button>
              </div>
            </div>
          </div>
        `;
      });
    } catch (e) {
      console.error('Erro ao buscar livros:', e);
      container.innerHTML = '<p>Erro ao carregar livros.</p>';
    }
  });
}

function createResultContainer(afterElement) {
  const div = document.createElement('div');
  div.className = 'livros-grid';
  afterElement.insertAdjacentElement('afterend', div);
  return div;
}


// Modal de Autenticação
const modal = document.getElementById('authModal');
const authButton = document.querySelector('.secondary-header .menu button');
const closeBtn = document.querySelector('.close');
const tabBtns = document.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('.auth-forms form');

// Abrir modal
authButton?.addEventListener('click', () => {
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
closeBtn?.addEventListener('click', () => {
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
    tabBtns.forEach(b => b.classList.remove('active'));
    forms.forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`${btn.dataset.tab}Form`).classList.add('active');
  });
});

// Submissão de login
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
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

document.getElementById('registerForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
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
