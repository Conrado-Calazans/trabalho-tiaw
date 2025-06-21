document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos HTML com os quais vamos interagir
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('results-container');

    // Associa a função de busca ao clique do botão
    searchButton.addEventListener('click', buscarLivros);

    // Permite buscar pressionando "Enter" no campo de input
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            buscarLivros();
        }
    });

    // Função principal que busca os livros
    async function buscarLivros() {
        const termoBusca = searchInput.value.trim();

        if (termoBusca === '') {
            alert('Por favor, digite algo para buscar.');
            return;
        }

        // Mostra uma mensagem de "carregando"
        resultsContainer.innerHTML = '<p class="loading">Buscando...</p>';

        try {
            // Constrói a URL da API do Google Books
            const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(termoBusca)}&maxResults=20`;

            // Faz a requisição para a API usando fetch
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Exibe os resultados na tela
            exibirResultados(data.items);

        } catch (error) {
            // Trata possíveis erros de rede ou da API
            console.error('Erro ao buscar livros:', error);
            resultsContainer.innerHTML = '<p class="error">Não foi possível buscar os livros. Tente novamente mais tarde.</p>';
        }
    }

    // Função que formata e exibe os resultados no HTML
    function exibirResultados(livros) {
        // Limpa o container de resultados antes de adicionar novos
        resultsContainer.innerHTML = '';

        if (!livros || livros.length === 0) {
            resultsContainer.innerHTML = '<p>Nenhum livro encontrado para sua busca.</p>';
            return;
        }

        livros.forEach(livro => {
            const info = livro.volumeInfo;

            // Pega as informações de forma segura (alguns livros podem não ter todos os dados)
            const titulo = info.title || 'Título indisponível';
            const autores = info.authors ? info.authors.join(', ') : 'Autor desconhecido';
            const capa = info.imageLinks ? info.imageLinks.thumbnail : 'images/cover_placeholder.png'; // Use uma imagem padrão se não houver capa
            const descricao = info.description ? info.description.substring(0, 200) + '...' : 'Sem descrição.';
            const linkCompra = info.infoLink;

            // Cria o "card" do livro com HTML
            const cardLivro = `
                <div class="book-card">
                    <img src="${capa}" alt="Capa do livro ${titulo}">
                    <div class="book-info">
                        <h3>${titulo}</h3>
                        <p class="author"><strong>Autor(es):</strong> ${autores}</p>
                        <p class="description">${descricao}</p>
                        ${linkCompra ? `<a href="${linkCompra}" target="_blank" class="buy-link">Mais Informações</a>` : ''}
                    </div>
                </div>
            `;

            // Adiciona o card criado ao container de resultados
            resultsContainer.innerHTML += cardLivro;
        });
    }
});