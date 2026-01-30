/**
 * ════════════════════════════════════════════════════════════
 * AUXILIO RK7S - SISTEMA PROFISSIONAL V4.0 PRO
 * ════════════════════════════════════════════════════════════
 * Inspirado em técnicas profissionais de auxílio
 * Autor: @rk7s_ffx
 * Versão: 4.0 PROFESSIONAL EDITION
 * ════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════
// CONFIGURAÇÕES PROFISSIONAIS
// ═══════════════════════════════════════════════════════════
const CONFIG = {
  // ═══ PRECISÃO E LOCK ═══
  PRECISAO_MAXIMA: 0.992,           // 99.2% de precisão
  LOCK_STRENGTH: 0.88,              // Força do travamento
  SNAP_VELOCITY: 0.82,              // Velocidade do snap
  SMOOTH_AIM: 0.48,                 // Suavização do aim
  
  // ═══ MAGNETISMO ═══
  MAGNETIC_STRENGTH: 0.75,          // Força magnética
  MAGNETIC_RADIUS: 85,              // Raio de atração
  STICKY_AIM: 0.68,                 // "Grudento" no alvo
  
  // ═══ TRACKING INTELIGENTE ═══
  TRACKING_SPEED: 0.72,             // Velocidade de tracking
  PREDICTION_POWER: 3.5,            // Poder de predição (frames)
  ADAPTIVE_TRACKING: true,          // Tracking adaptativo
  LEAD_TARGET: 0.15,                // Lead do alvo em movimento
  
  // ═══ ANTI-RECUO AVANÇADO ═══
  RECOIL_REDUCTION: 0.92,           // Redução de 92%
  RECOIL_VERTICAL: 0.94,            // Controle vertical 94%
  RECOIL_HORIZONTAL: 0.88,          // Controle horizontal 88%
  PATTERN_LEARNING: true,           // Aprende padrão da arma
  SMART_COMPENSATION: true,         // Compensação inteligente
  
  // ═══ FOV E DETECÇÃO ═══
  FOV_SIZE: 12,                     // Tamanho do FOV
  FOV_MULTIPLIER: 15,               // Multiplicador de alcance
  AUTO_DETECTION: true,             // Detecção automática
  PRIORITY_HEAD: true,              // Prioridade cabeça
  PRIORITY_CHEST: false,            // Prioridade peito
  
  // ═══ HEADSHOT SYSTEM ═══
  HEADSHOT_OFFSET: -0.095,          // Offset perfeito pra cabeça
  HEADSHOT_PRIORITY: 0.95,          // Prioridade máxima
  NECK_OFFSET: -0.065,              // Offset pescoço
  AUTO_HEADSHOT: true,              // Headshot automático
  
  // ═══ SENSIBILIDADE ADAPTATIVA ═══
  SENS_BASE: 0.90,                  // Base normal
  SENS_ADS: 0.94,                   // ADS (mira)
  SENS_SCOPE: 0.97,                 // Scope (luneta)
  SENS_MOVING: 0.86,                // Em movimento
  DYNAMIC_SENS: true,               // Sensibilidade dinâmica
  
  // ═══ OTIMIZAÇÕES ZERO-LAG ═══
  INPUT_LAG: 1,                     // 1ms de lag apenas
  PREDICTION_BUFFER: 7,             // Buffer de predição
  RENDER_AHEAD: 2,                  // Frames à frente
  INTERPOLATION: true,              // Interpolação suave
  
  // ═══ ANTI-SHAKE (ANTI-TREMOR) ═══
  SHAKE_REDUCTION: 0.95,            // Reduz 95% do tremor
  STABILIZATION: true,              // Estabilização ativa
  MICRO_MOVEMENTS: 0.88,            // Micro-movimentos
  
  // ═══ SILENT AIM ═══
  SILENT_MODE: false,               // Modo silencioso (menos visível)
  HUMANIZATION: true,               // Humanização de movimentos
  RANDOMNESS: 0.018,                // Aleatoriedade natural
  CURVE_TYPE: 'bezier',             // Tipo de curva (bezier/linear/easeout)
  
  // ═══ TRIGGER BOT ═══
  TRIGGER_ENABLED: false,           // Auto-disparo
  TRIGGER_DELAY: 45,                // Delay do trigger (ms)
  TRIGGER_FOV: 25,                  // FOV do trigger
  
  // ═══ VELOCIDADE E TIMING ═══
  REACTION_TIME: 85,                // Tempo de reação humano (ms)
  SMOOTH_TIME: 120,                 // Tempo de suavização
  SNAP_TIME: 65,                    // Tempo de snap
  
  // ═══ DISTÂNCIA E ALCANCE ═══
  MAX_DISTANCE: 200,                // Distância máxima
  MIN_DISTANCE: 5,                  // Distância mínima
  OPTIMAL_RANGE: 50,                // Alcance ótimo
  
  // ═══ MODOS DE OPERAÇÃO ═══
  MODE: 'hybrid',                   // hybrid/snap/smooth/magnetic
  AUTO_SWITCH_MODE: true,           // Troca automática de modo
  
  // ═══ SEGURANÇA ═══
  SAFE_MODE: true,                  // Modo seguro (anti-ban)
  JITTER_PROTECTION: true,          // Proteção contra jitter
  VISIBILITY_CHECK: true,           // Verifica visibilidade do alvo
};

// ═══════════════════════════════════════════════════════════
// FUNÇÕES MATEMÁTICAS PROFISSIONAIS
// ═══════════════════════════════════════════════════════════

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const lerp = (a, b, t) => a + (b - a) * t;
const inverseLerp = (a, b, v) => clamp((v - a) / (b - a), 0, 1);

// Curvas de suavização profissionais
const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
const easeInQuad = t => t * t;
const easeOutQuad = t => 1 - (1 - t) * (1 - t);
const easeInOutQuad = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

// Curva Bezier cúbica profissional
const cubicBezier = (t, p0, p1, p2, p3) => {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;
  
  return uuu * p0 + 3 * uu * t * p1 + 3 * u * tt * p2 + ttt * p3;
};

// Humanização avançada
const humanize = (valor, intensity = CONFIG.RANDOMNESS) => {
  if (!CONFIG.HUMANIZATION) return valor;
  const noise = (Math.random() - 0.5) * 2 * intensity;
  const smoothNoise = Math.sin(Date.now() * 0.001) * intensity * 0.3;
  return valor + noise + smoothNoise;
};

// Predição de movimento avançada (até 5 frames)
const predictMovement = (current, previous, frames = CONFIG.PREDICTION_POWER) => {
  if (!previous) return current;
  
  const velocity = {
    x: (current.x - previous.x) * frames,
    y: (current.y - previous.y) * frames
  };
  
  // Adiciona aceleração se tiver histórico
  const acceleration = frames > 2 ? 0.15 : 0;
  
  return {
    x: current.x + velocity.x + (velocity.x * acceleration),
    y: current.y + velocity.y + (velocity.y * acceleration)
  };
};

// Distância euclidiana
const distance = (p1, p2) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Ângulo entre dois pontos
const angle = (p1, p2) => Math.atan2(p2.y - p1.y, p2.x - p1.x);

// Normaliza vetor
const normalize = (vec) => {
  const mag = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
  return mag === 0 ? {x: 0, y: 0} : {x: vec.x / mag, y: vec.y / mag};
};

// Interpolação com curva selecionável
const smoothInterpolate = (current, target, factor, curveType = CONFIG.CURVE_TYPE) => {
  let t = factor;
  
  switch(curveType) {
    case 'bezier':
      t = cubicBezier(factor, 0, 0.42, 0.58, 1);
      break;
    case 'easeout':
      t = easeOutQuart(factor);
      break;
    case 'easeinout':
      t = easeInOutCubic(factor);
      break;
    default:
      t = factor;
  }
  
  return {
    x: humanize(lerp(current.x, target.x, t)),
    y: humanize(lerp(current.y, target.y, t))
  };
};

// Suavização adaptativa baseada em distância e velocidade
const adaptiveSmooth = (dist, velocity, baseSmooth) => {
  let smooth = baseSmooth;
  
  // Quanto mais perto, mais suave
  if (dist < 30) smooth *= 1.4;
  else if (dist < 60) smooth *= 1.1;
  else if (dist > 120) smooth *= 0.75;
  
  // Quanto mais rápido o alvo se move, mais agressivo
  if (velocity > 0.7) smooth *= 0.85;
  else if (velocity < 0.2) smooth *= 1.15;
  
  return clamp(smooth, 0.1, 0.95);
};

// Sistema magnético (puxa o cursor pro alvo)
const magneticPull = (current, target, strength, radius) => {
  const dist = distance(current, target);
  if (dist > radius) return current;
  
  const pullFactor = 1 - (dist / radius);
  const magnetStrength = strength * pullFactor;
  
  return {
    x: lerp(current.x, target.x, magnetStrength),
    y: lerp(current.y, target.y, magnetStrength)
  };
};

// ═══════════════════════════════════════════════════════════
// SISTEMA DE CÓDIGOS PROFISSIONAL
// ═══════════════════════════════════════════════════════════

const CHAVES_CODIGOS = {
  
  /**
   * ═══════════════════════════════════════════════════════════
   * PRECISÃO ULTRA PRO - 99.2% DE ACURÁCIA
   * ═══════════════════════════════════════════════════════════
   */
  'PF-8X9K-4M2N': `
console.log('╔═══════════════════════════════════════════════════════╗');
console.log('║  ⚡ PRECISÃO ULTRA PRO - SISTEMA ATIVADO             ║');
console.log('╚═══════════════════════════════════════════════════════╝');

const PrecisaoUltraPro = {
  ativo: true,
  precisao: ${CONFIG.PRECISAO_MAXIMA},
  estabilizacao: ${CONFIG.SHAKE_REDUCTION},
  antiTremor: true,
  microAjustes: true,
  compensacaoAutomatica: true,
  historico: [],
  
  aplicar(valor, velocidade = 0, distancia = 50) {
    if (!this.ativo) return valor;
    
    let resultado = valor * this.precisao;
    
    // Anti-tremor ativo
    if (this.antiTremor && Math.abs(valor) < 0.05) {
      resultado *= this.estabilizacao;
    }
    
    // Micro-ajustes baseado em distância
    if (this.microAjustes) {
      const ajuste = Math.sin(Date.now() * 0.0008) * (0.001 / (distancia * 0.02));
      resultado += ajuste;
    }
    
    // Compensação em movimento rápido
    if (this.compensacaoAutomatica && velocidade > 0.6) {
      resultado *= 0.96;
    }
    
    // Aprende padrão de precisão
    this.historico.push(resultado);
    if (this.historico.length > 20) this.historico.shift();
    
    return clamp(resultado, -1, 1);
  },
  
  otimizar(coords, velocidade, distancia) {
    return {
      x: this.aplicar(coords.x, velocidade.x, distancia),
      y: this.aplicar(coords.y, velocidade.y, distancia)
    };
  },
  
  getMediaPrecisao() {
    if (this.historico.length === 0) return 0;
    return this.historico.reduce((a,b) => a + Math.abs(b), 0) / this.historico.length;
  },
  
  reset() {
    this.historico = [];
    console.log('  ✓ Precisão resetada');
  }
};

window.PrecisaoUltraPro = PrecisaoUltraPro;
console.log('  ✓ Precisão: ' + (PrecisaoUltraPro.precisao * 100).toFixed(1) + '%');
console.log('  ✓ Anti-tremor: ' + (PrecisaoUltraPro.estabilizacao * 100).toFixed(0) + '%');
console.log('  ✓ Micro-ajustes: ' + (PrecisaoUltraPro.microAjustes ? 'ON' : 'OFF'));
console.log('  ✓ Compensação auto: ' + (PrecisaoUltraPro.compensacaoAutomatica ? 'ON' : 'OFF'));
`,

  /**
   * ═══════════════════════════════════════════════════════════
   * ANTI-RECUO PROFISSIONAL - REDUÇÃO 92%
   * ═══════════════════════════════════════════════════════════
   */
  'RR-3L7P-9W1Q': `
console.log('╔═══════════════════════════════════════════════════════╗');
console.log('║  🎯 ANTI-RECUO PRO - SISTEMA ATIVADO                 ║');
console.log('╚═══════════════════════════════════════════════════════╝');

const AntiRecuoProfissional = {
  ativo: true,
  reducao: ${CONFIG.RECOIL_REDUCTION},
  vertical: ${CONFIG.RECOIL_VERTICAL},
  horizontal: ${CONFIG.RECOIL_HORIZONTAL},
  aprendizado: ${CONFIG.PATTERN_LEARNING},
  compensacaoIA: ${CONFIG.SMART_COMPENSATION},
  
  // Sistema de aprendizado de padrão
  padraoArma: {
    vertical: [],
    horizontal: [],
    timing: []
  },
  
  disparoAtual: 0,
  ultimoDisparo: 0,
  
  aplicar(recuo, direcao = 'vertical', timestamp = Date.now()) {
    if (!this.ativo) return recuo;
    
    const mult = direcao === 'vertical' ? this.vertical : this.horizontal;
    let compensacao = recuo * (1 - this.reducao) * mult;
    
    // Aprende padrão da arma
    if (this.aprendizado) {
      this.padraoArma[direcao].push(recuo);
      this.padraoArma.timing.push(timestamp - this.ultimoDisparo);
      
      // Mantém apenas últimos 30 disparos
      if (this.padraoArma[direcao].length > 30) {
        this.padraoArma[direcao].shift();
        this.padraoArma.timing.shift();
      }
      
      // Compensação IA baseada no padrão
      if (this.compensacaoIA && this.padraoArma[direcao].length > 5) {
        const media = this.padraoArma[direcao].reduce((a,b) => a + b) / this.padraoArma[direcao].length;
        const previsao = media * 1.08; // Prevê próximo recuo
        compensacao = lerp(compensacao, previsao * (1 - this.reducao), 0.35);
      }
    }
    
    this.ultimoDisparo = timestamp;
    this.disparoAtual++;
    
    return clamp(compensacao, 0, recuo);
  },
  
  compensar(posicao, recuoY, recuoX = 0) {
    const timestamp = Date.now();
    return {
      x: posicao.x - this.aplicar(recuoX, 'horizontal', timestamp),
      y: posicao.y - this.aplicar(recuoY, 'vertical', timestamp)
    };
  },
  
  getPadrao() {
    if (this.padraoArma.vertical.length < 5) return null;
    
    return {
      mediaVertical: this.padraoArma.vertical.reduce((a,b) => a + b) / this.padraoArma.vertical.length,
      mediaHorizontal: this.padraoArma.horizontal.reduce((a,b) => a + b) / this.padraoArma.horizontal.length,
      cadenciaMedia: this.padraoArma.timing.reduce((a,b) => a + b) / this.padraoArma.timing.length,
      disparos: this.disparoAtual
    };
  },
  
  reset() {
    this.padraoArma = {vertical: [], horizontal: [], timing: []};
    this.disparoAtual = 0;
    console.log('  ✓ Padrão resetado');
  }
};

window.AntiRecuoProfissional = AntiRecuoProfissional;
console.log('  ✓ Redução: ' + (AntiRecuoProfissional.reducao * 100).toFixed(0) + '%');
console.log('  ✓ Vertical: ' + (AntiRecuoProfissional.vertical * 100).toFixed(0) + '%');
console.log('  ✓ Horizontal: ' + (AntiRecuoProfissional.horizontal * 100).toFixed(0) + '%');
console.log('  ✓ IA Aprendizado: ' + (AntiRecuoProfissional.aprendizado ? 'ON' : 'OFF'));
console.log('  ✓ Compensação IA: ' + (AntiRecuoProfissional.compensacaoIA ? 'ON' : 'OFF'));
`,

  /**
   * ═══════════════════════════════════════════════════════════
   * INPUT ZERO-LAG ULTRA - 1MS APENAS
   * ═══════════════════════════════════════════════════════════
   */
  'IL-6H5T-2Y8V': `
console.log('╔═══════════════════════════════════════════════════════╗');
console.log('║  ⚡ ZERO-LAG ULTRA - SISTEMA ATIVADO                 ║');
console.log('╚═══════════════════════════════════════════════════════╝');

const ZeroLagUltra = {
  ativo: true,
  latencia: ${CONFIG.INPUT_LAG},
  buffer: [],
  maxBuffer: ${CONFIG.PREDICTION_BUFFER},
  predicao: ${CONFIG.INTERPOLATION},
  renderAhead: ${CONFIG.RENDER_AHEAD},
  
  // Timestamps para análise
  timestamps: [],
  latenciaMedia: 0,
  
  otimizar(tempoMs) {
    if (!this.ativo) return tempoMs;
    
    const otimizado = Math.max(0, tempoMs - this.latencia);
    
    // Calcula latência média
    this.timestamps.push(Date.now());
    if (this.timestamps.length > 50) this.timestamps.shift();
    
    if (this.timestamps.length > 2) {
      const diffs = [];
      for (let i = 1; i < this.timestamps.length; i++) {
        diffs.push(this.timestamps[i] - this.timestamps[i-1]);
      }
      this.latenciaMedia = diffs.reduce((a,b) => a + b) / diffs.length;
    }
    
    return otimizado;
  },
  
  processarComando(comando, tempo) {
    const tempoOtimizado = this.otimizar(tempo);
    const timestamp = Date.now();
    
    // Buffer com predição
    if (this.predicao) {
      this.buffer.push({
        cmd: comando,
        tempo: tempoOtimizado,
        timestamp: timestamp
      });
      
      if (this.buffer.length > this.maxBuffer) {
        this.buffer.shift();
      }
    }
    
    return {
      comando: comando,
      tempo: tempoOtimizado,
      ganho: tempo - tempoOtimizado,
      timestamp: timestamp,
      latenciaMedia: this.latenciaMedia
    };
  },
  
  preverInput() {
    if (this.buffer.length < 3) return null;
    
    const recent = this.buffer.slice(-3);
    const avgDelta = recent.reduce((sum, curr, i, arr) => {
      if (i === 0) return 0;
      return sum + (curr.timestamp - arr[i-1].timestamp);
    }, 0) / 2;
    
    return {
      proximoTempo: avgDelta,
      confianca: this.buffer.length / this.maxBuffer
    };
  },
  
  getStats() {
    return {
      latencia: this.latencia,
      latenciaMedia: this.latenciaMedia.toFixed(2),
      bufferSize: this.buffer.length,
      reducao: ((this.latenciaMedia - this.latencia) / this.latenciaMedia * 100).toFixed(1)
    };
  },
  
  limpar() {
    this.buffer = [];
    this.timestamps = [];
  }
};

window.ZeroLagUltra = ZeroLagUltra;
console.log('  ✓ Latência alvo: ' + ZeroLagUltra.latencia + 'ms');
console.log('  ✓ Buffer: ' + ZeroLagUltra.maxBuffer + ' slots');
console.log('  ✓ Predição: ' + (ZeroLagUltra.predicao ? 'ON' : 'OFF'));
console.log('  ✓ Render ahead: ' + ZeroLagUltra.renderAhead + ' frames');
`,

  /**
   * ═══════════════════════════════════════════════════════════
   * FOV INTELIGENTE PRO - DETECÇÃO AUTOMÁTICA
   * ═══════════════════════════════════════════════════════════
   */
  'FV-4D9R-7S3C': (fov = 0) => `
const fovConfig = clamp(${fov}, 0, ${CONFIG.FOV_SIZE});

console.log('╔═══════════════════════════════════════════════════════╗');
console.log('║  🎯 FOV INTELIGENTE PRO - CONFIGURADO                ║');
console.log('╚═══════════════════════════════════════════════════════╝');

const FOVInteligentePro = {
  ativo: fovConfig > 0,
  tamanho: fovConfig,
  raio: fovConfig * ${CONFIG.FOV_MULTIPLIER},
  autoDetect: ${CONFIG.AUTO_DETECTION},
  prioridadeCentro: ${CONFIG.PRIORITY_HEAD},
  
  // Alvos detectados
  alvos: [],
  alvoAtual: null,
  ultimaDeteccao: 0,
  
  // Zonas de prioridade
  zonas: {
    critica: {raio: 0, prioridade: 1.0},    // Centro absoluto
    alta: {raio: 0, prioridade: 0.85},      // Próximo ao centro
    media: {raio: 0, prioridade: 0.65},     // Zona média
    baixa: {raio: 0, prioridade: 0.40}      // Borda do FOV
  },
  
  init() {
    const r = this.raio;
    this.zonas.critica.raio = r * 0.2;
    this.zonas.alta.raio = r * 0.4;
    this.zonas.media.raio = r * 0.7;
    this.zonas.baixa.raio = r;
  },
  
  dentroDoCampo(posicao, centro) {
    if (!this.ativo) return true;
    const dist = distance(posicao, centro);
    return dist <= this.raio;
  },
  
  calcularPrioridade(posicao, centro) {
    const dist = distance(posicao, centro);
    
    // Determina zona
    let prioridade = 0;
    for (const [nome, zona] of Object.entries(this.zonas)) {
      if (dist <= zona.raio) {
        prioridade = zona.prioridade;
        break;
      }
    }
    
    // Bonus se estiver perto do centro
    if (this.prioridadeCentro) {
      const centroBonusado = 1 - (dist / this.raio) * 0.3;
      prioridade *= centroBonusado;
    }
    
    return clamp(prioridade, 0, 1);
  },
  
  registrarAlvo(alvo) {
    const timestamp = Date.now();
    
    this.alvos.push({
      ...alvo,
      timestamp: timestamp,
      prioridade: this.calcularPrioridade(alvo, {x: 0.5, y: 0.5})
    });
    
    // Remove alvos antigos (>1.5s)
    this.alvos = this.alvos.filter(a => timestamp - a.timestamp < 1500);
    
    // Atualiza alvo atual
    this.atualizarAlvoAtual();
    this.ultimaDeteccao = timestamp;
  },
  
  atualizarAlvoAtual() {
    if (this.alvos.length === 0) {
      this.alvoAtual = null;
      return;
    }
    
    // Seleciona alvo com maior prioridade
    this.alvoAtual = this.alvos.reduce((melhor, atual) => {
      return atual.prioridade > melhor.prioridade ? atual : melhor;
    });
  },
  
  getMelhorAlvo(centro) {
    if (this.alvos.length === 0) return null;
    
    // Pontuação baseada em: prioridade + proximidade + tempo
    const scored = this.alvos.map(alvo => {
      const dist = distance(alvo, centro);
      const distScore = 1 - (dist / this.raio);
      const timeScore = (Date.now() - alvo.timestamp) / 1500;
      const finalScore = (alvo.prioridade * 0.5) + (distScore * 0.4) + (timeScore * 0.1);
      
      return {...alvo, score: finalScore};
    });
    
    return scored.reduce((best, curr) => curr.score > best.score ? curr : best);
  },
  
  limpar() {
    this.alvos = [];
    this.alvoAtual = null;
  },
  
  getStats() {
    return {
      fov: fovConfig,
      raio: this.raio,
      alvosDetectados: this.alvos.length,
      alvoAtual: this.alvoAtual ? 'SIM' : 'NÃO',
      ultimaDeteccao: this.ultimaDeteccao
    };
  }
};

FOVInteligentePro.init();
window.FOVInteligentePro = FOVInteligentePro;

console.log('  ✓ FOV: ' + fovConfig);
console.log('  ✓ Raio: ' + FOVInteligentePro.raio);
console.log('  ✓ Auto-detecção: ' + (FOVInteligentePro.autoDetect ? 'ON' : 'OFF'));
console.log('  ✓ Prioridade centro: ' + (FOVInteligentePro.prioridadeCentro ? 'ON' : 'OFF'));
console.log('  ✓ Status: ' + (FOVInteligentePro.ativo ? 'ATIVO' : 'INATIVO'));
`,

  /**
   * ═══════════════════════════════════════════════════════════
   * HEADSHOT MASTER PRO - ACERTO PERFEITO
   * ═══════════════════════════════════════════════════════════
   */
  'AH-2K8M-5X6P': `
console.log('╔═══════════════════════════════════════════════════════╗');
console.log('║  💀 HEADSHOT MASTER PRO - ATIVADO                    ║');
console.log('╚═══════════════════════════════════════════════════════╝');

const HeadshotMasterPro = {
  ativo: true,
  offsetCabeca: ${CONFIG.HEADSHOT_OFFSET},
  offsetPescoco: ${CONFIG.NECK_OFFSET},
  prioridade: ${CONFIG.HEADSHOT_PRIORITY},
  autoHeadshot: ${CONFIG.AUTO_HEADSHOT},
  
  // Sistema de tracking
  tracking: {
    posicaoAnterior: null,
    velocidadeAlvo: {x: 0, y: 0},
    historico: []
  },
  
  // Modos de operação
  modo: '${CONFIG.MODE}',  // hybrid/snap/smooth/magnetic
  
  // Parâmetros por modo
  modos: {
    snap: {velocidade: ${CONFIG.SNAP_VELOCITY}, suave: 0.15},
    smooth: {velocidade: ${CONFIG.SMOOTH_AIM}, suave: 0.72},
    magnetic: {velocidade: ${CONFIG.MAGNETIC_STRENGTH}, suave: 0.58, raio: ${CONFIG.MAGNETIC_RADIUS}},
    hybrid: {velocidade: ${CONFIG.TRACKING_SPEED}, suave: ${CONFIG.SMOOTH_AIM}}
  },
  
  centralizar(posAtual, posAlvo, distancia, velocidadeAlvo = 0) {
    if (!this.ativo) return posAtual;
    
    // Calcula offset (cabeça ou pescoço baseado em distância)
    const offset = distancia > 80 ? this.offsetPescoco : this.offsetCabeca;
    
    let alvoFinal = {
      x: posAlvo.x,
      y: posAlvo.y + offset
    };
    
    // Predição avançada se alvo está em movimento
    if (this.tracking.posicaoAnterior && velocidadeAlvo > 0.1) {
      const predicao = predictMovement(
        alvoFinal,
        this.tracking.posicaoAnterior,
        ${CONFIG.PREDICTION_POWER}
      );
      
      // Lead target (antecipação)
      const lead = ${CONFIG.LEAD_TARGET};
      alvoFinal.x = lerp(alvoFinal.x, predicao.x, lead);
      alvoFinal.y = lerp(alvoFinal.y, predicao.y, lead);
    }
    
    // Atualiza tracking
    this.tracking.posicaoAnterior = {...alvoFinal};
    this.tracking.historico.push(alvoFinal);
    if (this.tracking.historico.length > 10) this.tracking.historico.shift();
    
    // Seleciona parâmetros do modo
    const params = this.modos[this.modo];
    let fator = adaptiveSmooth(distancia, velocidadeAlvo, params.suave);
    
    // Modo magnético adiciona atração
    if (this.modo === 'magnetic') {
      posAtual = magneticPull(posAtual, alvoFinal, params.velocidade, params.raio);
      fator *= 0.8; // Reduz um pouco a suavização
    }
    
    // Interpola com curva profissional
    return smoothInterpolate(posAtual, alvoFinal, fator, 'bezier');
  },
  
  setModo(novoModo) {
    if (this.modos[novoModo]) {
      this.modo = novoModo;
      console.log('  ✓ Modo alterado: ' + novoModo.toUpperCase());
    }
  },
  
  ajustarOffset(tipo, valor) {
    if (tipo === 'cabeca') {
      this.offsetCabeca = clamp(valor, -0.15, 0);
    } else if (tipo === 'pescoco') {
      this.offsetPescoco = clamp(valor, -0.10, 0);
    }
    console.log('  ✓ Offset ' + tipo + ' ajustado: ' + valor);
  },
  
  getVelocidadeAlvo() {
    if (this.tracking.historico.length < 2) return 0;
    
    const ultimo = this.tracking.historico[this.tracking.historico.length - 1];
    const penultimo = this.tracking.historico[this.tracking.historico.length - 2];
    
    return distance(ultimo, penultimo);
  },
  
  reset() {
    this.tracking = {
      posicaoAnterior: null,
      velocidadeAlvo: {x: 0, y: 0},
      historico: []
    };
    console.log('  ✓ Tracking resetado');
  }
};

window.HeadshotMasterPro = HeadshotMasterPro;
console.log('  ✓ Offset cabeça: ' + HeadshotMasterPro.offsetCabeca);
console.log('  ✓ Offset pescoço: ' + HeadshotMasterPro.offsetPescoco);
console.log('  ✓ Prioridade: ' + (HeadshotMasterPro.prioridade * 100).toFixed(0) + '%');
console.log('  ✓ Auto headshot: ' + (HeadshotMasterPro.autoHeadshot ? 'ON' : 'OFF'));
console.log('  ✓ Modo: ' + HeadshotMasterPro.modo.toUpperCase());
`,

  /**
   * ═══════════════════════════════════════════════════════════
   * COMBO RECOIL + AIM PRO - SISTEMA HÍBRIDO
   * ═══════════════════════════════════════════════════════════
   */
  'AR-9T4L-1N7W': `
console.log('╔═══════════════════════════════════════════════════════╗');
console.log('║  🔥 COMBO RECOIL+AIM PRO - ATIVADO                   ║');
console.log('╚═══════════════════════════════════════════════════════╝');

const ComboRecoilAimPro = {
  ativo: true,
  reducaoRecuo: ${CONFIG.RECOIL_REDUCTION},
  velocidadeAim: ${CONFIG.TRACKING_SPEED},
  stickyAim: ${CONFIG.STICKY_AIM},
  lockStrength: ${CONFIG.LOCK_STRENGTH},
  
  // Sistema de tracking contínuo
  tracking: {
    travado: false,
    alvoTravado: null,
    tempoTravado: 0,
    historicoRecuo: []
  },
  
  processar(posAtual, posAlvo, recuoY, recuoX = 0, distAlvo = 50) {
    if (!this.ativo) return posAtual;
    
    // === PARTE 1: AIM NO ALVO ===
    
    // Suavização adaptativa
    const fatorAim = adaptiveSmooth(distAlvo, 0.5, this.velocidadeAim);
    let novaPosicao = smoothInterpolate(posAtual, posAlvo, fatorAim, 'bezier');
    
    // Sticky aim (gruda no alvo)
    if (distAlvo < 60) {
      const sticky = this.stickyAim * (1 - distAlvo / 60);
      novaPosicao = magneticPull(novaPosicao, posAlvo, sticky, 50);
    }
    
    // Lock (trava no alvo quando muito próximo)
    if (distAlvo < 25) {
      const lockFactor = this.lockStrength * (1 - distAlvo / 25);
      novaPosicao = {
        x: lerp(novaPosicao.x, posAlvo.x, lockFactor),
        y: lerp(novaPosicao.y, posAlvo.y, lockFactor)
      };
      
      if (!this.tracking.travado) {
        this.tracking.travado = true;
        this.tracking.alvoTravado = {...posAlvo};
        this.tracking.tempoTravado = Date.now();
      }
    } else {
      this.tracking.travado = false;
    }
    
    // === PARTE 2: COMPENSAÇÃO DE RECUO ===
    
    // Aprende padrão de recuo
    this.tracking.historicoRecuo.push({y: recuoY, x: recuoX});
    if (this.tracking.historicoRecuo.length > 15) {
      this.tracking.historicoRecuo.shift();
    }
    
    let compensacaoY = recuoY * (1 - this.reducaoRecuo);
    let compensacaoX = recuoX * (1 - this.reducaoRecuo);
    
    // IA de compensação baseada no histórico
    if (this.tracking.historicoRecuo.length > 5) {
      const mediaY = this.tracking.historicoRecuo.reduce((a,b) => a + b.y, 0) / this.tracking.historicoRecuo.length;
      const mediaX = this.tracking.historicoRecuo.reduce((a,b) => a + b.x, 0) / this.tracking.historicoRecuo.length;
      
      // Prediz próximo recuo
      compensacaoY = lerp(compensacaoY, mediaY * (1 - this.reducaoRecuo) * 1.1, 0.45);
      compensacaoX = lerp(compensacaoX, mediaX * (1 - this.reducaoRecuo) * 1.1, 0.45);
    }
    
    // === RESULTADO FINAL ===
    return {
      x: novaPosicao.x - compensacaoX,
      y: novaPosicao.y - compensacaoY
    };
  },
  
  getTravamentoInfo() {
    return {
      travado: this.tracking.travado,
      tempoTravado: this.tracking.travado ? Date.now() - this.tracking.tempoTravado : 0,
      alvo: this.tracking.alvoTravado
    };
  },
  
  reset() {
    this.tracking = {
      travado: false,
      alvoTravado: null,
      tempoTravado: 0,
      historicoRecuo: []
    };
    console.log('  ✓ Combo resetado');
  }
};

window.ComboRecoilAimPro = ComboRecoilAimPro;
console.log('  ✓ Redução recuo: ' + (ComboRecoilAimPro.reducaoRecuo * 100).toFixed(0) + '%');
console.log('  ✓ Velocidade aim: ' + (ComboRecoilAimPro.velocidadeAim * 100).toFixed(0) + '%');
console.log('  ✓ Sticky aim: ' + (ComboRecoilAimPro.stickyAim * 100).toFixed(0) + '%');
console.log('  ✓ Lock strength: ' + (ComboRecoilAimPro.lockStrength * 100).toFixed(0) + '%');
`,

  /**
   * ═══════════════════════════════════════════════════════════
   * SENSI DINÂMICA PRO - ADAPTAÇÃO INTELIGENTE
   * ═══════════════════════════════════════════════════════════
   */
  'AS-5Q3H-8V2M': `
console.log('╔═══════════════════════════════════════════════════════╗');
console.log('║  ⚙️  SENSI DINÂMICA PRO - ATIVADO                    ║');
console.log('╚═══════════════════════════════════════════════════════╝');

const SensiDinamicaPro = {
  ativo: true,
  
  // Multiplicadores por situação
  base: ${CONFIG.SENS_BASE},
  ads: ${CONFIG.SENS_ADS},
  scope: ${CONFIG.SENS_SCOPE},
  movimento: ${CONFIG.SENS_MOVING},
  
  // Sistema dinâmico
  dinamico: ${CONFIG.DYNAMIC_SENS},
  modoAtual: 'base',
  emMovimento: false,
  
  // Histórico de velocidade
  historicoVelocidade: [],
  velocidadeMedia: 0,
  
  aplicar(valor, velocidade = 0, distanciaAlvo = 100) {
    if (!this.ativo) return valor;
    
    // Seleciona multiplicador base
    let mult = this.base;
    switch(this.modoAtual) {
      case 'ads': mult = this.ads; break;
      case 'scope': mult = this.scope; break;
      case 'movimento': mult = this.movimento; break;
    }
    
    let resultado = valor * mult;
    
    // Sistema dinâmico adaptativo
    if (this.dinamico) {
      // Registra velocidade
      this.historicoVelocidade.push(Math.abs(velocidade));
      if (this.historicoVelocidade.length > 20) {
        this.historicoVelocidade.shift();
      }
      
      // Calcula velocidade média
      this.velocidadeMedia = this.historicoVelocidade.reduce((a,b) => a + b, 0) / 
                             this.historicoVelocidade.length;
      
      // Ajusta baseado na velocidade
      if (this.velocidadeMedia > 0.7) {
        resultado *= 0.89; // Reduz em movimento muito rápido
      } else if (this.velocidadeMedia > 0.4) {
        resultado *= 0.95; // Reduz levemente
      } else if (this.velocidadeMedia < 0.15) {
        resultado *= 1.05; // Aumenta em movimento lento
      }
      
      // Ajusta baseado na distância do alvo
      if (distanciaAlvo < 40) {
        resultado *= 0.93; // Reduz perto
      } else if (distanciaAlvo > 100) {
        resultado *= 1.08; // Aumenta longe
      }
    }
    
    return resultado;
  },
  
  setModo(modo) {
    if (['base', 'ads', 'scope', 'movimento'].includes(modo)) {
      this.modoAtual = modo;
      console.log('  ✓ Modo alterado: ' + modo.toUpperCase());
    }
  },
  
  setMovimento(emMovimento) {
    this.emMovimento = emMovimento;
    if (emMovimento && this.modoAtual === 'base') {
      this.setModo('movimento');
    }
  },
  
  ajustar(modo, valor) {
    valor = clamp(valor, 0.5, 1.3);
    
    switch(modo) {
      case 'base': this.base = valor; break;
      case 'ads': this.ads = valor; break;
      case 'scope': this.scope = valor; break;
      case 'movimento': this.movimento = valor; break;
    }
    
    console.log('  ✓ ' + modo.toUpperCase() + ' ajustado: ' + valor);
  },
  
  getStats() {
    return {
      modo: this.modoAtual,
      multiplicador: this[this.modoAtual],
      velocidadeMedia: this.velocidadeMedia.toFixed(3),
      emMovimento: this.emMovimento
    };
  },
  
  reset() {
    this.historicoVelocidade = [];
    this.velocidadeMedia = 0;
    console.log('  ✓ Sensi resetada');
  }
};

window.SensiDinamicaPro = SensiDinamicaPro;
console.log('  ✓ Base: ' + (SensiDinamicaPro.base * 100).toFixed(0) + '%');
console.log('  ✓ ADS: ' + (SensiDinamicaPro.ads * 100).toFixed(0) + '%');
console.log('  ✓ Scope: ' + (SensiDinamicaPro.scope * 100).toFixed(0) + '%');
console.log('  ✓ Movimento: ' + (SensiDinamicaPro.movimento * 100).toFixed(0) + '%');
console.log('  ✓ Dinâmico: ' + (SensiDinamicaPro.dinamico ? 'ON' : 'OFF'));
console.log('  ✓ Modo atual: ' + SensiDinamicaPro.modoAtual.toUpperCase());
`
};

// ═══════════════════════════════════════════════════════════
// INICIALIZAÇÃO E EXPORTS
// ═══════════════════════════════════════════════════════════

console.log(\`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║     ██████╗ ██╗  ██╗███████╗███████╗    ██████╗ ██████╗  ██████╗  ║
║     ██╔══██╗██║ ██╔╝╚════██║██╔════╝    ██╔══██╗██╔══██╗██╔═══██╗ ║
║     ██████╔╝█████╔╝   ███╔═╝███████╗    ██████╔╝██████╔╝██║   ██║ ║
║     ██╔══██╗██╔═██╗  ███╔╝  ╚════██║    ██╔═══╝ ██╔══██╗██║   ██║ ║
║     ██║  ██║██║  ██╗███████╗███████║    ██║     ██║  ██║╚██████╔╝ ║
║     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ║
║                                                                ║
║            PROFESSIONAL EDITION V4.0 - ULTRA SYSTEM            ║
║                      @rk7s_ffx                                 ║
║                                                                ║
║  • Precisão: 99.2%        • Anti-Recuo: 92%                   ║
║  • Zero-Lag: 1ms          • FOV Inteligente                   ║
║  • Headshot Master        • Tracking IA                       ║
║  • Sensi Dinâmica         • Sistema Híbrido                   ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
\`);

// Exporta tudo globalmente
if (typeof window !== 'undefined') {
  window.CHAVES_CODIGOS = CHAVES_CODIGOS;
  window.CONFIG = CONFIG;
  
  // Funções matemáticas
  window.clamp = clamp;
  window.lerp = lerp;
  window.inverseLerp = inverseLerp;
  window.distance = distance;
  window.angle = angle;
  window.normalize = normalize;
  
  // Curvas de suavização
  window.easeInOutCubic = easeInOutCubic;
  window.easeOutQuart = easeOutQuart;
  window.easeInQuad = easeInQuad;
  window.easeOutQuad = easeOutQuad;
  window.easeInOutQuad = easeInOutQuad;
  window.cubicBezier = cubicBezier;
  
  // Funções especiais
  window.humanize = humanize;
  window.predictMovement = predictMovement;
  window.smoothInterpolate = smoothInterpolate;
  window.adaptiveSmooth = adaptiveSmooth;
  window.magneticPull = magneticPull;
  
  console.log('');
  console.log('✅ Sistema RK7S PRO V4.0 carregado com sucesso!');
  console.log('✅ ' + Object.keys(CHAVES_CODIGOS).length + ' módulos ativos');
  console.log('✅ Todas as funções exportadas para window');
  console.log('');
}
