// Este script protege páginas que exigem que QUALQUER usuário esteja logado.
(function() {
    // Pega o usuário logado do sessionStorage
    const usuarioString = sessionStorage.getItem('usuarioLogado');

    // Se não houver nenhum usuário na sessão...
    if (!usuarioString) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html'; // Redireciona para o login
        return; // Para a execução do script
    }
})();