/**
 * STACKLY IMMERSIVE INTERFACE
 * ---------------------------
 * Author: Raphael Barbosa
 * Version: 2.0
 * * Este script controla toda a interatividade da página Stackly,
 * desde a sequência de boot inicial até os efeitos visuais e sonoros.
 */
const App = {
    // --- Configurações e Estado da Aplicação ---
    settings: {
        soundEnabled: true,
        matrixIntensity: 1,
        scanlinesEnabled: false,
        crtEnabled: false,
        mouse: { x: 0, y: 0, radius: 4000 }, // Raio ao quadrado para otimizar cálculos
        consoleLogInterval: null
    },
    clickSound: new Audio('assets/sounds/click.mp3'),

    // --- Ponto de Entrada Principal ---
    // Inicia a sequência de boot que, ao final, chama o 'init' principal.
    runBootSequence() {
        const bootScreen = document.getElementById('boot-screen');
        const mainContent = document.getElementById('main-content');
        const lines = Array.from(document.querySelectorAll('.boot-line'));
        
        let delay = 500;
        lines.forEach(line => {
            setTimeout(() => line.classList.add('visible'), delay);
            delay += 500;
        });

        // Revela o conteúdo principal após o boot
        setTimeout(() => {
            bootScreen.style.opacity = '0';
            mainContent.classList.add('visible');
            this.init(); // Inicia o resto dos scripts da aplicação
        }, delay + 500);
        
        // Remove a tela de boot do DOM após a transição para otimizar
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, delay + 1500);
    },

    // --- Inicializador dos Módulos da Aplicação ---
    // Chamado após a sequência de boot.
    init() {
        this.setupAudio();
        this.loadProfileInfo();
        this.renderLinks();
        this.setupMatrixBackground();
        this.setupControls();
        this.setupFloatingThemeSelector();
        this.setupStatusPanel();
        this.setupTextGlitches();
        this.setupSecretConsole();
        this.setupEasterEgg();
        this.setupStats();
    },

    // =========================================================================
    // == MÓDULOS DE SETUP DE COMPONENTES ======================================
    // =========================================================================

    /**
     * Carrega a preferência de áudio do usuário (salva no localStorage).
     */
    setupAudio() {
        const savedSoundPref = localStorage.getItem('stacklySoundEnabled');
        if (savedSoundPref !== null) {
            this.settings.soundEnabled = savedSoundPref === 'true';
        }
    },

    /**
     * Carrega nome, foto e a saudação dinâmica com efeito de digitação.
     */
    loadProfileInfo() {
        document.getElementById('profile-name').textContent = userConfig.profileName;
        
        const hour = new Date().getHours();
        let subtitleText;
        if (hour >= 5 && hour < 12) subtitleText = userConfig.subtitles.morning;
        else if (hour >= 12 && hour < 18) subtitleText = userConfig.subtitles.afternoon;
        else if (hour >= 18 && hour < 22) subtitleText = userConfig.subtitles.evening;
        else subtitleText = userConfig.subtitles.night;

        const subtitleElement = document.getElementById('subtitle');
        subtitleElement.textContent = subtitleText;

        // Animação de digitação com duração e passos dinâmicos
        const textLength = subtitleText.length;
        const animationDuration = textLength * 0.08;
        subtitleElement.style.width = '0';
        subtitleElement.style.animation = 'none';
        subtitleElement.offsetHeight; // Força um reflow para reiniciar a animação
        subtitleElement.style.animation = `typing ${animationDuration}s steps(${textLength}, end) forwards, blink-caret 0.75s step-end infinite`;

        subtitleElement.addEventListener('animationend', () => {
             subtitleElement.style.borderRightColor = 'transparent';
        }, { once: true });
    },

    /**
     * Renderiza os links do `config.js` e aplica o efeito de "decodificação" no hover.
     */
    renderLinks() {
        const linksContainer = document.getElementById('links-container');
        linksContainer.innerHTML = '';
        const chars = "!<>-_\\/[]{}—=+*^?#________";

        userConfig.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.target = "_blank";
            linkElement.rel = "noopener noreferrer";
            linkElement.classList.add('link-button');
            linkElement.ariaLabel = `Link para ${link.title}`;
            
            let icon = '🔗';
            if (link.url.includes('github')) icon = '🐱';
            if (link.url.includes('linkedin')) icon = '💼';
            if (link.url.includes('instagram')) icon = '📸';
            if (link.url.includes('x.com') || link.url.includes('twitter.com')) icon = '𝕏';
            
            const textElement = document.createElement('span');
            textElement.textContent = link.title;
            linkElement.innerHTML = `<span style="margin-right: 10px;">${icon}</span>`;
            linkElement.appendChild(textElement);
            
            let interval = null;
            linkElement.addEventListener('mouseenter', event => {
                if (this.settings.soundEnabled) { this.clickSound.currentTime = 0; this.clickSound.play(); }
                let iteration = 0;
                clearInterval(interval);
                interval = setInterval(() => {
                    event.target.querySelector('span:last-child').textContent = link.title.split("").map((letter, index) => {
                        if(index < iteration) return link.title[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join("");
                    if(iteration >= link.title.length) clearInterval(interval);
                    iteration += 1 / 3;
                }, 30);
            });

            linkElement.addEventListener('click', () => { if (this.settings.soundEnabled) { this.clickSound.currentTime = 0; this.clickSound.play(); }});
            linksContainer.appendChild(linkElement);
        });
    },

    /**
     * Controla a animação de fundo "Matrix Rain" com reatividade ao mouse.
     */
    setupMatrixBackground() {
        const canvas = document.getElementById('matrix-bg');
        const ctx = canvas.getContext('2d');
        const fontSize = 14;
        const matrixChars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789";
        let columns, drops;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / fontSize);
            drops = Array(columns).fill(1).map(() => Math.floor(Math.random() * canvas.height / fontSize));
        };
        
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', e => {
            this.settings.mouse.x = e.x;
            this.settings.mouse.y = e.y;
        });
        resizeCanvas();
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const mainColor = getComputedStyle(document.body).getPropertyValue('--main-color');
            ctx.font = `${fontSize}px monospace`;
            for (let i = 0; i < drops.length; i++) {
                const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                const dx = x - this.settings.mouse.x;
                const dy = y - this.settings.mouse.y;
                const distanceSq = dx * dx + dy * dy;
                ctx.fillStyle = distanceSq < this.settings.mouse.radius ? '#fff' : mainColor;
                ctx.fillText(text, x, y);
                if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i] += this.settings.matrixIntensity;
            }
        };

        let lastTime = 0;
        const fps = 30;
        const nextFrame = 1000 / fps;
        let timer = 0;
        const animate = timeStamp => {
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
            if (timer > nextFrame) {
                draw();
                timer = 0;
            } else {
                timer += deltaTime;
            }
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    },

    /**
     * Adiciona os listeners para os controles principais (ex: intensidade).
     */
    setupControls() {
        document.getElementById('matrix-intensity').addEventListener('click', e => {
            this.settings.matrixIntensity = (this.settings.matrixIntensity % 3) + 1;
            e.currentTarget.textContent = `Intensidade: ${'★'.repeat(this.settings.matrixIntensity)}`;
        });
    },
    
    /**
     * Gerencia o painel flutuante de temas e efeitos visuais.
     */
    setupFloatingThemeSelector() {
        const triggerBtn = document.getElementById('theme-trigger-btn');
        const themePanel = document.getElementById('theme-panel');
        const themeButtons = themePanel.querySelectorAll('.theme-btn');
        const soundToggle = document.getElementById('sound-toggle');
        const soundOnIcon = document.getElementById('sound-on-icon');
        const soundOffIcon = document.getElementById('sound-off-icon');
        const scanlinesToggle = document.getElementById('scanlines-toggle');
        const crtToggle = document.getElementById('crt-toggle');

        const updateSoundButton = (isSoundEnabled) => {
            soundOnIcon.style.display = isSoundEnabled ? 'block' : 'none';
            soundOffIcon.style.display = isSoundEnabled ? 'none' : 'block';
            soundToggle.classList.toggle('active', isSoundEnabled);
        };

        triggerBtn.addEventListener('click', () => themePanel.classList.toggle('active'));

        themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                const color = btn.getAttribute('data-color');
                document.body.setAttribute('data-theme', theme);
                this.updateFavicon(color);
            });
        });

        soundToggle.addEventListener('click', () => {
            this.settings.soundEnabled = !this.settings.soundEnabled;
            localStorage.setItem('stacklySoundEnabled', this.settings.soundEnabled);
            updateSoundButton(this.settings.soundEnabled);
        });
        
        scanlinesToggle.addEventListener('click', () => { this.settings.scanlinesEnabled = !this.settings.scanlinesEnabled; document.body.classList.toggle('scanlines-active', this.settings.scanlinesEnabled); scanlinesToggle.classList.toggle('active', this.settings.scanlinesEnabled); });
        crtToggle.addEventListener('click', () => { this.settings.crtEnabled = !this.settings.crtEnabled; document.body.classList.toggle('crt-effect', this.settings.crtEnabled); crtToggle.classList.toggle('active', this.settings.crtEnabled); });

        document.addEventListener('click', e => { if (!themePanel.contains(e.target) && !triggerBtn.contains(e.target)) themePanel.classList.remove('active'); });

        updateSoundButton(this.settings.soundEnabled);
    },
    
    /**
     * Controla o painel de status "vivo" no rodapé.
     */
    setupStatusPanel() {
        const messages = ["> SYS. CHECK: OK", "> ENCRYPTION: ACTIVE", "> CONNECTION: STABLE", "> DATASTREAM: NORMAL", "> STANDBY..."];
        const statusMessageEl = document.getElementById('status-message');
        let messageIndex = 0;
        setInterval(() => {
            statusMessageEl.style.opacity = '0';
            setTimeout(() => {
                messageIndex = (messageIndex + 1) % messages.length;
                statusMessageEl.textContent = messages[messageIndex];
                statusMessageEl.style.opacity = '1';
            }, 500);
        }, 5000);
    },

    /**
     * Adiciona glitches aleatórios e sutis em elementos de texto.
     */
    setupTextGlitches() {
        const targets = [document.getElementById('profile-name'), document.querySelector('.logo-top-left')];
        const chars = "!<>-_\\/[]{}—=+*^?#";
        setInterval(() => {
            const target = targets[Math.floor(Math.random() * targets.length)];
            const originalText = target.textContent;
            let iteration = 0;
            let interval = setInterval(() => {
                target.textContent = originalText.split("").map((letter, index) => {
                    if (index < iteration) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("");
                if (iteration >= originalText.length) {
                    clearInterval(interval);
                    target.textContent = originalText;
                }
                iteration += 1 / 2;
            }, 50);
        }, 7000);
    },

    // =========================================================================
    // == MÓDULOS DE EASTER EGGS E ESTATÍSTICAS ================================
    // =========================================================================

    /**
     * Gerencia o console secreto ativado pela tecla '`'.
     */
    setupSecretConsole() {
        const consoleOverlay = document.getElementById('console-overlay');
        const consoleContent = document.getElementById('console-content');
        const logMessages = ["KERNEL_MSG: User activity detected.", "MEM_CHECK: All clear.", "CPU_USAGE: 15%", "NETWORK: Packet received.", "RENDER_THREAD: Syncing...", "AUTH_SVC: Token validated.", "DATA_STREAM: Secure."];
        document.addEventListener('keydown', e => {
            if (e.key === '`') {
                const isActive = consoleOverlay.style.display === 'block';
                consoleOverlay.style.display = isActive ? 'none' : 'block';
                if (!isActive) {
                    consoleContent.innerHTML = '';
                    this.settings.consoleLogInterval = setInterval(() => {
                        const timestamp = new Date().toLocaleTimeString();
                        const msg = logMessages[Math.floor(Math.random() * logMessages.length)];
                        consoleContent.innerHTML += `<div>[${timestamp}] ${msg}</div>`;
                        consoleOverlay.scrollTop = consoleOverlay.scrollHeight;
                    }, 1000);
                } else {
                    clearInterval(this.settings.consoleLogInterval);
                }
            }
        });
    },

    /**
     * Listener para o Konami Code.
     */
    setupEasterEgg() {
        const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
        let konamiIndex = 0;
        document.addEventListener('keydown', e => {
            if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) konamiIndex++;
            else konamiIndex = 0;
            if (konamiIndex === konamiCode.length) {
                alert('Easter egg desbloqueado!');
                document.body.style.animation = 'rainbowBG 5s linear infinite';
                const css = document.createElement('style');
                css.appendChild(document.createTextNode('@keyframes rainbowBG { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }'));
                document.head.appendChild(css);
                konamiIndex = 0;
            }
        });
    },

    /**
     * Carrega e atualiza as estatísticas de visualização e cliques.
     */
    setupStats() {
        const viewCountEl = document.getElementById('view-count');
        const clickCountEl = document.getElementById('click-count');
        let currentViews = parseInt(localStorage.getItem('stacklyViews')) || userConfig.initialViews;
        if (sessionStorage.getItem('hasViewed') !== 'true') {
            currentViews++;
            localStorage.setItem('stacklyViews', currentViews);
            sessionStorage.setItem('hasViewed', 'true');
        }
        viewCountEl.textContent = currentViews;
        let totalClicks = parseInt(localStorage.getItem('stacklyClicks')) || userConfig.initialClicks;
        clickCountEl.textContent = totalClicks;
        document.getElementById('links-container').addEventListener('click', e => {
            if (e.target.closest('a')) {
                totalClicks++;
                clickCountEl.textContent = totalClicks;
                localStorage.setItem('stacklyClicks', totalClicks);
            }
        });
    },
    
    // =========================================================================
    // == FUNÇÕES UTILITÁRIAS ==================================================
    // =========================================================================
    
    /**
     * Atualiza o favicon da página para combinar com a cor do tema.
     * @param {string} color - A cor em formato hexadecimal (ex: '#00FF00').
     */
    updateFavicon(color) {
        const favicon = document.getElementById('favicon');
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = favicon.href;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, 32, 32);
            ctx.globalCompositeOperation = 'source-in';
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 32, 32);
            favicon.href = canvas.toDataURL('image/png');
        };
    }
};

// --- Inicia a aplicação ao carregar a janela ---
window.onload = () => App.runBootSequence();
