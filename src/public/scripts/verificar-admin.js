// Este script age como um "guardião" para as páginas de administração.

(function() {
    // Pega o usuário logado do sessionStorage (que é limpo ao fechar a aba)
    const usuarioString = sessionStorage.getItem('usuarioLogado');

    // Se não houver dados do usuário na sessão...
    if (!usuarioString) {
        alert('Acesso negado. Por favor, faça o login como administrador.');
        window.location.href = 'login.html'; // Redireciona para o login
        return; // Interrompe a execução
    }

    const usuario = JSON.parse(usuarioString);

    // Se o usuário logado NÃO tiver a propriedade admin: true...
    if (!usuario.admin) {
        alert('Acesso negado. Esta página é somente para administradores.');
        window.location.href = 'index.html'; // Redireciona para a página inicial
        return; // Interrompe a execução
    }

    // Se o script chegou até aqui, o usuário é um admin. A página pode carregar.
    // REMOVA OU COMENTE A LINHA ABAIXO:
    // window.location.href = 'index.html'; // <--- ESTA LINHA CAUSA O REDIRECIONAMENTO INDESEJADO
    console.log('Acesso de administrador concedido. Página de administração carregando.');

})();