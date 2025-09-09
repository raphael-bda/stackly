const links = [
    { title: "Meu Portfólio", url: "#", clicks: 0 },
    { title: "GitHub", url: "https://github.com/raphael-bda", clicks: 0 },
    { title: "LinkedIn", url: "https://www.linkedin.com/in/raphael-bda/", clicks: 0 },
    { title: "Instagram", url: "https://www.instagram.com/tzller/", clicks: 0 },
    { title: "Twitter", url: "https://x.com/raphael_bda", clicks: 0 }
];

// Configurações do usuário
let settings = {
    soundEnabled: true,
    matrixIntensity: 1,
    currentTheme: 'matrix'
};

// EFEITOS SONOROS CORRIGIDOS
const keyboardSound = new Audio("data:audio/wav;base64,UklGRlIBAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAATElTVBoAAABJTkZPSVNGVAAAAAQAAABMYXZmNTguNzYuMTAwAGRhdGEAAAAA");
const clickSound = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAATElTVBoAAABJTkZPSVNGVAAAAAQAAABMYXZmNTguNzYuMTAwAGRhdGE=");

// Função para renderizar os links
function renderLinks() {
    const linksContainer = document.getElementById('links-container');
    linksContainer.innerHTML = '';
    
    links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = "_blank";
        linkElement.rel = "noopener noreferrer";
        linkElement.classList.add('link-button');
        
        let icon = '🔗';
        if (link.url.includes('github')) icon = '🐱';
        if (link.url.includes('linkedin')) icon = '💼';
        if (link.url.includes('instagram')) icon = '📸';
        if (link.url.includes('x.com') || link.url.includes('twitter.com')) icon = '𝕏';
        
        linkElement.innerHTML = `<span style="margin-right: 10px;">${icon}</span> ${link.title}`;
        
        linkElement.addEventListener('click', () => {
            link.clicks++;
            updateClickCount();
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

function updateClickCount() {
    const initialClicks = 368;
    const totalClicks = links.reduce((sum, link) => sum + link.clicks, initialClicks);
    document.getElementById('click-count').textContent = totalClicks;
}

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
    
    const drops = Array(columns).fill(1).map(() => Math.floor(Math.random() * -100));
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // CORREÇÃO APLICADA AQUI
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

function setupControls() {
    document.getElementById('matrix-intensity').addEventListener('click', function() {
        settings.matrixIntensity = (settings.matrixIntensity % 3) + 1;
        this.textContent = `Intensidade: ${'★'.repeat(settings.matrixIntensity)}`;
    });
    
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            changeTheme(theme);
        });
    });
}

function changeTheme(theme) {
    settings.currentTheme = theme;
    document.body.classList.toggle('theme-red', theme === 'red');
}

function setupEasterEgg() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === konamiCode[konamiIndex]) {
            konamiIndex++;
        } else {
            konamiIndex = 0;
        }
        
        if (konamiIndex === konamiCode.length) {
            alert('Easter egg desbloqueado!');
            // Adicione aqui um efeito especial, como um tema arco-íris
            document.body.style.animation = 'rainbowBG 5s linear infinite';
            const css = `
                @keyframes rainbowBG {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            const style = document.createElement('style');
            style.appendChild(document.createTextNode(css));
            document.head.appendChild(style);

            konamiIndex = 0;
        }
    });
}

window.onload = function() {
    renderLinks();
    setupMatrixBackground();
    setupControls();
    setupEasterEgg();

    const initialViews = 1024;
    const viewCountEl = document.getElementById('view-count');
    let currentViews = initialViews;
    
    // Simula o aumento de visualizações
    if(sessionStorage.getItem('hasViewed') !== 'true') {
        currentViews++;
        viewCountEl.textContent = currentViews;
        sessionStorage.setItem('hasViewed', 'true');
    } else {
        viewCountEl.textContent = currentViews;
    }

    // A animação de digitação agora é feita apenas com CSS, removendo a necessidade do JS para isso.
    const typingText = document.querySelector('.typing-text');
    typingText.addEventListener('animationend', () => {
        typingText.style.borderRight = 'none';
    });
};