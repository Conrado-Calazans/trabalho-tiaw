// Aguarda o DOM ser completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- BANCO DE DADOS (SIMULADO) ---
    // Array de objetos para armazenar os dados dos livros
    let books = [
        {
            id: 1,
            title: 'Como Salvar a Democracia',
            description: 'A obra reúne contribuições de acadêmicos e especialistas renomados que oferecem análises profundas e propostas concretas para fortalecer os pilares democráticos.',
            image: '/src/public/images/Democracia.png',
            pdf: '/src/public/pdfs/livro.pdf'
        },
        {
            id: 2,
            title: 'A Arte da Guerra',
            description: 'O livro ensina princípios de liderança, tática e estratégia que vão além do campo de batalha, sendo amplamente aplicado em áreas como negócios, política e desenvolvimento pessoal.',
            image: '/src/public/images/arte_guerra.jpg',
            pdf: '/src/public/pdfs/arte_guerra.pdf'
        },
        {
            id: 3,
            title: 'O Príncipe',
            description: 'É um tratado político escrito no século XVI que oferece conselhos diretos sobre como conquistar, manter e exercer o poder.',
            image: '/src/public/images/o_principe.jpg',
            pdf: '/src/public/pdfs/o_principe_maquiavel.pdf'
        },
        {
            id: 4,
            title: 'Memórias Póstumas de Brás Cubas',
            description: 'É um romance publicado em 1881 e considerado uma das obras mais importantes da literatura brasileira.',
            image: '/src/public/images/bras-cubas.jpg',
            pdf: '/src/public/pdfs/memoriasBras.pdf'
        }
    ];

    // --- SELETORES DE ELEMENTOS DO DOM ---
    const cardsContainer = document.getElementById('cardsContainer');
    const addBookBtn = document.getElementById('addBookBtn');
    const bookModal = document.getElementById('bookModal');
    const closeBookModal = document.getElementById('closeBookModal');
    const bookForm = document.getElementById('bookForm');
    const modalTitle = document.getElementById('modalTitle');
    const bookIdInput = document.getElementById('bookId');
    const bookTitleInput = document.getElementById('bookTitle');
    const bookDescriptionInput = document.getElementById('bookDescription');
    const bookImageInput = document.getElementById('bookImage');
    const bookPdfInput = document.getElementById('bookPdf');

    // --- FUNÇÕES DO CRUD ---

    /**
     * READ: Renderiza os livros na tela.
     * Limpa o container e cria um card para cada livro no array `books`.
     */
    const renderBooks = () => {
        cardsContainer.innerHTML = ''; // Limpa a lista antes de renderizar
        if (books.length === 0) {
            cardsContainer.innerHTML = '<p>Nenhum livro encontrado.</p>';
            return;
        }

        books.forEach(book => {
            const card = document.createElement('div');
            card.className = 'card';
            // Adiciona um data attribute para identificar o livro facilmente
            card.setAttribute('data-id', book.id);

            card.innerHTML = `
                <h3>${book.title}</h3>
                <img src="${book.image}" alt="${book.title}" />
                <p>${book.description}</p>
                <div class="card-actions">
                    <button class="btn-ler" onclick="openPDF('${book.pdf}')">Ver mais</button>
                    <button class="editar-btn">Editar</button>
                    <button class="remover-btn">Remover</button>
                </div>
            `;
            cardsContainer.appendChild(card);
        });
    };

    /**
     * Abre o modal, opcionalmente preenchendo o formulário para edição.
     * @param {object | null} book - O objeto do livro para editar, ou null para criar.
     */
    const openModal = (book = null) => {
        bookForm.reset(); // Limpa o formulário
        if (book) {
            // MODO EDIÇÃO
            modalTitle.textContent = 'Editar Livro';
            bookIdInput.value = book.id;
            bookTitleInput.value = book.title;
            bookDescriptionInput.value = book.description;
            bookImageInput.value = book.image;
            bookPdfInput.value = book.pdf;
        } else {
            // MODO CRIAÇÃO
            modalTitle.textContent = 'Adicionar Livro';
            bookIdInput.value = ''; // Garante que o ID está vazio
        }
        bookModal.style.display = 'block';
    };

    // Fecha o modal
    const closeModal = () => {
        bookModal.style.display = 'none';
    };

    // --- EVENT LISTENERS ---

    // Abre o modal para ADICIONAR um novo livro
    addBookBtn.addEventListener('click', () => openModal());

    // Fecha o modal ao clicar no 'x'
    closeBookModal.addEventListener('click', closeModal);

    // Fecha o modal se o usuário clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === bookModal) {
            closeModal();
        }
    });

    // Event listener para o formulário (CREATE e UPDATE)
    bookForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        const id = bookIdInput.value;
        const bookData = {
            title: bookTitleInput.value,
            description: bookDescriptionInput.value,
            image: bookImageInput.value,
            pdf: bookPdfInput.value,
        };

        if (id) {
            // UPDATE (Atualizar): Se existe um ID, atualiza o livro existente
            const bookIndex = books.findIndex(b => b.id == id);
            if (bookIndex > -1) {
                books[bookIndex] = { id: parseInt(id), ...bookData };
            }
        } else {
            // CREATE (Criar): Se não há ID, cria um novo livro
            // Gera um ID único baseado no timestamp atual
            bookData.id = Date.now();
            books.push(bookData);
        }

        renderBooks(); // Re-renderiza a lista de livros
        closeModal(); // Fecha o modal
    });

    // Event listener para os botões de EDITAR e REMOVER (usando delegação de eventos)
    cardsContainer.addEventListener('click', (event) => {
        const target = event.target;
        const card = target.closest('.card');
        if (!card) return;

        const bookId = card.getAttribute('data-id');
        const book = books.find(b => b.id == bookId);

        if (target.classList.contains('editar-btn')) {
            // Ação de EDITAR
            openModal(book);
        }

        if (target.classList.contains('remover-btn')) {
            // Ação de DELETAR
            if (confirm(`Tem certeza que deseja remover o livro "${book.title}"?`)) {
                // Filtra o array, mantendo todos os livros exceto o que foi removido
                books = books.filter(b => b.id != bookId);
                renderBooks(); // Re-renderiza a lista
            }
        }
    });
    
    // Função para abrir o PDF (você já a tinha, mas é bom garantir que ela exista globalmente ou seja chamada corretamente)
    window.openPDF = (pdfPath) => {
        // Implemente a lógica para abrir o PDF, talvez em uma nova aba ou no leitor da página
        // Exemplo simples:
        window.open(pdfPath, '_blank');
        // Ou, para usar sua tela de leitura:
        // const telaLeitura = document.getElementById('telaLeitura');
        // telaLeitura.style.display = 'block';
        // // Aqui você precisaria carregar o conteúdo do PDF na tela...
    };


    // --- INICIALIZAÇÃO ---
    // Renderiza os livros iniciais quando a página é carregada
    renderBooks();
});