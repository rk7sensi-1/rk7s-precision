/**
 * ==========================================
 * AUXILIO RK7S - SISTEMA DE CÓDIGOS V3.0
 * ==========================================
 * Arquivo: chaves_codigos.js
 * Versão: 3.0 ULTRA
 * Autor: @rk7s_ffx
 * ==========================================
 */

// =====================
// CONFIGURAÇÕES AVANÇADAS
// =====================
const CONFIG = {
  // Precisão e Mira
  PRECISAO_MULTIPLICADOR: 0.98,
  SNAP_SPEED: 0.75,
  SMOOTH_TRACKING: 0.45,
  
  // Centralização Inteligente
  CENTRO_FIXO: true,
  LIMITE_VERTICAL: 0.12,
  OFFSET_HEADSHOT: -0.08,
  
  // Níveis de Suavização
  SUAVIZACAO_ULTRA_LEVE: 0.12,
  SUAVIZACAO_LEVE: 0.22,
  SUAVIZACAO_MEDIA: 0.38,
  SUAVIZACAO_FORTE: 0.58,
  SUAVIZACAO_ULTRA_FORTE: 0.78,
  
  // Controle de Recuo
  RECUO_BASE: 0.58,
  RECUO_VERTICAL: 0.72,
  RECUO_HORIZONTAL: 0.85,
  COMPENSACAO_AUTO: true,
  
  // Sensibilidade
  SENSI_BASE: 0.88,
  SENSI_ADS: 0.92,
  SENSI_SCOPE: 0.95,
  ADAPTATIVO: true,
  
  // Campo de Visão
  FOV_MAX: 10,
  FOV_PRIORIDADE_CENTRO: true,
  
  // Otimizações
  DELAY_INPUT: 3,
  PREDICTION_FRAMES: 2,
  TEMPO_TRANSICAO: 120,
  
  // Anti-Detecção
  RANDOMNESS_FACTOR: 0.02,
  HUMANIZE: true
};

// =====================
// FUNÇÕES MATEMÁTICAS AVANÇADAS
// =====================

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Adiciona micro-variação humana para evitar detecção
 */
const humanize = (valor) => {
  if (!CONFIG.HUMANIZE) return valor;
  const noise = (Math.random() - 0.5) * CONFIG.RANDOMNESS_FACTOR;
  return valor + noise;
};

/**
 * Predição de movimento do alvo
 */
const prever = (posAtual, posAnterior, frames = CONFIG.PREDICTION_FRAMES) => {
  if (!posAnterior) return posAtual;
  const velocidade = {
    x: (posAtual.x - posAnterior.x) * frames,
    y: (posAtual.y - posAnterior.y) * frames
  };
  return {
    x: posAtual.x + velocidade.x,
    y: posAtual.y + velocidade.y
  };
};

/**
 * Centralização com limite vertical e humanização
 */
const centralizar = (atual, alvo, fator, usarEasing = true) => {
  const t = usarEasing ? easeOut(fator) : fator;
  
  const yCentral = clamp(
    alvo.y,
    alvo.y - CONFIG.LIMITE_VERTICAL,
    alvo.y + CONFIG.LIMITE_VERTICAL
  );
  
  return {
    x: humanize(lerp(atual.x, alvo.x, t)),
    y: humanize(lerp(atual.y, yCentral, t))
  };
};

/**
 * Calcula distância euclidiana entre dois pontos
 */
const distancia = (p1, p2) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Calcula ângulo entre dois pontos
 */
const calcularAngulo = (p1, p2) => {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};

/**
 * Suavização adaptativa baseada na distância
 */
const suavizacaoAdaptativa = (dist, base) => {
  if (dist < 20) return base * 1.5;  // Perto = mais suave
  if (dist < 50) return base;
  return base * 0.7;  // Longe = mais rápido
};

// =====================
// SISTEMA DE CÓDIGOS ULTRA
// =====================

const CHAVES_CODIGOS = {
  /**
   * ═══════════════════════════════════
   * PRECISÃO FULL - SISTEMA ULTRA
   * ═══════════════════════════════════
   */
  'PF-8X9K-4M2N': `
console.log('╔══════════════════════════════════════╗');
console.log('║  ✓ PRECISÃO ULTRA - ATIVADO         ║');
console.log('╚══════════════════════════════════════╝');

const SistemaPrecisaoUltra = {
  ativo: true,
  multiplicador: ${CONFIG.PRECISAO_MULTIPLICADOR},
  estabilizacao: true,
  microAjustes: true,
  
  aplicar(valor, velocidade = 0) {
    if (!this.ativo) return valor;
    
    let resultado = valor * this.multiplicador;
    
    // Estabilização em movimento rápido
    if (this.estabilizacao && velocidade > 0.5) {
      resultado *= 0.95;
    }
    
    // Micro-ajustes para precisão extrema
    if (this.microAjustes) {
      const ajuste = Math.sin(Date.now() / 1000) * 0.001;
      resultado += ajuste;
    }
    
    return clamp(resultado, -1, 1);
  },
  
  otimizar(coords, vel) {
    return {
      x: this.aplicar(coords.x, vel.x),
      y: this.aplicar(coords.y, vel.y)
    };
  },
  
  reset() {
    console.log('  → Precisão resetada');
  }
};

window.SistemaPrecisaoUltra = SistemaPrecisaoUltra;
console.log('  → Multiplicador: ' + SistemaPrecisaoUltra.multiplicador);
console.log('  → Estabilização: ' + (SistemaPrecisaoUltra.estabilizacao ? 'ON' : 'OFF'));
console.log('  → Micro-ajustes: ' + (SistemaPrecisaoUltra.microAjustes ? 'ON' : 'OFF'));
`,

  /**
   * ═══════════════════════════════════
   * CONTROLE DE RECUO - SISTEMA AVANÇADO
   * ═══════════════════════════════════
   */
  'RR-3L7P-9W1Q': `
console.log('╔══════════════════════════════════════╗');
console.log('║  ✓ ANTI-RECUO AVANÇADO - ATIVADO    ║');
console.log('╚══════════════════════════════════════╝');

const AntiRecuoAvancado = {
  ativo: true,
  baseIntensidade: ${CONFIG.RECUO_BASE},
  vertical: ${CONFIG.RECUO_VERTICAL},
  horizontal: ${CONFIG.RECUO_HORIZONTAL},
  compensacaoAuto: ${CONFIG.COMPENSACAO_AUTO},
  padrao: [],
  aprendizado: true,
  
  aplicar(recuo, direcao = 'vertical') {
    if (!this.ativo) return recuo;
    
    const mult = direcao === 'vertical' ? this.vertical : this.horizontal;
    let resultado = recuo * this.baseIntensidade * mult;
    
    // Compensação automática
    if (this.compensacaoAuto) {
      resultado *= 0.82;
    }
    
    // Aprende o padrão de recuo
    if (this.aprendizado && this.padrao.length < 30) {
      this.padrao.push(recuo);
    }
    
    return clamp(resultado, 0, recuo);
  },
  
  compensar(posicao, recuoY, recuoX = 0) {
    return {
      x: posicao.x - this.aplicar(recuoX, 'horizontal'),
      y: posicao.y - this.aplicar(recuoY, 'vertical')
    };
  },
  
  getPadraoAprendido() {
    if (this.padrao.length === 0) return null;
    const media = this.padrao.reduce((a, b) => a + b) / this.padrao.length;
    return media;
  },
  
  resetarAprendizado() {
    this.padrao = [];
    console.log('  → Padrão de recuo resetado');
  }
};

window.AntiRecuoAvancado = AntiRecuoAvancado;
console.log('  → Intensidade base: ' + AntiRecuoAvancado.baseIntensidade);
console.log('  → Controle vertical: ' + AntiRecuoAvancado.vertical);
console.log('  → Controle horizontal: ' + AntiRecuoAvancado.horizontal);
console.log('  → Compensação auto: ' + (AntiRecuoAvancado.compensacaoAuto ? 'ON' : 'OFF'));
console.log('  → Aprendizado: ' + (AntiRecuoAvancado.aprendizado ? 'ON' : 'OFF'));
`,

  /**
   * ═══════════════════════════════════
   * OTIMIZAÇÃO DE INPUT - ZERO LAG
   * ═══════════════════════════════════
   */
  'IL-6H5T-2Y8V': `
console.log('╔══════════════════════════════════════╗');
console.log('║  ✓ INPUT ZERO-LAG - ATIVADO         ║');
console.log('╚══════════════════════════════════════╝');

const InputZeroLag = {
  ativo: true,
  reducaoDelay: ${CONFIG.DELAY_INPUT},
  buffer: [],
  maxBuffer: 5,
  predicao: true,
  
  otimizar(tempoMs) {
    if (!this.ativo) return tempoMs;
    const otimizado = Math.max(0, tempoMs - this.reducaoDelay);
    return otimizado;
  },
  
  processarComando(comando, tempo) {
    const tempoOtimizado = this.otimizar(tempo);
    
    // Buffer de comandos para predição
    if (this.predicao) {
      this.buffer.push({cmd: comando, t: tempoOtimizado});
      if (this.buffer.length > this.maxBuffer) {
        this.buffer.shift();
      }
    }
    
    return {
      comando: comando,
      tempo: tempoOtimizado,
      ganho: tempo - tempoOtimizado,
      timestamp: Date.now()
    };
  },
  
  preverProximoInput() {
    if (this.buffer.length < 2) return null;
    const ultimo = this.buffer[this.buffer.length - 1];
    const penultimo = this.buffer[this.buffer.length - 2];
    return {
      cmd: ultimo.cmd,
      delta: ultimo.t - penultimo.t
    };
  },
  
  limparBuffer() {
    this.buffer = [];
  }
};

window.InputZeroLag = InputZeroLag;
console.log('  → Redução de delay: ' + InputZeroLag.reducaoDelay + 'ms');
console.log('  → Buffer ativo: ' + InputZeroLag.predicao);
console.log('  → Tamanho do buffer: ' + InputZeroLag.maxBuffer);
`,

  /**
   * ═══════════════════════════════════
   * FOV - CAMPO DE VISÃO INTELIGENTE
   * ═══════════════════════════════════
   */
  'FV-4D9R-7S3C': (fov = 0) => `
const fovConfigurado = clamp(${fov}, 0, ${CONFIG.FOV_MAX});

console.log('╔══════════════════════════════════════╗');
console.log('║  ✓ FOV INTELIGENTE - CONFIGURADO    ║');
console.log('╚══════════════════════════════════════╝');

const FOVInteligente = {
  ativo: fovConfigurado > 0,
  valor: fovConfigurado,
  raio: fovConfigurado * 12,
  prioridadeCentro: ${CONFIG.FOV_PRIORIDADE_CENTRO},
  alvosVisiveis: [],
  
  dentroDoCampo(posicao, centro) {
    if (!this.ativo) return true;
    const dist = distancia(posicao, centro);
    return dist <= this.raio;
  },
  
  calcularPrioridade(posicao, centro) {
    const dist = distancia(posicao, centro);
    let prioridade = 1 - (dist / this.raio);
    
    // Prioriza alvos no centro
    if (this.prioridadeCentro) {
      const fatorCentro = 1 - (dist / this.raio) * 0.5;
      prioridade *= fatorCentro;
    }
    
    return clamp(prioridade, 0, 1);
  },
  
  registrarAlvo(alvo) {
    this.alvosVisiveis.push({
      ...alvo,
      timestamp: Date.now()
    });
    
    // Remove alvos antigos (>2s)
    this.alvosVisiveis = this.alvosVisiveis.filter(
      a => Date.now() - a.timestamp < 2000
    );
  },
  
  getAlvoMaisProximo(centro) {
    if (this.alvosVisiveis.length === 0) return null;
    
    return this.alvosVisiveis.reduce((closest, current) => {
      const distCurrent = distancia(current, centro);
      const distClosest = distancia(closest, centro);
      return distCurrent < distClosest ? current : closest;
    });
  },
  
  limparAlvos() {
    this.alvosVisiveis = [];
  }
};

window.FOVInteligente = FOVInteligente;
console.log('  → FOV: ' + fovConfigurado);
console.log('  → Raio efetivo: ' + FOVInteligente.raio);
console.log('  → Status: ' + (FOVInteligente.ativo ? 'ATIVO' : 'INATIVO'));
console.log('  → Prioridade centro: ' + (FOVInteligente.prioridadeCentro ? 'ON' : 'OFF'));
`,

  /**
   * ═══════════════════════════════════
   * AUXÍLIO HEAD - HEADSHOT PERFEITO
   * ═══════════════════════════════════
   */
  'AH-2K8M-5X6P': `
console.log('╔══════════════════════════════════════╗');
console.log('║  ✓ HEADSHOT MASTER - ATIVADO        ║');
console.log('╚══════════════════════════════════════╝');

const HeadshotMaster = {
  ativo: true,
  suavizacao: ${CONFIG.SUAVIZACAO_MEDIA},
  offsetCabeca: ${CONFIG.OFFSET_HEADSHOT},
  snap: ${CONFIG.SNAP_SPEED},
  tracking: ${CONFIG.SMOOTH_TRACKING},
  modoSnap: false,
  ultimaPosicao: null,
  
  centralizar(posAtual, posAlvo, distancia) {
    if (!this.ativo) return posAtual;
    
    // Ajusta offset para cabeça
    const alvoHead = {
      x: posAlvo.x,
      y: posAlvo.y + this.offsetCabeca
    };
    
    // Predição de movimento
    if (this.ultimaPosicao) {
      const predicao = prever(alvoHead, this.ultimaPosicao);
      alvoHead.x = predicao.x;
      alvoHead.y = predicao.y;
    }
    
    this.ultimaPosicao = {...alvoHead};
    
    // Snap ou Tracking
    const fator = this.modoSnap ? this.snap : 
                  suavizacaoAdaptativa(distancia, this.tracking);
    
    return centralizar(posAtual, alvoHead, fator, true);
  },
  
  ativarSnap() {
    this.modoSnap = true;
    console.log('  → Modo SNAP ativado');
  },
  
  ativarTracking() {
    this.modoSnap = false;
    console.log('  → Modo TRACKING ativado');
  },
  
  ajustarOffset(novoOffset) {
    this.offsetCabeca = clamp(novoOffset, -0.2, 0);
    console.log('  → Offset ajustado: ' + this.offsetCabeca);
  },
  
  reset() {
    this.ultimaPosicao = null;
  }
};

window.HeadshotMaster = HeadshotMaster;
console.log('  → Suavização: ' + HeadshotMaster.suavizacao);
console.log('  → Offset cabeça: ' + HeadshotMaster.offsetCabeca);
console.log('  → Snap speed: ' + HeadshotMaster.snap);
console.log('  → Tracking: ' + HeadshotMaster.tracking);
console.log('  → Modo: ' + (HeadshotMaster.modoSnap ? 'SNAP' : 'TRACKING'));
`,

  /**
   * ═══════════════════════════════════
   * AUXÍLIO RECOIL - COMBO PERFEITO
   * ═══════════════════════════════════
   */
  'AR-9T4L-1N7W': `
console.log('╔══════════════════════════════════════╗');
console.log('║  ✓ COMBO RECOIL PRO - ATIVADO       ║');
console.log('╚══════════════════════════════════════╝');

const ComboRecoilPro = {
  ativo: true,
  controleRecuo: ${CONFIG.RECUO_BASE},
  suavizacao: ${CONFIG.SUAVIZACAO_FORTE},
  compensacaoInteligente: true,
  historico: [],
  
  processar(posAtual, posAlvo, recuoY, recuoX = 0, distAlvo = 50) {
    if (!this.ativo) return posAtual;
    
    // Centraliza no alvo com suavização adaptativa
    const fator = suavizacaoAdaptativa(distAlvo, this.suavizacao);
    const centralizado = centralizar(posAtual, posAlvo, fator, true);
    
    // Compensação inteligente de recuo
    let compensacaoY = recuoY * this.controleRecuo;
    let compensacaoX = recuoX * this.controleRecuo;
    
    if (this.compensacaoInteligente) {
      // Aprende padrão baseado no histórico
      this.historico.push({y: recuoY, x: recuoX});
      if (this.historico.length > 10) this.historico.shift();
      
      if (this.historico.length > 3) {
        const mediaY = this.historico.reduce((a,b) => a + b.y, 0) / this.historico.length;
        const mediaX = this.historico.reduce((a,b) => a + b.x, 0) / this.historico.length;
        compensacaoY = mediaY * this.controleRecuo * 0.9;
        compensacaoX = mediaX * this.controleRecuo * 0.9;
      }
    }
    
    return {
      x: centralizado.x - compensacaoX,
      y: centralizado.y - compensacaoY
    };
  },
  
  resetHistorico() {
    this.historico = [];
    console.log('  → Histórico de recuo limpo');
  },
  
  ajustarControle(valor) {
    this.controleRecuo = clamp(valor, 0.3, 0.9);
    console.log('  → Controle ajustado: ' + this.controleRecuo);
  }
};

window.ComboRecoilPro = ComboRecoilPro;
console.log('  → Controle: ' + ComboRecoilPro.controleRecuo);
console.log('  → Suavização: ' + ComboRecoilPro.suavizacao);
console.log('  → IA Compensação: ' + (ComboRecoilPro.compensacaoInteligente ? 'ON' : 'OFF'));
`,

  /**
   * ═══════════════════════════════════
   * AUXÍLIO SENSI - SENSIBILIDADE PERFEITA
   * ═══════════════════════════════════
   */
  'AS-5Q3H-8V2M': `
console.log('╔══════════════════════════════════════╗');
console.log('║  ✓ SENSI PERFEITA - ATIVADO         ║');
console.log('╚══════════════════════════════════════╝');

const SensiPerfeita = {
  ativo: true,
  base: ${CONFIG.SENSI_BASE},
  ads: ${CONFIG.SENSI_ADS},
  scope: ${CONFIG.SENSI_SCOPE},
  adaptativo: ${CONFIG.ADAPTATIVO},
  modoAtual: 'base',
  
  aplicar(valor, velocidade = 0) {
    if (!this.ativo) return valor;
    
    // Seleciona multiplicador baseado no modo
    let mult = this.base;
    if (this.modoAtual === 'ads') mult = this.ads;
    if (this.modoAtual === 'scope') mult = this.scope;
    
    let resultado = valor * mult;
    
    // Adaptativo: reduz em movimentos muito rápidos
    if (this.adaptativo) {
      const vel = Math.abs(velocidade);
      if (vel > 0.8) resultado *= 0.88;
      else if (vel > 0.5) resultado *= 0.94;
    }
    
    return resultado;
  },
  
  setModo(modo) {
    if (['base', 'ads', 'scope'].includes(modo)) {
      this.modoAtual = modo;
      console.log('  → Modo alterado: ' + modo.toUpperCase());
    }
  },
  
  ajustar(modo, valor) {
    if (modo === 'base') this.base = clamp(valor, 0.5, 1.2);
    if (modo === 'ads') this.ads = clamp(valor, 0.5, 1.2);
    if (modo === 'scope') this.scope = clamp(valor, 0.5, 1.2);
    console.log('  → ' + modo.toUpperCase() + ' ajustado: ' + valor);
  }
};

window.SensiPerfeita = SensiPerfeita;
console.log('  → Base: ' + SensiPerfeita.base);
console.log('  → ADS: ' + SensiPerfeita.ads);
console.log('  → Scope: ' + SensiPerfeita.scope);
console.log('  → Adaptativo: ' + (SensiPerfeita.adaptativo ? 'ON' : 'OFF'));
console.log('  → Modo atual: ' + SensiPerfeita.modoAtual.toUpperCase());
`
};

// =====================
// SISTEMA CENTRAL
// =====================
console.log(\`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║     █████╗ ██╗   ██╗██╗  ██╗██╗██╗     ██╗ ██████╗   ║
║    ██╔══██╗██║   ██║╚██╗██╔╝██║██║     ██║██╔═══██╗  ║
║    ███████║██║   ██║ ╚███╔╝ ██║██║     ██║██║   ██║  ║
║    ██╔══██║██║   ██║ ██╔██╗ ██║██║     ██║██║   ██║  ║
║    ██║  ██║╚██████╔╝██╔╝ ██╗██║███████╗██║╚██████╔╝  ║
║    ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝╚═╝ ╚═════╝   ║
║                                                        ║
║              RK7S SYSTEM V3.0 ULTRA                   ║
║                  @rk7s_ffx                             ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
\`);

// Exportar tudo globalmente
if (typeof window !== 'undefined') {
  window.CHAVES_CODIGOS = CHAVES_CODIGOS;
  window.CONFIG = CONFIG;
  window.clamp = clamp;
  window.lerp = lerp;
  window.centralizar = centralizar;
  window.distancia = distancia;
  window.calcularAngulo = calcularAngulo;
  window.prever = prever;
  window.humanize = humanize;
  window.easeInOut = easeInOut;
  window.easeOut = easeOut;
  window.suavizacaoAdaptativa = suavizacaoAdaptativa;
  
  console.log('✓ Sistema carregado e pronto!');
  console.log('✓ Todas as funções exportadas para window');
}
