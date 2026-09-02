const arenasData = [
  { "id": 1, "name": "Estádio Goblin", "min_trophies": 0 },
  { "id": 2, "name": "Poço dos Ossos", "min_trophies": 300 },
  { "id": 3, "name": "Torneio Bárbaro", "min_trophies": 600 },
  { "id": 4, "name": "Parquinho da P.E.K.K.A", "min_trophies": 1000 },
  { "id": 5, "name": "Vale dos Feitiços", "min_trophies": 1300 },
  { "id": 6, "name": "Oficina do construtor", "min_trophies": 1600 },
  { "id": 7, "name": "Arena Real", "min_trophies": 2000 },
  { "id": 8, "name": "Pico Congelado", "min_trophies": 2300 },
  { "id": 9, "name": "Arena da Selva", "min_trophies": 2600 },
  { "id": 10, "name": "Montanha do Porco", "min_trophies": 3000 },
  { "id": 11, "name": "Vale Elétrico", "min_trophies": 3400 },
  { "id": 12, "name": "Cidade Assombrada", "min_trophies": 3800 },
  { "id": 13, "name": "Esconderijo do Patife", "min_trophies": 4200 },
  { "id": 14, "name": "Pico da Serenidade", "min_trophies": 4600 },
  { "id": 15, "name": "Mina do Mineiro", "min_trophies": 5000 },
  { "id": 16, "name": "Cozinha do Executor", "min_trophies": 5500 },
  { "id": 17, "name": "Cripta Real", "min_trophies": 6000 },
  { "id": 18, "name": "Santuário Silencioso", "min_trophies": 6500 },
  { "id": 19, "name": "Spa do Dragão", "min_trophies": 7000 },
  { "id": 20, "name": "Campo de Treinamento", "min_trophies": 7500 },
  { "id": 21, "name": "Clash Fest", "min_trophies": 8000 },
  { "id": 22, "name": "PANQUECAS!", "min_trophies": 8500 },
  { "id": 23, "name": "Valkalla", "min_trophies": 9000 },
  { "id": 24, "name": "Arena Lendária", "min_trophies": 9500 },
  { "id": 25, "name": "Cabana do Lenhador", "min_trophies": 10000 },
  { "id": 26, "name": "Estrada Real", "min_trophies": 10500 },
  { "id": 27, "name": "Rua da Mosqueteira", "min_trophies": 11000 },
  { "id": 28, "name": "Pico dos Heróis", "min_trophies": 11500 },
  { "id": 29, "name": "Escola Mágica", "min_trophies": 12000 },
  { "id": 30, "name": "Arena do Clash Supremo", "min_trophies": 12500 },
  { "id": 31, "name": "Taverna do Pequeno Príncipe", "min_trophies": 13000 },
  { "id": 32, "name": "Praça dos Espíritos", "min_trophies": 13500 }
];

function renderizarArenas() {
  const container = document.getElementById('arenas-container');
  if (!container) return;

  container.innerHTML = '';

  arenasData.forEach(arena => {
    const card = document.createElement('div');
    card.className = 'card-arena';
    
    card.innerHTML = `
      <img src="imagens/${arena.id}.png" alt="${arena.name}">
      <h3>${arena.name}</h3>
      <p>🏆 Mínimo de troféus: ${arena.min_trophies}</p>
    `;

    // ADICIONADO: Calcula a posição exata do mouse dentro do card da arena
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });

    container.appendChild(card);
  });
}

// Garante a execução quando a página carrega
document.addEventListener('DOMContentLoaded', renderizarArenas);

// 1. Função que alterna entre as telas do menu
function navegarPara(idTela) {
  const telas = document.querySelectorAll('.tela');
  telas.forEach(tela => tela.classList.remove('ativa'));

  const telaAlvo = document.getElementById(idTela);
  if (telaAlvo) {
    telaAlvo.classList.add('ativa');
  }

  // Identifica qual tela foi aberta
  if (idTela === 'tela-cartas') {
    if (typeof carregarCartasDoArquivo === 'function') carregarCartasDoArquivo();
  } else if (idTela === 'tela-arenas') {
    carregarArenasDoArquivo();
  }
}

// 2. Função que lê a variável 'cinco' do arquivo cinco.js e desenha na tela
function carregarArenasDoArquivo() {
  const container = document.getElementById('arenas-container');
  container.innerHTML = ''; // Limpa o texto "Carregando Arenas..."

  // Busca diretamente a variável 'cinco' do seu arquivo cinco.js
  const listaDeArenas = window.cinco || (typeof cinco !== 'undefined' ? cinco : null);

  if (!listaDeArenas) {
    container.innerHTML = '<p>Erro: Variável "cinco" não foi encontrada no arquivo cinco.js</p>';
    return;
  }

  // Percorre cada arena/deck e cria o card na tela
  listaDeArenas.forEach(arena => {
    const cardElement = document.createElement('div');
    cardElement.className = 'carta-card';
    
    cardElement.innerHTML = `
      <img src="${arena.imagem || arena.iconUrl || arena.icon || ''}" alt="${arena.nome || arena.name || ''}">
      <h3>${arena.nome || arena.name || ''}</h3>
      <p>${arena.trofeus || arena.trophies || arena.elixir || ''}</p>
    `;
    
    container.appendChild(cardElement);
  });
}
