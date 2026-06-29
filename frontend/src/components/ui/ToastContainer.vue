<template>
  <div class="toast-container">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast-item"
        :class="`toast--${toast.type}`"
      >
        <div class="toast-icon">
          <i :class="iconClass(toast.type)"></i>
        </div>
        <span class="toast-message">{{ toast.message }}</span>
        <button class="toast-close" @click="removeToast(toast.id)" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
        <div class="toast-progress" :style="{ animationDuration: toast.duration + 'ms' }"></div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToast } from '../../composables/useToast'

const { toasts, removeToast } = useToast()

function iconClass(type) {
  switch (type) {
    case 'success': return 'fas fa-check-circle'
    case 'error': return 'fas fa-exclamation-circle'
    case 'warning': return 'fas fa-exclamation-triangle'
    default: return 'fas fa-info-circle'
  }
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 380px;
}

.toast-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid #f0e0e6;
  position: relative;
  overflow: hidden;
  animation: toastIn 0.3s ease;
}

.toast-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 14px;
  flex-shrink: 0;
}

.toast--success .toast-icon { background: #e8f5e9; color: #2e7d32; }
.toast--error .toast-icon { background: #fce4ec; color: #c62828; }
.toast--warning .toast-icon { background: #fff3e0; color: #e65100; }
.toast--info .toast-icon { background: #e3f2fd; color: #1565c0; }

.toast-message {
  flex: 1;
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  color: #bbaab2;
  cursor: pointer;
  padding: 4px;
  font-size: 12px;
  transition: color 0.2s;
  flex-shrink: 0;
}

.toast-close:hover {
  color: #2c3e50;
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  animation: toastProgress linear forwards;
}

.toast--success .toast-progress { background: linear-gradient(90deg, #43a047, #66bb6a); }
.toast--error .toast-progress { background: linear-gradient(90deg, #e53935, #ef5350); }
.toast--warning .toast-progress { background: linear-gradient(90deg, #fb8c00, #ffa726); }
.toast--info .toast-progress { background: linear-gradient(90deg, #1e88e5, #42a5f5); }

@keyframes toastIn {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes toastProgress {
  from { width: 100%; }
  to { width: 0%; }
}

.toast-enter-active { animation: toastIn 0.3s ease; }
.toast-leave-active { animation: toastIn 0.3s ease reverse; }

@media (max-width: 480px) {
  .toast-container {
    left: 12px;
    right: 12px;
    max-width: none;
  }
}
</style>
