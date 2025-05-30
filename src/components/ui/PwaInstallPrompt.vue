<template>
  <div v-if="showPrompt" class="pwa-install-prompt">
    <div class="pwa-install-content">
      <div class="pwa-install-header">
        <h3>Instalar TechRios</h3>
        <button @click="closePrompt" class="close-btn">&times;</button>
      </div>
      <div class="pwa-install-body">
        <p>Instale o app TechRios para uma melhor experiência:</p>
        <ul>
          <li>Acesso rápido</li>
          <li>Funciona offline</li>
          <li>Notificações</li>
        </ul>
      </div>
      <div class="pwa-install-footer">
        <button @click="installPwa" class="install-btn">
          Instalar Agora
        </button>
        <button @click="closePrompt" class="later-btn">
          Depois
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showPrompt = ref(false)

onMounted(() => {
  // Verifica se já está instalado
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return
  }

  // Verifica se é mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  if (isMobile) {
    // Se for mobile, mostra o prompt após 2 segundos
    setTimeout(() => {
      showPrompt.value = true
    }, 2000)
  }
})

function closePrompt() {
  showPrompt.value = false
  localStorage.setItem('pwaPromptDismissed', 'true')
}

function installPwa() {
  // Detecta o navegador
  const isChrome = /Chrome/.test(navigator.userAgent)
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  const isFirefox = /Firefox/.test(navigator.userAgent)
  const isSamsung = /SamsungBrowser/.test(navigator.userAgent)
  
  let message = ''
  
  if (isSafari) {
    message = 'Para instalar o app:\n1. Toque no ícone de compartilhar (quadrado com seta para cima)\n2. Role para baixo\n3. Toque em "Adicionar à Tela de Início"'
  } else if (isChrome) {
    message = 'Para instalar o app:\n1. Toque nos 3 pontos do menu (⋮)\n2. Selecione "Adicionar à tela inicial"'
  } else if (isFirefox) {
    message = 'Para instalar o app:\n1. Toque nos 3 pontos do menu\n2. Selecione "Instalar app"'
  } else if (isSamsung) {
    message = 'Para instalar o app:\n1. Toque nos 3 pontos do menu\n2. Selecione "Adicionar página a"'
  } else {
    message = 'Para instalar o app:\n1. Abra o menu do navegador\n2. Procure por "Adicionar à tela inicial" ou opção similar'
  }
  
  alert(message)
  showPrompt.value = false
}
</script>

<style scoped>
.pwa-install-prompt {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  z-index: 9999;
}

.pwa-install-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.pwa-install-header {
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pwa-install-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.pwa-install-body {
  padding: 16px;
}

.pwa-install-body p {
  margin: 0 0 12px;
  color: #666;
}

.pwa-install-body ul {
  margin: 0;
  padding-left: 20px;
  color: #666;
}

.pwa-install-body li {
  margin: 4px 0;
}

.pwa-install-footer {
  padding: 16px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 8px;
}

.install-btn {
  flex: 1;
  background: #EE350F;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}

.later-btn {
  flex: 1;
  background: #f3f4f6;
  color: #666;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}
</style> 