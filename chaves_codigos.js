/**
 * ==========================================
 * AUXILIO RK7S - SISTEMA DE CÓDIGOS
 * ==========================================
 * Arquivo: chaves_codigos.js
 * Versão: 2.0
 * Autor: @rk7s_ffx
 * ==========================================
 */

// =====================
// CONFIGURAÇÕES GLOBAIS
// =====================
const CONFIG = {
  // Centralização
  CENTRO_FIXO: true,
  LIMITE_VERTICAL: 0.15,        // Impede ultrapassar o ponto central
  
  // Níveis de Suavização
  SUAVIZACAO_LEVE: 0.18,        // Movimento suave e natural
  SUAVIZACAO_MEDIA: 0.32,       // Equilíbrio entre velocidade e suavidade
  SUAVIZACAO_FORTE: 0.48,       // Movimento rápido e direto
  
  // Sensibilidade
  SENSI_BASE: 0.85,             // Multiplicador de sensibilidade
  RECUO_BASE: 0.65,             // Controle de recuo base
  
  // Campo de Visão
  FOV_MAX: 10,                  // FOV máximo permitido
  
  // Tempos (ms)
  DELAY_INPUT: 5,               // Redução de delay de input
  TEMPO_TRANSICAO: 150          // Tempo de transição suave
};

// =====================
// FUNÇÕES UTILITÁRIAS
// =====================

/**
 * Limita um valor entre min e max
 */
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/**
 * Interpolação linear entre dois valores
 */
const lerp = (a, b, t) => a + (b - a) * t;

/**
 * Centraliza posição com limite vertical
 */
const centralizar = (atual, alvo, fator) => {
  const yCentral = clamp(
    alvo.y,
    alvo.y - CONFIG.LIMITE_VERTICAL,
    alvo.y + CONFIG.LIMITE_VERTICAL
  );
  return {
    x: lerp(atual.x, alvo.x, fator),
    y: lerp(atual.y, yCentral, fator)
  };
};

/**
 * Aplica suavização com curva personalizada
 */
const suavizar = (valor, intensidade) => {
  const curva = Math.pow(intensidade, 1.5);
  return valor * curva;
};

/**
 * Calcula distância entre dois pontos
 */
const distancia = (p1, p2) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// =====================
// SISTEMA DE CÓDIGOS
// =====================

const CHAVES_CODIGOS = {
  /**
   * PRECISÃO FULL
   * Maximiza precisão dos disparos
   */
  'PF-8X9K-4M2N': `
console.log('✓ [PRECISÃO FULL] Sistema Ativado');

// Sistema de Precisão Avançada
const SistemaPrecisao = {
  ativo: true,
  multiplicador: 0.95,
  
  aplicar(valor) {
    if (!this.ativo) return valor;
    const ajustado = valor * this.multiplicador;
    return clamp(ajustado, 0, 1);
  },
  
  otimizar(x, y) {
    return {
      x: this.aplicar(x),
      y: this.aplicar(y)
    };
  }
};

window.SistemaPrecisao = SistemaPrecisao;
console.log('  → Multiplicador:', SistemaPrecisao.multiplicador);
`,

  /**
   * REDUZIR RECUO
   * Controla e minimiza o recuo das armas
   */
  'RR-3L7P-9W1Q': `
console.log('✓ [CONTROLE DE RECUO] Sistema Ativado');

// Sistema de Controle de Recuo
const ControleRecuo = {
  ativo: true,
  intensidade: ${CONFIG.RECUO_BASE},
  compensacao: true,
  
  aplicar(valorRecuo) {
    if (!this.ativo) return valorRecuo;
    
    let resultado = valorRecuo * this.intensidade;
    
    // Compensação automática
    if (this.compensacao) {
      resultado *= 0.85;
    }
    
    return clamp(resultado, 0, valorRecuo);
  },
  
  desativar() {
    this.ativo = false;
    console.log('  → Controle de recuo desativado');
  }
};

window.ControleRecuo = ControleRecuo;
console.log('  → Intensidade:', ControleRecuo.intensidade);
console.log('  → Compensação:', ControleRecuo.compensacao ? 'Ativa' : 'Inativa');
`,

  /**
   * REDUZIR INPUT LAG
   * Otimiza resposta dos comandos
   */
  'IL-6H5T-2Y8V': `
console.log('✓ [OTIMIZAÇÃO DE RESPOSTA] Sistema Ativado');

// Sistema de Otimização de Input
const OtimizacaoInput = {
  ativo: true,
  reducaoDelay: ${CONFIG.DELAY_INPUT},
  
  otimizar(tempoMs) {
    if (!this.ativo) return tempoMs;
    const otimizado = tempoMs - this.reducaoDelay;
    return clamp(otimizado, 0, tempoMs);
  },
  
  processarComando(comando, tempo) {
    const tempoOtimizado = this.otimizar(tempo);
    return {
      comando: comando,
      tempo: tempoOtimizado,
      ganho: tempo - tempoOtimizado
    };
  }
};

window.OtimizacaoInput = OtimizacaoInput;
console.log('  → Redução de delay:', OtimizacaoInput.reducaoDelay + 'ms');
`,

  /**
   * FOV (CAMPO DE VISÃO)
   * Ajusta o campo de visão do auxílio
   */
  'FV-4D9R-7S3C': (fov = 0) => `
const fovConfigurado = clamp(${fov}, 0, ${CONFIG.FOV_MAX});

console.log('✓ [FOV] Sistema Configurado');

// Sistema de Campo de Visão
const SistemaFOV = {
  ativo: fovConfigurado > 0,
  valor: fovConfigurado,
  raio: fovConfigurado * 10,
  
  dentroDoCampo(posicao, centro) {
    if (!this.ativo) return true;
    const dist = distancia(posicao, centro);
    return dist <= this.raio;
  },
  
  calcularPrioridade(posicao, centro) {
    const dist = distancia(posicao, centro);
    const prioridade = 1 - (dist / this.raio);
    return clamp(prioridade, 0, 1);
  }
};

window.SistemaFOV = SistemaFOV;
console.log('  → FOV:', fovConfigurado);
console.log('  → Raio efetivo:', SistemaFOV.raio);
console.log('  → Status:', SistemaFOV.ativo ? 'Ativo' : 'Inativo');
`,

  /**
   * AUXÍLIO HEAD
   * Centralização prioritária em headshot
   */
  'AH-2K8M-5X6P': `
console.log('✓ [AUXÍLIO HEAD] Sistema Ativado');

// Sistema de Centralização Head
const AuxilioHead = {
  ativo: true,
  suavizacao: ${CONFIG.SUAVIZACAO_MEDIA},
  prioridadeCabeca: true,
  
  centralizar(posicaoAtual, posicaoAlvo) {
    if (!this.ativo) return posicaoAtual;
    
    // Prioriza área da cabeça
    const alvoAjustado = this.prioridadeCabeca ? {
      x: posicaoAlvo.x,
      y: posicaoAlvo.y - 0.1 // Offset para cabeça
    } : posicaoAlvo;
    
    return centralizar(posicaoAtual, alvoAjustado, this.suavizacao);
  },
  
  ajustarSuavizacao(nivel) {
    this.suavizacao = clamp(nivel, 0.1, 0.9);
    console.log('  → Suavização ajustada para:', this.suavizacao);
  }
};

window.AuxilioHead = AuxilioHead;
console.log('  → Suavização:', AuxilioHead.suavizacao);
console.log('  → Prioridade cabeça:', AuxilioHead.prioridadeCabeca ? 'Sim' : 'Não');
`,

  /**
   * AUXÍLIO RECOIL
   * Sistema combinado de auxílio com controle de recuo
   */
  'AR-9T4L-1N7W': `
console.log('✓ [AUXÍLIO RECOIL] Sistema Ativado');

// Sistema Combinado Auxílio + Recuo
const AuxilioRecoil = {
  ativo: true,
  controleRecuo: ${CONFIG.RECUO_BASE},
  suavizacao: ${CONFIG.SUAVIZACAO_MEDIA},
  
  processar(posicaoAtual, posicaoAlvo, valorRecuo) {
    if (!this.ativo) return posicaoAtual;
    
    // Centraliza no alvo
    const centralizado = centralizar(
      posicaoAtual,
      posicaoAlvo,
      this.suavizacao
    );
    
    // Compensa recuo
    const recuoCompensado = valorRecuo * this.controleRecuo;
    
    return {
      x: centralizado.x,
      y: centralizado.y - (recuoCompensado * 0.5)
    };
  }
};

window.AuxilioRecoil = AuxilioRecoil;
console.log('  → Controle de recuo:', AuxilioRecoil.controleRecuo);
console.log('  → Suavização:', AuxilioRecoil.suavizacao);
`,

  /**
   * AUXÍLIO SENSI
   * Ajuste fino de sensibilidade
   */
  'AS-5Q3H-8V2M': `
console.log('✓ [AUXÍLIO SENSI] Sistema Ativado');

// Sistema de Ajuste de Sensibilidade
const AuxilioSensi = {
  ativo: true,
  multiplicador: ${CONFIG.SENSI_BASE},
  adaptativo: true,
  
  aplicar(valor) {
    if (!this.ativo) return valor;
    
    let ajustado = valor * this.multiplicador;
    
    // Ajuste adaptativo baseado na velocidade
    if (this.adaptativo) {
      const velocidade = Math.abs(valor);
      if (velocidade > 0.7) {
        ajustado *= 0.9; // Reduz em movimentos rápidos
      }
    }
    
    return ajustado;
  },
  
  ajustarMultiplicador(novoValor) {
    this.multiplicador = clamp(novoValor, 0.5, 1.5);
    console.log('  → Multiplicador ajustado para:', this.multiplicador);
  }
};

window.AuxilioSensi = AuxilioSensi;
console.log('  → Multiplicador:', AuxilioSensi.multiplicador);
console.log('  → Modo adaptativo:', AuxilioSensi.adaptativo ? 'Ativo' : 'Inativo');
`,

  /**
   * AIMBOT AO ATIRAR
   * Modo focado e direto ao disparar
   */
  'AA-7P1K-4R9X': `
console.log('✓ [AIMBOT - AO ATIRAR] Sistema Ativado');

// Sistema Aimbot - Modo Disparo
const AimbotAtirar = {
  ativo: true,
  suavizacao: ${CONFIG.SUAVIZACAO_FORTE},
  ativoApenasAoAtirar: true,
  estaAtirando: false,
  
  processar(posicaoAtual, posicaoAlvo) {
    // Só ativa se estiver atirando
    if (this.ativoApenasAoAtirar && !this.estaAtirando) {
      return posicaoAtual;
    }
    
    if (!this.ativo) return posicaoAtual;
    
    return centralizar(
      posicaoAtual,
      posicaoAlvo,
      this.suavizacao
    );
  },
  
  iniciarDisparo() {
    this.estaAtirando = true;
  },
  
  pararDisparo() {
    this.estaAtirando = false;
  }
};

window.AimbotAtirar = AimbotAtirar;
console.log('  → Suavização:', AimbotAtirar.suavizacao);
console.log('  → Modo:', 'Ativo apenas ao atirar');
`,

  /**
   * AIMBOT AO OLHAR
   * Modo suave e contínuo
   */
  'AO-3M6T-2L8Q': `
console.log('✓ [AIMBOT - AO OLHAR] Sistema Ativado');

// Sistema Aimbot - Modo Contínuo
const AimbotOlhar = {
  ativo: true,
  suavizacao: ${CONFIG.SUAVIZACAO_LEVE},
  continuo: true,
  
  processar(posicaoAtual, posicaoAlvo) {
    if (!this.ativo) return posicaoAtual;
    
    // Modo contínuo - sempre ativo
    return centralizar(
      posicaoAtual,
      posicaoAlvo,
      this.suavizacao
    );
  },
  
  ajustarSuavizacao(nivel) {
    // Leve (0.1-0.3), Média (0.3-0.5), Forte (0.5-0.9)
    this.suavizacao = clamp(nivel, 0.1, 0.9);
    console.log('  → Suavização ajustada para:', this.suavizacao);
  }
};

window.AimbotOlhar = AimbotOlhar;
console.log('  → Suavização:', AimbotOlhar.suavizacao);
console.log('  → Modo:', 'Contínuo (sempre ativo)');
`
};

// =====================
// INFORMAÇÕES DO SISTEMA
// =====================
console.log(`
╔════════════════════════════════════════╗
║     AUXILIO RK7S - SISTEMA V2.0       ║
║          @rk7s_ffx                     ║
╚════════════════════════════════════════╝
`);

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.CHAVES_CODIGOS = CHAVES_CODIGOS;
  window.CONFIG = CONFIG;
  window.clamp = clamp;
  window.lerp = lerp;
  window.centralizar = centralizar;
  window.suavizar = suavizar;
  window.distancia = distancia;
}
