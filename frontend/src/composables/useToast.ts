import { ref, type Ref } from 'vue'

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration: number
}

const toasts: Ref<Toast[]> = ref([])
let nextId = 1

export function useToast() {
  function addToast(message: string, type: Toast['type'] = 'info', duration = 3000) {
    const id = nextId++
    toasts.value.push({ id, message, type, duration })

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  function removeToast(id: number) {
    const idx = toasts.value.findIndex((t: Toast) => t.id === id)
    if (idx !== -1) {
      toasts.value.splice(idx, 1)
    }
  }

  function success(message: string, duration?: number) {
    return addToast(message, 'success', duration)
  }

  function error(message: string, duration?: number) {
    return addToast(message, 'error', duration ?? 4000)
  }

  function info(message: string, duration?: number) {
    return addToast(message, 'info', duration)
  }

  function warning(message: string, duration?: number) {
    return addToast(message, 'warning', duration ?? 4000)
  }

  return { toasts, addToast, removeToast, success, error, info, warning }
}
