# Stackly 2.0 - Immersive Link-in-Bio

![Status do Projeto](https://img.shields.io/badge/status-concluído-brightgreen)

Uma página de "link-in-bio" interativa e de código aberto, com uma temática cyberpunk/Matrix, projetada para ser uma experiência imersiva. Ideal para desenvolvedores que querem exibir seus links com um estilo único e memorável.

### [➡️ Acesse a demonstração ao vivo aqui!](https://stackly-pied.vercel.app/)

---

## ✨ Funcionalidades

Stackly foi construído para ser mais do que uma lista de links. É uma interface viva que reage ao usuário, criando uma atmosfera única.

### Experiência e Imersão
* **Sequência de Boot Cinematográfica:** Ao entrar, a página simula o boot de um sistema operacional, estabelecendo a atmosfera antes de revelar a interface principal.
* **Fundo "Matrix Rain" Reativo:** O clássico efeito de chuva de caracteres reage à posição do cursor do mouse, com os caracteres próximos se iluminando.
* **Painel de Temas e Efeitos:** Um painel flutuante discreto permite ao usuário alterar o esquema de cores e ativar/desativar efeitos visuais como "Scanlines" (linhas de monitor antigo) e "Distorção CRT".
* **Controle de Áudio:** Os sons da interface podem ser facilmente ativados ou desativados através do painel de efeitos, e a preferência do usuário é salva.
* **Console Secreto (Easter Egg):** Ao pressionar a tecla de crase (`), o usuário pode acessar um "console" oculto que exibe logs de sistema falsos em tempo real.
* **Favicon Dinâmico:** O ícone da aba do navegador muda de cor para combinar perfeitamente com o tema selecionado.

### Detalhes Vivos
* **Saudação Sensível ao Tempo:** A página recebe o usuário com uma saudação diferente dependendo da hora do dia, "digitada" na tela com uma animação de velocidade adaptativa.
* **Animação de "Decodificação":** Ao passar o mouse sobre um link, o texto passa por uma rápida animação, como se o sistema estivesse processando o destino.
* **Efeito "Glitch":** A foto de perfil e outros elementos de texto sofrem "glitches" aleatórios e sutis, reforçando a ideia de uma interface digital instável.
* **Painel de Status "Vivo":** O rodapé exibe um "pulso" constante do sistema e mensagens de status que mudam periodicamente.
* **Efeitos Sonoros:** Sons de clique ao interagir com os links aumentam a imersão tátil.
* **Easter Egg Clássico:** Um segredo para quem conhece o Konami Code! 😉

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído do zero utilizando apenas as tecnologias fundamentais da web:

* **HTML5:** Para a estrutura semântica do conteúdo.
* **CSS3:** Para toda a estilização, utilizando Flexbox, Variáveis CSS para temas dinâmicos e animações com `@keyframes`.
* **JavaScript (Vanilla):** Para toda a interatividade, incluindo a manipulação do DOM, o efeito do Canvas e a lógica de todos os recursos dinâmicos.

---

## 🚀 Como Executar Localmente

O projeto não requer nenhuma dependência ou build. Basta seguir os passos:

1.  Clone este repositório:
    ```bash
    git clone [https://github.com/raphael-bda/stackly.git](https://github.com/raphael-bda/stackly.git)
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd stackly
    ```
3.  Abra o arquivo `index.html` diretamente no seu navegador de preferência.

E pronto!

---

## ⚙️ Como Personalizar

É muito fácil adaptar o Stackly para o seu próprio uso. Todas as configurações principais estão centralizadas no arquivo `config.js`:

1.  **Informações de Perfil:** Abra `config.js` e altere `profileName` e o caminho para sua `profileImage`.

2.  **Saudações:** No mesmo arquivo, personalize as frases de saudação no objeto `subtitles`. O script escolherá a frase correta com base na hora do dia.
    ```javascript
    const userConfig = {
        // ...
        subtitles: {
            morning: "> Bom dia. Inicializando sistemas...",
            afternoon: "> Sistemas online. Boa tarde.",
            evening: "> Entrando em modo noturno. Boa noite.",
            night: "> Modo noturno ativado. Bem-vindo."
        },
        // ...
    };
    ```

3.  **Links:** Adicione ou remova seus links no array `links`. Os ícones são detectados automaticamente para as redes mais comuns.
    ```javascript
    // ...
    links: [
        { title: "Meu Portfólio", url: "[https://stackly.com](https://stackly.com)" },
        { title: "GitHub", url: "[https://github.com/raphael-bda](https://github.com/raphael-bda)" },
        // Adicione ou remova links conforme necessário
    ],
    // ...
    ```

---

Feito por Raphael Barbosa.
