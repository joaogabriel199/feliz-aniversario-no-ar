// Mensagens introspectivas e alegres — personalize como quiser
const lines = [
  "Hoje é dia de celebrar você com todo meu carinho — que alegria vê-la completando mais um ano de vida!",
  "Seu sorriso ilumina os dias ao redor; desejo risos espontâneos, abraços quentinhos e surpresas doces neste novo ano.",
  "Que cada manhã traga vontade de sonhar, que cada dia traga motivos para sorrir e que você sinta todo amor que carregamos por você.",
  "Feliz aniversário! Celebro sua vida, sua história e tudo o que ainda está por vir — vamos brindar às possibilidades e à felicidade."
];

const reflectBtn = document.getElementById('reflectBtn');
const reflection = document.getElementById('reflection');
const typedEl = document.getElementById('typed');
const closeRef = document.getElementById('closeRef');
const themeBtn = document.getElementById('themeBtn');
const playMusicBtn = document.getElementById('playMusic');
const toggleBalloonsBtn = document.getElementById('toggleBalloons');
const balloonContainer = document.getElementById('balloonContainer');

// Preferência de reduzir movimento
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Estado de controle para evitar sobreposição e permitir cancelamento
let typing = false;
let cancel = false;
let timers = [];

function clearTimers() {
  timers.forEach(t => clearTimeout(t));
  timers = [];
}

function sleep(ms) {
  return new Promise(resolve => {
    const t = setTimeout(() => resolve(t), ms);
    timers.push(t);
  });
}

function typeText(el, text, speed = 30) {
  // Se usuário preferir reduzir movimento, escreve tudo de uma vez
  if (reduceMotion || speed <= 0) {
    el.textContent = text;
    return Promise.resolve();
  }
  return new Promise(resolve => {
    el.textContent = '';
    let i = 0;
    function step() {
      if (cancel) {
        resolve();
        return;
      }
      if (i < text.length) {
        el.textContent += text.charAt(i++);
        const t = setTimeout(step, speed);
        timers.push(t);
      } else {
        resolve();
      }
    }
    step();
  });
}

async function showReflection() {
  if (typing) return; // evitar múltiplos cliques
  typing = true;
  cancel = false;
  reflection.setAttribute('aria-hidden', 'false');
  reflection.classList.add('open');
  typedEl.textContent = '';
  reflectBtn.disabled = true;
  // move foco para fechar ao abrir
  closeRef.focus();

  try {
    if (reduceMotion) {
      // Se reduzir movimento, mostrar tudo rapidamente
      typedEl.textContent = lines.join('\n\n');
    } else {
      for (let i = 0; i < lines.length; i++) {
        // mais lento para dar tempo de ler e sentir
        await typeText(typedEl, lines[i], 48);
        if (cancel) break;
        // pausa maior para enfatizar a emoção
        await sleep(1400);
        if (i < lines.length - 1) {
          // pequena pausa extra antes da próxima linha
          await sleep(600);
        }
        if (cancel) break;
        // Mantém uma quebra visual entre as frases
        if (i < lines.length - 1) typedEl.textContent += '\n\n';
      }
    }
  } finally {
    typing = false;
    reflectBtn.disabled = false;
  }
}

function hideReflection() {
  cancel = true;
  clearTimers();
  reflection.classList.remove('open');
  reflection.setAttribute('aria-hidden', 'true');
  typedEl.textContent = '';
  reflectBtn.disabled = false;
  typing = false;
  // retorna foco para quem abriu
  reflectBtn.focus();
}

reflectBtn.addEventListener('click', showReflection);
closeRef.addEventListener('click', hideReflection);

// fechar com Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideReflection();
});

// Tema claro/escuro com aria-pressed
function updateThemeButton() {
  const isDark = document.body.classList.contains('dark');
  themeBtn.textContent = isDark ? 'Modo claro' : 'Modo noturno';
  themeBtn.setAttribute('aria-pressed', String(isDark));
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  updateThemeButton();
});

// Inicia estado do botão
updateThemeButton();

/* ----------------- MÚSICA: Lugar Ao Sol ----------------- */
const audioMusic = document.getElementById('audioMusic');
let musicPlaying = false;

playMusicBtn.addEventListener('click', () => {
  if (musicPlaying) {
    audioMusic.pause();
    musicPlaying = false;
    playMusicBtn.setAttribute('aria-pressed', 'false');
    playMusicBtn.textContent = 'Tocar música';
  } else {
    audioMusic.play().catch(err => console.warn('Erro ao reproduzir música:', err));
    musicPlaying = true;
    playMusicBtn.setAttribute('aria-pressed', 'true');
    playMusicBtn.textContent = 'Pausar música';
  }
});

// Atualiza estado quando música termina
audioMusic.addEventListener('ended', () => {
  musicPlaying = false;
  playMusicBtn.setAttribute('aria-pressed', 'false');
  playMusicBtn.textContent = 'Tocar música';
});

/* ----------------- BALÕES ANIMADOS ----------------- */
let balloonInterval = null;
let balloonsEnabled = true;

function random(min, max) { return Math.random() * (max - min) + min; }

function spawnBalloon() {
  if (!balloonContainer || reduceMotion || !balloonsEnabled) return;
  const b = document.createElement('div');
  b.className = 'balloon';
  const size = random(36, 86); // px
  b.style.width = `${Math.round(size)}px`;
  b.style.height = `${Math.round(size * 1.12)}px`;
  const left = random(6, 94);
  b.style.left = `${left}%`;
  const hue = Math.floor(random(0, 360));
  b.style.background = `linear-gradient(135deg, hsl(${hue} 90% 70%), hsl(${(hue+30)%360} 75% 55%))`;
  b.style.opacity = String(random(0.85, 1));

  const duration = random(8000, 18000);
  b.style.animation = `rise ${Math.round(duration)}ms linear forwards`;
  b.style.transform = `translateY(0) rotate(${random(-20,20)}deg)`;

  balloonContainer.appendChild(b);
  // remove after animation
  const remover = setTimeout(() => {
    b.remove();
    clearTimeout(remover);
  }, duration + 200);
}

function startBalloons() {
  if (reduceMotion) return; // não inicia se reduzir movimento
  if (balloonInterval) return;
  balloonsEnabled = true;
  toggleBalloonsBtn.setAttribute('aria-pressed', 'true');
  balloonInterval = setInterval(() => {
    // spawn 1 balloon, occasionally spawn 2
    spawnBalloon();
    if (Math.random() < 0.18) spawnBalloon();
  }, 900);
}

function stopBalloons() {
  balloonsEnabled = false;
  toggleBalloonsBtn.setAttribute('aria-pressed', 'false');
  if (balloonInterval) { clearInterval(balloonInterval); balloonInterval = null; }
  // remove existing
  if (balloonContainer) {
    balloonContainer.querySelectorAll('.balloon').forEach(n => n.remove());
  }
}

toggleBalloonsBtn.addEventListener('click', () => {
  if (balloonsEnabled) stopBalloons(); else startBalloons();
});

// inicia automaticamente as bexigas (se o usuário não pedir reduce-motion)
if (!reduceMotion) startBalloons();

