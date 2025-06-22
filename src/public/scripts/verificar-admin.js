// Este script age como um "guardião" para as páginas de administração.

(function() {
    // Pega o usuário logado do sessionStorage (que é limpo ao fechar a aba)
    const usuarioString = sessionStorage.getItem('usuarioLogado');

    // Se não houver dados do usuário na sessão...
    if (!usuarioString) {
        alert('Acesso negado. Por favor, faça o login como administrador.');
        window.location.href = 'login.html'; // Redireciona para o login
        return;
    }

    const usuario = JSON.parse(usuarioString);

    // Se o usuário logado NÃO tiver a propriedade admin: true...
    if (!usuario.admin) {
        alert('Acesso negado. Esta página é somente para administradores.');
        window.location.href = 'index.html'; // Redireciona para a página inicial
        return;
    }

    // Se o script chegou até aqui, o usuário é um admin. A página pode carregar.
    console.log('Acesso de administrador concedido.');
    window.location.href = 'index.html';

})();