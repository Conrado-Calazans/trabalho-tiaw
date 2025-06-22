// auth.js (ATUALIZADO PARA GERENCIAR ADMIN)

const API_URL = 'http://localhost:3000';

class AuthManager {
    constructor() {
        // O estado agora é baseado no objeto do usuário salvo no sessionStorage
        this.usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    }

    // <-- MUDANÇA: Salva o objeto COMPLETO do usuário na sessão
    salvarSessaoUsuario(usuario) {
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        this.usuarioLogado = usuario;
    }

    // <-- MUDANÇA: Recupera o objeto do usuário da sessão
    getUsuarioLogado() {
        return this.usuarioLogado;
    }

    // <-- MUDANÇA: Limpa a sessão (sessionStorage) e redireciona
    logout() {
        sessionStorage.removeItem('usuarioLogado');
        this.usuarioLogado = null;
        window.location.href = 'login.html';
    }

    isLogado() {
        return this.usuarioLogado !== null;
    }

    // Faz login do usuário
    async login(email, senha) {
        try {
            const response = await fetch(`${API_URL}/usuarios?email=${email}&senha=${senha}`);
            const usuarios = await response.json();

            // A busca com query params retorna um array. Se o array não estiver vazio, o usuário foi encontrado.
            if (usuarios.length > 0) {
                const usuario = usuarios[0];
                this.salvarSessaoUsuario(usuario); // <-- MUDANÇA: Salva o usuário inteiro na sessão
                return { sucesso: true, usuario: usuario }; // Retorna o objeto do usuário
            } else {
                return { sucesso: false, erro: 'Email ou senha inválidos' };
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return { sucesso: false, erro: 'Erro de conexão. Verifique se o JSON Server está rodando.' };
        }
    }

    // Cadastro agora garante que "admin" é sempre false para novos usuários
    async cadastrar(nome, email, senha) {
        try {
            // Verifica se o email já existe
            const responseVerifica = await fetch(`${API_URL}/usuarios?email=${email}`);
            const usuariosExistentes = await responseVerifica.json();
            if (usuariosExistentes.length > 0) {
                return { sucesso: false, erro: 'Este email já está cadastrado' };
            }

            // <-- GARANTIA: Todo novo usuário não é admin
            const novoUsuario = { nome, email, senha, admin: false };

            const responsePost = await fetch(`${API_URL}/usuarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoUsuario)
            });

            if (responsePost.ok) {
                const usuarioCriado = await responsePost.json();
                return { sucesso: true, usuario: usuarioCriado };
            } else {
                return { sucesso: false, erro: 'Erro ao cadastrar usuário' };
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            return { sucesso: false, erro: 'Erro de conexão.' };
        }
    }
}

// Instância global
const authManager = new AuthManager();

// Event listeners para os formulários
document.addEventListener('DOMContentLoaded', () => {
    // Formulário de login
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const mensagem = document.getElementById('mensagem');
            
            const resultado = await authManager.login(email, senha);
            
            if (resultado.sucesso) {
                mensagem.innerHTML = '<div class="sucesso">Login realizado com sucesso! Redirecionando...</div>';
                
                setTimeout(() => {
                    // <-- MUDANÇA CRÍTICA: Redirecionamento com base no status de admin
                    if (resultado.usuario.admin) {
                        window.location.href = 'admin.html'; // Se for admin, vai para a página de admin
                    } else {
                        window.location.href = 'index.html'; // Se não for, vai para a página inicial (ou minha_conta.html)
                    }
                }, 1500);
            } else {
                mensagem.innerHTML = `<div class="erro">${resultado.erro}</div>`;
            }
        });
    }

    // Formulário de cadastro (lógica interna não precisa mudar)
    const formCadastro = document.getElementById('form-cadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const confirmaSenha = document.getElementById('confirma-senha').value;
            const mensagem = document.getElementById('mensagem');
            
            if (senha !== confirmaSenha) {
                mensagem.innerHTML = '<div class="erro">As senhas não coincidem</div>';
                return;
            }
            
            const resultado = await authManager.cadastrar(nome, email, senha);
            
            if (resultado.sucesso) {
                mensagem.innerHTML = '<div class="sucesso">Cadastro realizado com sucesso! Redirecionando para login...</div>';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            } else {
                mensagem.innerHTML = `<div class="erro">${resultado.erro}</div>`;
            }
        });
    }
});