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
    git clone [https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git](https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git)
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd SEU-REPOSITORIO
    ```
3.  Abra o arquivo `index.html` diretamente no seu navegador de preferência.

E pronto!

---

## Como Personalizar

É muito fácil adaptar o Stackly para o seu próprio uso:

1.  **Estrutura:** Separe os arquivos `style.css` e `script.js` do `index.html` para melhor organização (se ainda não o fez).
2.  **Foto de Perfil:** Substitua o arquivo `assets/photoprofile.jpg` pela sua foto.
3.  **Informações e Links:** Abra o arquivo `script.js` e modifique o array `links` com seus próprios títulos e URLs.
    ```javascript
    const links = [
        { title: "Meu Portfólio", url: "[https://seu-portfolio.com](https://seu-portfolio.com)", clicks: 0 },
        { title: "GitHub", url: "[https://github.com/seu-usuario](https://github.com/seu-usuario)", clicks: 0 },
        // Adicione ou remova links conforme necessário
    ];
    ```
4.  **Nome:** Altere o nome de perfil diretamente no `index.html` ou, como sugestão de melhoria, adicione-o a um objeto de configuração no JavaScript.

---

Feito por Raphael Barbosa.
