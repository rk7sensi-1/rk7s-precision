// ==========================================
// CHAVES E CÓDIGOS - AUXÍLIO RK7S
// ==========================================
// Arquivo: chaves_codigos.js
// Este arquivo contém as chaves e códigos de injeção
// ==========================================

const CHAVES_CODIGOS = {
  // Chave Precisão Full
  'PF-8X9K-4M2N': `
// CÓDIGO PRECISÃO FULL
window.precisaoFull = {
  ativo: true,
  estabilizacao: 100,
  iniciar: function() {
    console.log('[✓] Precisão Full ATIVADA');
    window.aimShake = 0;
    window.aimSway = 0;
    window.weaponMovement = 0;
    window.stabilization = {horizontal: 1.0, vertical: 1.0, movement: 0};
    console.log('[INFO] Mira 100% estável - Sem tremor');
  }
};
window.precisaoFull.iniciar();`,

  // Chave Reduzir Recuo
  'RR-3L7P-9W1Q': `
// CÓDIGO REDUZIR RECUO
window.reduzirRecuo = {
  ativo: true,
  reducao: 100,
  iniciar: function() {
    console.log('[✓] Reduzir Recuo ATIVADO');
    window.recoilMultiplier = 0;
    window.verticalRecoil = 0;
    window.horizontalRecoil = 0;
    window.recoilPattern = null;
    window.weaponStability = {vertical: 1.0, horizontal: 1.0, recovery: 0};
    console.log('[INFO] Recuo 100% reduzido - Arma estável');
  }
};
window.reduzirRecuo.iniciar();`,

  // Chave Reduzir Input Leg
  'IL-6H5T-2Y8V': `
// CÓDIGO REDUZIR INPUT LEG
window.reduzirInputLeg = {
  ativo: true,
  delay: 0,
  iniciar: function() {
    console.log('[✓] Reduzir Input Leg ATIVADO');
    window.inputDelay = 0;
    window.inputLag = 0;
    window.mouseSensitivityDelay = 0;
    window.inputResponse = {delay: 0, acceleration: 1.0, instant: true};
    console.log('[INFO] Input lag ZERO - Resposta instantânea');
  }
};
window.reduzirInputLeg.iniciar();`,

  // Chave Fov (função que recebe valor)
  'FV-4D9R-7S3C': function(valor) {
    return `
// CÓDIGO FOV - Valor: ${valor}
window.fovCustom = {
  ativo: true,
  valor: ${valor},
  iniciar: function() {
    console.log('[✓] FOV ATIVADO - Valor: ${valor}');
    window.fovSystem = {
      radius: ${valor} * 10,
      magneticZone: ${valor} * 8,
      detectionRadius: ${valor} * 12,
      magneticStrength: (10 - ${valor}) / 10,
      applyMagnetic: function() {
        window.aimAssistZone = {
          enabled: true,
          radius: this.radius,
          strength: this.magneticStrength,
          checkTarget: function(target) {
            const distance = this.calculateDistance(target);
            if (distance <= this.radius) {
              console.log('[FOV] Alvo na zona - GRUDANDO');
              window.magneticLock = true;
              return true;
            }
            return false;
          },
          calculateDistance: function(target) {
            const aim = window.currentAimPosition || {x:0, y:0};
            const pos = target.position || {x:0, y:0};
            return Math.sqrt(Math.pow(pos.x - aim.x, 2) + Math.pow(pos.y - aim.y, 2));
          }
        };
      }
    };
    window.fovSystem.applyMagnetic();
    console.log('[INFO] Zona magnética: ${valor * 10}px');
    console.log('[INFO] Força: ' + ((10 - ${valor}) * 10) + '%');
  }
};
window.fovCustom.iniciar();`;
  },

  // Chave Auxilio Head
  'AH-2K8M-5X6P': `
// CÓDIGO AUXILIO HEAD
window.auxilioHead = {
  ativo: true,
  priority: 'head',
  iniciar: function() {
    console.log('[✓] Auxilio Head ATIVADO');
    window.headTracking = {
      enabled: true,
      lockOnHead: true,
      maxDeviation: 2,
      trackHead: function(target) {
        if (!target || !target.headHitbox) return;
        const headBox = target.headHitbox;
        window.targetLock = {
          x: headBox.center.x,
          y: headBox.center.y,
          active: true,
          locked: true,
          priority: 'head'
        };
        window.aimBoundary = {
          enabled: true,
          maxOffset: this.maxDeviation,
          correctAim: function(currentPos) {
            const target = window.targetLock;
            if (!target.active) return currentPos;
            const deviation = {
              x: Math.abs(currentPos.x - target.x),
              y: Math.abs(currentPos.y - target.y)
            };
            if (deviation.x > this.maxOffset || deviation.y > this.maxOffset) {
              console.log('[HEAD] Corrigindo - Voltando para cabeça');
              return {x: target.x, y: target.y};
            }
            return currentPos;
          }
        };
        console.log('[HEAD] Cabeça travada');
      }
    };
    console.log('[INFO] Prioridade: CABEÇA');
    console.log('[INFO] Desvio máx: 2px');
  }
};
window.auxilioHead.iniciar();`,

  // Chave Auxilio Recoil
  'AR-9T4L-1N7W': `
// CÓDIGO AUXILIO RECOIL
window.auxilioRecoil = {
  ativo: true,
  controle: 95,
  iniciar: function() {
    console.log('[✓] Auxilio Recoil ATIVADO');
    window.recoilCompensation = {
      enabled: true,
      vertical: 0.95,
      horizontal: 0.95,
      autoCompensate: function() {
        if (window.isShooting) {
          const recoil = window.currentRecoil || {x:0, y:0};
          window.aimAdjustment = {
            x: -recoil.x * this.horizontal,
            y: -recoil.y * this.vertical
          };
        }
      }
    };
    window.recoilMultiplier = 0.05;
    console.log('[INFO] Compensação: 95%');
    console.log('[INFO] Controle automático de recuo');
  }
};
window.auxilioRecoil.iniciar();`,

  // Chave Auxilio Sensi
  'AS-5Q3H-8V2M': `
// CÓDIGO AUXILIO SENSI
window.auxilioSensi = {
  ativo: true,
  adaptativo: true,
  iniciar: function() {
    console.log('[✓] Auxilio Sensi ATIVADO');
    window.adaptiveSensitivity = {
      enabled: true,
      baseMultiplier: 1.0,
      targetMultiplier: 0.4,
      adjustSensitivity: function(hasTarget) {
        if (hasTarget) {
          window.mouseSensitivity *= this.targetMultiplier;
          console.log('[SENSI] Modo precisão - Sensi reduzida');
        } else {
          window.mouseSensitivity = this.baseMultiplier;
        }
      },
      smoothTransition: function(current, target, speed = 0.1) {
        return current + (target - current) * speed;
      }
    };
    console.log('[INFO] Sensibilidade adaptativa ativa');
    console.log('[INFO] Perto do alvo: -60% sensi');
  }
};
window.auxilioSensi.iniciar();`,

  // Chave Ao Atirar
  'AA-7P1K-4R9X': `
// CÓDIGO AIMBOT AO ATIRAR
window.aimbotAoAtirar = {
  ativo: true,
  modo: 'shoot',
  iniciar: function() {
    console.log('[✓] Aimbot AO ATIRAR ativado');
    window.shootActivatedAim = {
      enabled: true,
      onShootStart: function() {
        console.log('[AIMBOT] Ativado - Atirando');
        window.aimAssistActive = true;
        window.magneticAim = true;
        const target = window.findNearestEnemy();
        if (target) {
          window.lockTarget(target);
          console.log('[LOCK] Alvo travado');
        }
      },
      onShootEnd: function() {
        console.log('[AIMBOT] Desativado');
        window.aimAssistActive = false;
        window.magneticAim = false;
      }
    };
    window.addEventListener('mousedown', function(e) {
      if (e.button === 0) {
        window.shootActivatedAim.onShootStart();
      }
    });
    window.addEventListener('mouseup', function(e) {
      if (e.button === 0) {
        window.shootActivatedAim.onShootEnd();
      }
    });
    console.log('[INFO] Modo: Ativa ao apertar gatilho');
  }
};
window.aimbotAoAtirar.iniciar();`,

  // Chave Ao Olhar
  'AO-3M6T-2L8Q': `
// CÓDIGO AIMBOT AO OLHAR
window.aimbotAoOlhar = {
  ativo: true,
  modo: 'look',
  iniciar: function() {
    console.log('[✓] Aimbot AO OLHAR ativado');
    window.lookActivatedAim = {
      enabled: true,
      detectionRadius: 200,
      checkInterval: 16,
      startTracking: function() {
        setInterval(() => {
          if (!this.enabled) return;
          const enemies = window.getAllEnemies();
          const nearestInView = this.findNearestInView(enemies);
          if (nearestInView) {
            console.log('[AIMBOT] Inimigo detectado - Ativando');
            window.aimAssistActive = true;
            window.magneticAim = true;
            window.lockTarget(nearestInView);
          } else {
            window.aimAssistActive = false;
            window.magneticAim = false;
          }
        }, this.checkInterval);
      },
      findNearestInView: function(enemies) {
        const aim = window.currentAimPosition || {x:0, y:0};
        let nearest = null;
        let minDistance = this.detectionRadius;
        enemies.forEach(enemy => {
          if (!enemy.visible) return;
          const pos = enemy.position;
          const distance = Math.sqrt(
            Math.pow(pos.x - aim.x, 2) + 
            Math.pow(pos.y - aim.y, 2)
          );
          if (distance < minDistance) {
            minDistance = distance;
            nearest = enemy;
          }
        });
        return nearest;
      }
    };
    window.lookActivatedAim.startTracking();
    console.log('[INFO] Modo: Ativa ao olhar para inimigo');
    console.log('[INFO] Raio de detecção: 200px');
  }
};
window.aimbotAoOlhar.iniciar();`
};

// Exporta para uso global
window.CHAVES_CODIGOS = CHAVES_CODIGOS;
