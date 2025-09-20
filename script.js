// --- CONFIGURAÇÕES GLOBAIS ---
let settings = {
    soundEnabled: true,
    matrixIntensity: 1,
    currentTheme: 'matrix'
};

// --- ÁUDIO ---
// O ideal é usar arquivos de áudio externos para melhor performance e cache.
// Crie uma pasta 'assets/sounds/' e coloque os arquivos 'keyboard.wav' e 'click.wav' lá.
// Se os arquivos não existirem, os sons simplesmente não tocarão, sem quebrar a aplicação.
const keyboardSound = new Audio('assets/sounds/keyboard.wav');
const clickSound = new Audio('assets/sounds/click.wav');
keyboardSound.volume = 0.5; // Ajuste o volume se necessário

// --- FUNÇÕES DE RENDERIZAÇÃO E INICIALIZAÇÃO ---

// Carrega as informações do perfil do arquivo config.js
function loadProfileInfo() {
    document.getElementById('profile-pic').src = userConfig.profileImage;
    document.getElementById('profile-name').textContent = userConfig.profileName;
    
    // Configura o texto de digitação e a animação
    const subtitleElement = document.getElementById('subtitle');
    subtitleElement.textContent = userConfig.subtitle;
    
    // Reinicia a animação de digitação (se necessário) e remove o cursor no final
    subtitleElement.style.animation = 'none';
    subtitleElement.offsetHeight; // Força o reflow
    subtitleElement.style.animation = ''; 
    
    subtitleElement.addEventListener('animationend', () => {
        subtitleElement.style.borderRight = 'none';
    }, { once: true });
}

// Renderiza os botões de link a partir do config.js
function renderLinks() {
    const linksContainer = document.getElementById('links-container');
    linksContainer.innerHTML = '';
    
    userConfig.links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = "_blank";
        linkElement.rel = "noopener noreferrer";
        linkElement.classList.add('link-button');
        linkElement.ariaLabel = `Link para ${link.title}`; // Acessibilidade
        
        let icon = '🔗';
        if (link.url.includes('github')) icon = '🐱';
        if (link.url.includes('linkedin')) icon = '💼';
        if (link.url.includes('instagram')) icon = '📸';
        if (link.url.includes('x.com') || link.url.includes('twitter.com')) icon = '𝕏';
        
        linkElement.innerHTML = `<span style="margin-right: 10px;">${icon}</span> ${link.title}`;
        
        linkElement.addEventListener('click', () => {
            if (settings.soundEnabled) {
                clickSound.currentTime = 0;
                clickSound.play();
            }
        });
        
        linkElement.addEventListener('mouseenter', () => {
            if (settings.soundEnabled) {
                keyboardSound.currentTime = 0;
                keyboardSound.play();
            }
        });
        
        linksContainer.appendChild(linkElement);
    });
}

// --- EFEITO MATRIX ---

function setupMatrixBackground() {
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const matrixChars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    const drops = Array(columns).fill(1).map(() => Math.floor(Math.random() * canvas.height / fontSize));
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--main-color');
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i] += settings.matrixIntensity;
        }
    }
    
    setInterval(draw, 35);
}

// --- CONTROLES E EVENTOS ---

function setupControls() {
    // Botão de intensidade
    document.getElementById('matrix-intensity').addEventListener('click', function() {
        settings.matrixIntensity = (settings.matrixIntensity % 3) + 1;
        this.textContent = `Intensidade: ${'★'.repeat(settings.matrixIntensity)}`;
    });
    
    // Botões de tema
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            document.body.classList.toggle('theme-red', theme === 'red');
        });
    });
}

function setupEasterEgg() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
            konamiIndex++;
        } else {
            konamiIndex = 0;
        }
        
        if (konamiIndex === konamiCode.length) {
            alert('Easter egg desbloqueado!');
            document.body.style.animation = 'rainbowBG 5s linear infinite';
            const css = `@keyframes rainbowBG { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }`;
            const style = document.createElement('style');
            style.appendChild(document.createTextNode(css));
            document.head.appendChild(style);
            konamiIndex = 0;
        }
    });
}

function setupStats() {
    const viewCountEl = document.getElementById('view-count');
    const clickCountEl = document.getElementById('click-count');

    // Simula o aumento de visualizações
    let currentViews = parseInt(localStorage.getItem('stacklyViews')) || userConfig.initialViews;
    if (sessionStorage.getItem('hasViewed') !== 'true') {
        currentViews++;
        localStorage.setItem('stacklyViews', currentViews);
        sessionStorage.setItem('hasViewed', 'true');
    }
    viewCountEl.textContent = currentViews;
    
    // Carrega e atualiza contagem de cliques
    let totalClicks = parseInt(localStorage.getItem('stacklyClicks')) || userConfig.initialClicks;
    clickCountEl.textContent = totalClicks;

    document.getElementById('links-container').addEventListener('click', (e) => {
        if (e.target.closest('a')) {
            totalClicks++;
            clickCountEl.textContent = totalClicks;
            localStorage.setItem('stacklyClicks', totalClicks);
        }
    });
}

// --- FUNÇÃO DE INICIALIZAÇÃO GERAL ---

function init() {
    loadProfileInfo();
    renderLinks();
    setupMatrixBackground();
    setupControls();
    setupEasterEgg();
    setupStats();
}

// Inicia tudo quando a página for carregada
window.onload = init;
