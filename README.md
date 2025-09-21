# Stackly  MATRIX 🧑‍💻

![Status do Projeto](https://img.shields.io/badge/status-concluído-brightgreen)
Uma página de "link-in-bio" interativa e de código aberto com uma temática inspirada em Matrix. Perfeito para desenvolvedores que desejam exibir seus links com um estilo retrô e cyberpunk único.

### [➡️ Acesse a demonstração ao vivo aqui!](https://stackly-pied.vercel.app/))

---

## ✨ Funcionalidades

* **Fundo Interativo:** Clássico efeito "Matrix Rain" criado com HTML Canvas.
* **Seletor de Tema:** Alterne entre o verde "Matrix" e um tema vermelho "Alerta".
* **Controle de Intensidade:** Ajuste a velocidade do efeito de fundo.
* **Efeitos Sonoros:** Sons de teclado mecânico ao passar o mouse e de clique ao selecionar um link.
* **Animação de Digitação:** O subtítulo possui um efeito de digitação para imersão.
* **Design Responsivo:** A página se adapta a diferentes tamanhos de tela, de desktops a celulares.
* **Easter Egg:** Um segredo para quem conhece o Konami Code! 😉

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído do zero utilizando apenas as tecnologias fundamentais da web:

* **HTML5:** Para a estrutura semântica do conteúdo.
* **CSS3:** Para estilização, utilizando Flexbox, Variáveis CSS para temas dinâmicos e animações com `@keyframes`.
* **JavaScript (Vanilla):** Para toda a interatividade, incluindo a manipulação do DOM, o efeito do Canvas e a lógica dos temas e sons.

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

## Como Personalizar

É muito fácil adaptar o Stackly para o seu próprio uso. Todas as configurações principais estão centralizadas no arquivo `config.js`:

1.  **Foto de Perfil:** Substitua o arquivo `assets/photoprofile.jpg` pela sua foto e, se desejar, atualize o caminho no `config.js`.
2.  **Informações e Links:** Abra o arquivo `config.js` e modifique o objeto `userConfig` com seu nome, subtítulo e a lista de links que deseja exibir.
    ```javascript
    const userConfig = {
        // --- INFORMAÇÕES DO PERFIL ---
        profileName: "Seu Nome Aqui",
        profileImage: "assets/photoprofile.jpg",
        subtitle: "Sua frase de efeito...",

        // --- LINKS ---
        links: [
            { title: "Meu Portfólio", url: "[https://seu-portfolio.com](https://seu-portfolio.com)" },
            { title: "GitHub", url: "[https://github.com/seu-usuario](https://github.com/seu-usuario)" },
            // Adicione ou remova links conforme necessário
        ],

        // ...
    };
    ```

---

Feito por Raphael Barbosa.
