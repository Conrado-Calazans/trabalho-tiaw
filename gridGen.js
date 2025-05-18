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

// Função principal de recomendações
async function carregarRecomendacoes() {
    try {
        const response = await fetch('db.json');
        const db = await response.json();

        // Preferências do usuário e histórico de leitura
        const preferencias = db.lerRecomendacoes.usuario.preferencias;
        const historicoIds = db.lerRecomendacoes.lerHistorico.map(l => l.idLivro);

        // Lista de livros disponíveis
        const livros = db.livros.items;

        // Algoritmo de recomendação
        const recomendados = livros.filter(livro =>
            livro.genero.some(g => preferencias.includes(g)) &&
            !historicoIds.includes(livro.idLivro)
        );

        // Renderiza os cards
        const grid = document.querySelector('.livros-grid');
        grid.innerHTML = recomendados.length ? '' : '<p>Nenhuma recomendação encontrada.</p>';

        recomendados.forEach(livro => {
            grid.innerHTML += `
            <div class="livro-card">
                <div class="livro-icon">
                    <img src="images/${livro.imagem}" alt="Ícone do livro">
                </div>
                <div class="livro-info">
                    <h3>${livro.titulo}</h3>
                    <p class="descricao">${livro.autor ? 'Autor: ' + livro.autor + '<br>' : ''}Gênero: ${livro.genero.join(', ')}</p>
                    <div class="card-actions">
                        <button class="btn-ler" onclick="openPDF('pdfs/${livro.pdf}')">Ler</button>
                        <button class="btn-favorito">
                            <img src="images/heart-filled.png" alt="Favorito">
                        </button>
                    </div>
                </div>
            </div>
            `;
        });
    } catch (error) {
        const grid = document.querySelector('.livros-grid');
        grid.innerHTML = '<p>Erro ao carregar recomendações.</p>';
        console.error(error);
    }
}

// Chama ao carregar a página
document.addEventListener('DOMContentLoaded', carregarRecomendacoes);