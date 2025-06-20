document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-book-form');
    const livrosUl = document.getElementById('livros');

    function getLivros() {
        return JSON.parse(localStorage.getItem('livros') || '[]');
    }

    function setLivros(livros) {
        localStorage.setItem('livros', JSON.stringify(livros));
    }

    function getFavoritos() {
        return JSON.parse(localStorage.getItem('favoritos') || '[]');
    }

    function setFavoritos(favoritos) {
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }

    function toggleFavorito(idx) {
        const livros = getLivros();
        const favoritos = getFavoritos();
        const livro = livros[idx];
        const favIdx = favoritos.findIndex(f => f.titulo === livro.titulo && f.autor === livro.autor);
        if (favIdx >= 0) {
            favoritos.splice(favIdx, 1); // Remove dos favoritos
        } else {
            favoritos.push(livro); // Adiciona aos favoritos
        }
        setFavoritos(favoritos);
        renderLivros();
    }

    function renderLivros() {
        livrosUl.innerHTML = '';
        const isFavPage = window.location.pathname.includes('fav2.html');
        const livros = isFavPage ? getFavoritos() : getLivros();
        const favoritos = getFavoritos();
        const isAdmin = window.location.pathname.includes('admin.html');
        livros.forEach((livro, idx) => {
            // Em fav2.html, idx é do array de favoritos!
            const isFavorito = favoritos.some(f => f.titulo === livro.titulo && f.autor === livro.autor);
            const li = document.createElement('li');
            li.className = 'book-card';
            li.innerHTML = `
                <img src="${livro.imagem || 'https://via.placeholder.com/70x100?text=Sem+Capa'}" alt="Capa do livro" class="book-cover">
                <div class="book-info">
                    <h3 class="book-title">${livro.titulo}</h3>
                    <p class="book-desc">${livro.descricao}</p>
                    <div class="book-actions">
                        <button class="read-btn" onclick="openPDF('${livro.pdf || '#'}')">Ler</button>
                        <span class="favorite" onclick="${isFavPage ? `removerFavorito(${idx})` : `toggleFavorito(${idx})`}" title="${isFavPage ? 'Remover dos favoritos' : (isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos')}" style="color:${isFavorito ? '#ff2222' : '#bbb'}">&#10084;</span>
                        ${isAdmin && !isFavPage ? `
                            <button class="edit-btn" onclick="editarLivro(${idx})" title="Editar" style="margin-left:10px;">✏️</button>
                            <button class="remove-btn" onclick="removerLivro(${idx})" title="Remover" style="margin-left:5px;">🗑️</button>
                        ` : ''}
                    </div>
                </div>
            `;
            livrosUl.appendChild(li);
        });
    }

    window.removerFavorito = function(idx) {
        const favoritos = getFavoritos();
        favoritos.splice(idx, 1);
        setFavoritos(favoritos);
        renderLivros();
    };

    window.toggleFavorito = function(idx) {
        const livros = getLivros();
        const favoritos = getFavoritos();
        const livro = livros[idx];
        const favIdx = favoritos.findIndex(f => f.titulo === livro.titulo && f.autor === livro.autor);
        if (favIdx >= 0) {
            favoritos.splice(favIdx, 1); // Remove dos favoritos
        } else {
            favoritos.push(livro); // Adiciona aos favoritos
        }
        setFavoritos(favoritos);
        renderLivros();
        // Se estiver em outra página, também atualiza fav2.html se estiver aberta em outra aba
        if (window.location.pathname.includes('fav2.html')) {
            renderLivros();
        }
        // Atualiza fav2.html em outras abas/janelas abertas
        localStorage.setItem('fav_sync', Date.now());
    };

    // Sincroniza remoção/adicionar favoritos entre abas/janelas
    window.addEventListener('storage', function(e) {
        if (e.key === 'favoritos' || e.key === 'fav_sync') {
            renderLivros();
        }
    });

    window.removerLivro = function(idx) {
        const livros = getLivros();
        livros.splice(idx, 1);
        setLivros(livros);
        renderLivros();
    };

    window.editarLivro = function(idx) {
        const livros = getLivros();
        const livro = livros[idx];
        document.getElementById('titulo').value = livro.titulo;
        document.getElementById('autor').value = livro.autor;
        document.getElementById('genero').value = livro.genero;
        document.getElementById('descricao').value = livro.descricao;        

        // Salva o índice do livro sendo editado
        form.setAttribute('data-editando', idx);
    };

    // Só adiciona eventos do formulário se ele existir (admin.html)
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const titulo = document.getElementById('titulo').value.trim();
            const autor = document.getElementById('autor').value.trim();
            const genero = document.getElementById('genero').value.trim();
            const descricao = document.getElementById('descricao').value.trim();
            const imagemFile = document.getElementById('imagem').files[0];
            const pdfFile = document.getElementById('pdf').files[0];

            if (!titulo || !autor || !genero || !descricao ) {
                mostrarMensagem('Por favor, preencha todos os campos!', 'erro');
                return;
            }

            const toBase64 = file => new Promise((resolve, reject) => {
                if (!file) return resolve(null);
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            let imagem = await toBase64(imagemFile);
            let pdf = await toBase64(pdfFile);

            const livros = getLivros();
            const editandoIdx = form.getAttribute('data-editando');

            if (editandoIdx !== null) {
                // Editando livro existente
                const idx = parseInt(editandoIdx, 10);
                // Se não selecionar nova imagem/pdf, mantém a antiga
                if (!imagem) imagem = livros[idx].imagem;
                if (!pdf) pdf = livros[idx].pdf;
                livros[idx] = { titulo, autor, genero, descricao, imagem, pdf };
                setLivros(livros);
                form.removeAttribute('data-editando');
            } else {
                // Novo livro
                livros.push({ titulo, autor, genero, descricao, imagem, pdf });
                setLivros(livros);
            }
            mostrarMensagem('Ação realizada com sucesso!', 'sucesso');
            form.reset();
            renderLivros();
        });

        // Função mostrarMensagem também só precisa existir se houver form
        function mostrarMensagem(mensagem, tipo = 'sucesso') {
            let msgDiv = document.getElementById('mensagem-retorno');
            if (!msgDiv) {
                msgDiv = document.createElement('div');
                msgDiv.id = 'mensagem-retorno';
                msgDiv.style.textAlign = 'center';
                msgDiv.style.margin = '16px 0';
                msgDiv.style.fontWeight = 'bold';
                msgDiv.style.color = tipo === 'sucesso' ? '#1a9c3c' : '#c00';
                form.parentNode.insertBefore(msgDiv, form);
            }
            msgDiv.textContent = mensagem;
            msgDiv.style.display = 'block';
            setTimeout(() => {
                msgDiv.style.display = 'none';
            }, 2500);
        }
    }

    renderLivros();
});