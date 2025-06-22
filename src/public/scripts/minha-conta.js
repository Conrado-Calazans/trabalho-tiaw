document.addEventListener('DOMContentLoaded', function() {
    // authManager já foi carregado pelo script auth.js
    // O script verificar-login.js já garantiu que temos um usuário.

    const usuarioLogado = authManager.getUsuarioLogado(); // Pega os dados do usuário direto do nosso AuthManager

    // --- CONFIGURAÇÃO ---
    const BASE_URL = 'http://localhost:3000';
    
    // --- ELEMENTOS DO DOM ---
    const accountDetails = document.getElementById('account-details');
    const editFormContainer = document.getElementById('edit-form-container');
    const editButton = document.getElementById('edit-button');
    const cancelEditButton = document.getElementById('cancel-edit-button');
    const deleteAccountButton = document.getElementById('delete-account-button');
    const editForm = document.getElementById('edit-form');
    const logoutButton = document.getElementById('logout-button');
    
    const userNameDisplay = document.getElementById('user-name');
    const userEmailDisplay = document.getElementById('user-email');
    // ... (outros elementos que você queira manipular) ...
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    // --- FUNÇÕES ---

    // Função para carregar e exibir os dados do usuário
    function carregarDadosDaConta() {
        if (!usuarioLogado) {
            console.error("Não foi possível carregar os dados: usuário não encontrado na sessão.");
            return;
        }

        // Preenche as informações básicas com os dados da sessão (mais rápido!)
        userNameDisplay.textContent = usuarioLogado.nome;
        userEmailDisplay.textContent = usuarioLogado.email;
        
        // Preenche o formulário de edição
        nameInput.value = usuarioLogado.nome;
        emailInput.value = usuarioLogado.email;

        // Aqui você pode adicionar as chamadas fetch para histórico, favoritos, etc.
        // Ex: fetch(`${BASE_URL}/favoritos?usuarioId=${usuarioLogado.id}`).then(...)
    }

    // --- LÓGICA DE EVENTOS ---

    // Carrega os dados assim que a página é aberta
    carregarDadosDaConta();

    // Botão de Logout
    logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        authManager.logout(); // Usa a função central de logout
    });

    // Lógica para mostrar/esconder formulário de edição
    editButton.addEventListener('click', () => {
        accountDetails.style.display = 'none';
        editFormContainer.style.display = 'block';
    });

    cancelEditButton.addEventListener('click', () => {
        accountDetails.style.display = 'block';
        editFormContainer.style.display = 'none';
    });

    // Submissão do formulário de edição
    editForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const updatedData = { nome: nameInput.value, email: emailInput.value };

        fetch(`${BASE_URL}/usuarios/${usuarioLogado.id}`, { // Usa o ID do usuário da sessão
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        })
        .then(response => {
            if (!response.ok) throw new Error('Falha ao atualizar.');
            return response.json();
        })
        .then(usuarioAtualizado => {
            alert('Dados atualizados com sucesso!');
            // Atualiza os dados na sessão também!
            authManager.salvarSessaoUsuario(usuarioAtualizado);
            location.reload(); // Recarrega a página para mostrar os dados novos
        })
        .catch(error => {
            console.error('Erro ao atualizar usuário:', error)
            alert('Não foi possível atualizar os dados.');
        });
    });

    // Botão para deletar a conta
    deleteAccountButton.addEventListener('click', function() {
        if (confirm('Você tem CERTEZA que deseja excluir sua conta? Esta ação é irreversível.')) {
            fetch(`${BASE_URL}/usuarios/${usuarioLogado.id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert('Conta excluída com sucesso.');
                    authManager.logout(); // Faz o logout corretamente
                    window.location.href = 'index.html';
                } else {
                    alert('Ocorreu um erro ao excluir a conta.');
                }
            })
            .catch(error => console.error('Erro ao excluir usuário:', error));
        }
    });
});