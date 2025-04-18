# Projeto da Solução

A solução proposta consiste no desenvolvimento de uma plataforma digital de biblioteca online, acessível via navegador e dispositivos móveis, que permitirá aos usuários visualizar, organizar e acompanhar suas leituras de forma prática, gratuita e personalizada. A plataforma será construída com foco em usabilidade, acessibilidade e escalabilidade, permitindo o crescimento do acervo e o envolvimento de uma comunidade leitora. 

A proposta contempla não apenas a disponibilização dos livros, mas também funcionalidades que otimizem a experiência do usuário, como categorização de obras, progresso de leitura, sugestões personalizadas com base em preferências e recursos de organização pessoal. 

<span style="color:red">Pré-requisitos: <a href="4-Gestão-Configuração.md"> Ambiente e Ferramentas de Trabalho</a></span>

## Tecnologias Utilizadas

Para o desenvolvimento da biblioteca online com livros gratuitos, serão utilizadas tecnologias web amplamente conhecidas, de fácil manutenção e com grande suporte da comunidade. A seguir, estão listadas todas as tecnologias e ferramentas envolvidas: 

Linguagens de Programação e Marcação: 

HTML5: Responsável pela estrutura do conteúdo das páginas da aplicação. 
CSS3: Utilizado para estilização da interface e criação de um design responsivo. 
JavaScript (Vanilla JS): Usado para implementar a lógica de interação do usuário com a aplicação (pesquisa, filtros, navegação entre livros, marcação de progresso etc.). 
Ferramentas e IDEs: 

Visual Studio Code (VS Code): Ambiente de desenvolvimento principal utilizado pela equipe. 
Git e GitHub: Ferramentas para controle de versão e hospedagem do projeto. 
GitHub Pages: Usado para publicar a aplicação online de forma gratuita. 
Bibliotecas e Recursos Adicionais: 

Google Fonts: Para tipografia personalizada. 
Font Awesome (ou similar): Para utilização de ícones na interface. 
LocalStorage (JavaScript API): Para armazenar localmente informações como progresso de leitura, favoritos e configurações do usuário. 
 

Integração das Tecnologias – Fluxo de Interação 

A figura abaixo mostra como ocorre a interação do usuário com o sistema e como cada tecnologia é utilizada no processo (representado no diagrama): 



Descrição do fluxo: 

Usuário acessa a biblioteca online via navegador (interface HTML/CSS). 
Navega pela interface responsiva, onde as opções de livros, categorias e filtros são apresentados com apoio de JavaScript. 
Realiza ações como buscar livros ou abrir uma leitura, e o JavaScript lida com essas interações, atualizando o conteúdo dinamicamente na tela. 
Marcações de leitura, favoritos ou preferências são salvas via LocalStorage no navegador do usuário, sem a necessidade de servidor. 
O conteúdo (livros em PDF/EPUB e páginas da aplicação) é servido diretamente pelo GitHub Pages, permitindo acesso rápido e gratuito. 
 

Elementos Visuais e Documentação de Interface 

📌 User Flow (Fluxo do Usuário) 

Representa o caminho percorrido pelo usuário desde a entrada na página inicial até a leitura de um livro ou marcação de progresso. Inclui etapas como "Acessar", "Explorar Livros", "Filtrar Categorias", "Ler Livro", "Marcar Progresso". 

📌 Storyboards 

Esboços feitos à mão ou digitalmente que ilustram cenários de uso da aplicação. Por exemplo: 

Um estudante acessando a biblioteca para encontrar um livro didático. 
Um leitor casual explorando os livros por categoria e salvando favoritos. 

📌 Wireframes (Protótipos de Telas) 

Protótipos visuais das telas principais da aplicação: 

Tela Inicial: Com menu de navegação, busca e destaque de livros. 
Tela de Catálogo: Listagem de livros por categoria. 
Tela de Leitura: Interface com leitor de PDF/EPUB e controles de navegação. 
Tela de Favoritos/Progresso: Painel onde o usuário visualiza livros salvos e progresso. 


## Arquitetura da solução

A arquitetura da aplicação será baseada em uma abordagem estática com interação no cliente, ideal para projetos hospedados via GitHub Pages: 

Frontend (Cliente) 
Toda a lógica da aplicação estará no lado do cliente, com páginas HTML, estilos CSS e scripts JavaScript executados diretamente no navegador do usuário. A interface permitirá a navegação por títulos, filtros, leitura dos livros e organização do conteúdo. 
Armazenamento Local (LocalStorage) 
Para funcionalidades como marcação de progresso de leitura e favoritos, será utilizado o LocalStorage do navegador, eliminando a necessidade de um banco de dados externo no estágio inicial do projeto. 
Hospedagem (GitHub Pages) 
Os arquivos do projeto (HTML, CSS, JS e livros digitais) serão versionados e hospedados no GitHub Pages, tornando o acesso ao sistema fácil e gratuito. 
 
 **Exemplo do diagrama de Arquitetura**:
 
 ![Exemplo de Arquitetura](./images/arquitetura-exemplo.png)




# Interface do Sistema


_Visão geral da interação do usuário por meio das telas do sistema. Apresente as principais interfaces da plataforma._

## Tela principal do sistema

_Descrição da tela principal do sistema._

[`Tela principal do sistema`](images/)


## Telas do requisito 1

_Descrição da tela relativa à atividade 1._

[`Tela da atividade 1`](images/)

_Descrição da tela relativa à atividade 2._

[`Tela da atividade 2`](images/)


## Telas do requisito 2

_Descrição da tela relativa à atividade 1._

[`Tela da atividade 1`](images/)

_Descrição da tela relativa à atividade 2._

[`Tela da atividade 2`](images/)



