// auth.js (CORRIGIDO E INTEGRADO)

// URL base do JSON Server
const API_URL = 'http://localhost:3000';

class AuthManager {
    constructor() {
        // --- MUDANÇA ---
        // Agora o estado é baseado no ID guardado no localStorage
        this.loggedUserId = localStorage.getItem('loggedUserId');
    }

    // --- MUDANÇA ---
    // Salva APENAS O ID do usuário no localStorage
    salvarIdUsuario(id) {
        localStorage.setItem('loggedUserId', id);
        this.loggedUserId = id;
    }

    // --- MUDANÇA ---
    // Recupera o ID do usuário do localStorage
    getLoggedUserId() {
        return localStorage.getItem('loggedUserId');
    }

    // --- MUDANÇA ---
    // Limpa o localStorage e redireciona
    logout() {
        localStorage.removeItem('loggedUserId');
        this.loggedUserId = null;
        // Redireciona para a página de login, não para a index.
        window.location.href = 'login.html'; 
    }

    // Verifica se usuário está logado
    isLogado() {
        return this.loggedUserId !== null;
    }

    // Faz login do usuário
    async login(email, senha) {
        try {
            const response = await fetch(`${API_URL}/usuarios`);
            const usuarios = await response.json();
            
            const usuario = usuarios.find(u => u.email === email && u.senha === senha);
            
            if (usuario) {
                // --- MUDANÇA ---
                // Chama a nova função para salvar apenas o ID no localStorage
                this.salvarIdUsuario(usuario.id); 
                return { sucesso: true, usuario };
            } else {
                return { sucesso: false, erro: 'Email ou senha inválidos' };
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return { sucesso: false, erro: 'Erro de conexão. Verifique se o JSON Server está rodando.' };
        }
    }

    // Função de cadastro (sem alterações na lógica interna)
    async cadastrar(nome, email, senha) {
        try {
            const response = await fetch(`${API_URL}/usuarios`);
            const usuarios = await response.json();
            
            const emailExiste = usuarios.find(u => u.email === email);
            if (emailExiste) {
                return { sucesso: false, erro: 'Este email já está cadastrado' };
            }

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

// Instância global do gerenciador de autenticação
const authManager = new AuthManager();

// Event listeners para formulários (com pequeno ajuste no redirecionamento)
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
                    // --- MUDANÇA ---
                    // Redireciona para a página da conta, não para a index
                    window.location.href = 'minha_conta.html'; 
                }, 1500);
            } else {
                mensagem.innerHTML = `<div class="erro">${resultado.erro}</div>`;
            }
        });
    }

    // Formulário de cadastro (sem alterações, pois já redireciona para o login)
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
