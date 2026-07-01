<template>
  <div class="order-chatbot">
    <!-- Floating Chat Button -->
    <button
      class="chatbot-toggle"
      :class="{ 'is-open': isOpen }"
      @click="toggleChat"
      :aria-label="isOpen ? 'Close chat' : 'Open order chat'"
    >
      <i v-if="!isOpen" class="fas fa-comment-dots"></i>
      <i v-else class="fas fa-times"></i>
    </button>

    <!-- Chat Panel -->
    <transition name="chat-slide">
      <div v-if="isOpen" class="chatbot-panel">
        <!-- Header -->
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <div class="chatbot-avatar">
              <i class="fas fa-robot"></i>
            </div>
            <div>
              <h3 class="chatbot-title">Order Assistant</h3>
              <p class="chatbot-subtitle">Ask about your orders</p>
            </div>
          </div>
          <button class="chatbot-close" @click="closeChat" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Messages -->
        <div class="chatbot-messages" ref="messagesContainer">
          <div
            v-for="(msg, idx) in messages"
            :key="idx"
            class="chat-message"
            :class="msg.role"
          >
            <div class="message-bubble">
              <div class="message-text">{{ msg.text }}</div>
              <div v-if="msg.orderInfo" class="message-order-info">
                <div class="order-chip" @click="viewOrderDetail(msg.orderId)">
                  <i class="fas fa-box"></i>
                  {{ msg.orderInfo.order_number }}
                </div>
                <div v-if="msg.orderInfo.items && msg.orderInfo.items.length" class="order-items-preview">
                  <span v-for="(item, i) in msg.orderInfo.items.slice(0, 3)" :key="i" class="item-chip">
                    {{ item.quantity }}× {{ item.name }}
                  </span>
                  <span v-if="msg.orderInfo.items.length > 3" class="item-chip more">
                    +{{ msg.orderInfo.items.length - 3 }} more
                  </span>
                </div>
              </div>
              <div class="message-time">{{ msg.time }}</div>
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="isTyping" class="chat-message bot">
            <div class="message-bubble typing-bubble">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div v-if="orders.length > 0 && !showOrderPicker" class="chatbot-quick-actions">
          <button class="quick-btn" @click="showHelp">
            <i class="fas fa-question-circle"></i> Help
          </button>
          <button class="quick-btn" @click="showOrderPicker = true">
            <i class="fas fa-list"></i> My Orders
          </button>
        </div>

        <!-- Order Picker -->
        <div v-if="showOrderPicker" class="order-picker">
          <div class="picker-header">
            <button class="picker-back" @click="showOrderPicker = false">
              <i class="fas fa-arrow-left"></i>
            </button>
            <span>Select an order</span>
          </div>
          <div class="picker-list">
            <button
              v-for="order in orders"
              :key="order.order_number"
              class="picker-item"
              @click="selectOrder(order)"
            >
              <div class="picker-item-info">
                <span class="picker-item-number">{{ order.order_number }}</span>
                <span class="picker-item-status" :class="'status-' + order.status">
                  {{ order.status }}
                </span>
              </div>
              <span class="picker-item-date">{{ formatDate(order.date) }}</span>
            </button>
          </div>
        </div>

        <!-- Input -->
        <div class="chatbot-input">
          <input
            v-model="inputText"
            type="text"
            placeholder="Ask about your order..."
            @keydown.enter="sendMessage"
            :disabled="isTyping"
            ref="inputRef"
          />
          <button
            class="send-btn"
            @click="sendMessage"
            :disabled="!inputText.trim() || isTyping"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '../../stores/auth'

export default {
  name: 'OrderChatbotWidget',
  props: {
    preselectedOrderId: {
      type: [Number, String],
      default: null
    }
  },
  emits: ['open-chat'],
  data() {
    return {
      isOpen: false,
      isTyping: false,
      inputText: '',
      messages: [],
      orders: [],
      showOrderPicker: false,
      activeOrderContext: null, // { order_number, id } — the order currently being discussed
      confirmationKeywords: [
        'got it', 'got my order', 'got the order',
        'received', 'i received it', 'received it', 'i received my order',
        'arrived', 'it arrived', 'has arrived', 'it came', 'just came', 'came in',
        'yes', 'yeah', 'yep', 'sure', 'thanks got it',
        'confirmed', 'confirm', 'i confirm',
        'thanks', 'thank you', 'all good', 'looks good'
      ],
      API_URL: import.meta.env.VITE_API_URL || '/api'
    }
  },
  computed: {
    isAuthenticated() {
      const authStore = useAuthStore()
      return authStore.isAuthenticated
    }
  },
  watch: {
    preselectedOrderId(val) {
      if (val && this.isOpen) {
        this.loadOrder(val)
      }
    },
    isOpen(val) {
      if (val && this.preselectedOrderId) {
        this.$nextTick(() => this.loadOrder(this.preselectedOrderId))
      }
      if (val) {
        this.$nextTick(() => {
          this.scrollToBottom()
          this.$refs.inputRef?.focus()
        })
      }
    }
  },
  methods: {
    toggleChat() {
      if (!this.isOpen && !this.isAuthenticated) {
        this.$router.push('/login')
        return
      }
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.addBotMessage('Hi! I can help you track your orders. Click "My Orders" below or just ask me a question!')
        this.fetchOrders()
        this.$nextTick(() => this.$refs.inputRef?.focus())
      }
    },

    closeChat() {
      this.isOpen = false
      this.showOrderPicker = false
    },

    async fetchOrders() {
      try {
        const response = await axios.get('/chatbot/my-orders')
        if (response.data.success) {
          this.orders = response.data.data
        }
      } catch (err) {
        console.error('Failed to load orders:', err)
      }
    },

    async loadOrder(orderId) {
      this.isTyping = true
      try {
        const response = await axios.get(`/chatbot/order/${orderId}`)
        if (response.data.success) {
          const data = response.data.data
          // Set active order context so confirmation phrases like "got it" work
          this.activeOrderContext = { id: data.order_number, number: data.order_number }
          this.addBotMessage(data.message, data, data.order_number)
          // Show hint if order is pending
          if (data.status === 'pending') {
            this.addBotMessage(
              '💡 If you\'ve received this order, just let me know by saying "got it" or "received" and I\'ll mark it as completed for you!'
            )
          }
        }
      } catch (err) {
        this.addBotMessage("I couldn't find that order. Please check the order ID and try again.")
      } finally {
        this.isTyping = false
      }
    },

    selectOrder(order) {
      this.showOrderPicker = false
      this.activeOrderContext = { id: order.order_number, number: order.order_number }
      this.addBotMessage(order.message, order, order.order_number)
      this.scrollToBottom()
    },

    // Check if user text is a confirmation of receipt
    isConfirmation(text) {
      const lower = text.toLowerCase().trim()
      return this.confirmationKeywords.some(kw => lower.includes(kw))
    },

    async handleConfirmReceipt(orderId) {
      this.isTyping = true
      try {
        const response = await axios.post('/chatbot/confirm-receipt', { order_id: orderId })
        const data = response.data

        if (data.success) {
          const result = data.data
          // Update the order in local orders list so status reflects immediately
          const idx = this.orders.findIndex(o => o.order_number === result.order_number)
          if (idx !== -1) {
            this.orders[idx] = { ...this.orders[idx], ...result }
          }
          this.addBotMessage(result.message, result, result.order_number)
        } else {
          // Edge case: already completed, cancelled, not found, etc.
          this.addBotMessage(data.data.message, data.data, data.data.order_number)
        }
      } catch (err) {
        // Try to show a meaningful message from the API response
        const apiMessage = err.response?.data?.data?.message
          || err.response?.data?.message
          || null
        if (apiMessage) {
          const apiData = err.response?.data?.data || null
          this.addBotMessage(apiMessage, apiData, apiData?.order_number || null)
        } else {
          // Only show generic error when truly nothing worked
          this.addBotMessage(
            'I had trouble processing that. Please try again or select an order from "My Orders".'
          )
        }
      } finally {
        this.isTyping = false
        this.activeOrderContext = null
      }
    },

    async sendMessage() {
      const text = this.inputText.trim()
      if (!text || this.isTyping) return

      this.addUserMessage(text)
      this.inputText = ''
      this.isTyping = true

      // Detect confirmation intent
      if (this.isConfirmation(text)) {
        if (!this.activeOrderContext) {
          this.addBotMessage(
            "Which order are you confirming? You can find your order number in 'My Orders'."
          )
          this.isTyping = false
          return
        }
        await this.handleConfirmReceipt(this.activeOrderContext.id)
        this.isTyping = false
        return
      }

      try {
        const response = await axios.post('/chatbot/query', {
          query: text,
          order_id: this.activeOrderContext?.number || null,
        })
        if (response.data.success) {
          const data = response.data.data
          // Track the order being discussed
          if (data.order_number) {
            this.activeOrderContext = { id: data.order_number, number: data.order_number }
          }
          this.addBotMessage(data.message, data, data.order_number)

          // After showing a pending order's message, hint about confirmation
          if (data.status === 'pending' && !this.isConfirmation(text)) {
            this.addBotMessage(
              '💡 If you\'ve received this order, just let me know by saying "got it" or "received" and I\'ll mark it as completed for you!'
            )
          }
        }
      } catch (err) {
        // Extract meaningful message from API error response
        const apiMessage = err.response?.data?.message
          || err.response?.data?.data?.message
          || null
        if (apiMessage) {
          this.addBotMessage(apiMessage, err.response?.data?.data || null)
        } else if (err.response?.status === 404) {
          this.addBotMessage("I couldn't find that order. Please check your order number.")
        } else {
          this.addBotMessage('I had trouble with that. Try clicking "My Orders" or ask "Where is my order?"')
        }
      } finally {
        this.isTyping = false
      }
    },

    showHelp() {
      this.addBotMessage(
        'You can ask me things like:\n' +
        '• "Where is my order?"\n' +
        '• "What did I order?"\n' +
        '• "What is my order status?"\n' +
        '• "How much did I pay?"\n' +
        '• "Got it" or "Received" to confirm delivery\n' +
        'Or click "My Orders" to see all your orders.'
      )
    },

    addBotMessage(text, orderInfo = null, orderId = null) {
      this.messages.push({
        role: 'bot',
        text,
        orderInfo,
        orderId,
        time: this.getCurrentTime()
      })
      this.scrollToBottom()
    },

    addUserMessage(text) {
      this.messages.push({
        role: 'user',
        text,
        time: this.getCurrentTime()
      })
      this.scrollToBottom()
    },

    viewOrderDetail(orderId) {
      this.$router.push(`/order/${orderId}`)
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    },

    getCurrentTime() {
      const now = new Date()
      return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    },

    formatDate(dateStr) {
      if (!dateStr) return ''
      const d = new Date(dateStr)
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }
}
</script>

<style scoped>
/* ─── Floating Toggle Button ─── */
.chatbot-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #b8456a, #7a1f3d);
  color: #fff;
  border: none;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(184, 69, 106, 0.35);
  transition: all 0.3s ease;
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chatbot-toggle:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 28px rgba(184, 69, 106, 0.45);
}

.chatbot-toggle.is-open {
  background: linear-gradient(135deg, #7a1f3d, #4a1526);
  transform: rotate(90deg);
}

/* ─── Chat Panel ─── */
.chatbot-panel {
  position: fixed;
  bottom: 90px;
  right: 24px;
  width: 360px;
  height: 520px;
  max-height: calc(100vh - 140px);
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 9997;
  overflow: hidden;
  border: 1px solid #f0e0e6;
}

/* ─── Header ─── */
.chatbot-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  background: linear-gradient(135deg, #fce4ec, #fdf2f6);
  border-bottom: 1px solid #f0e0e6;
  flex-shrink: 0;
}

.chatbot-header-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chatbot-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #b8456a, #7a1f3d);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #fff;
}

.chatbot-title {
  font-size: 15px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.chatbot-subtitle {
  font-size: 11px;
  color: #8a7a82;
  margin: 2px 0 0;
}

.chatbot-close {
  background: none;
  border: none;
  color: #8a7a82;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;
}

.chatbot-close:hover {
  color: #2c3e50;
}

/* ─── Messages ─── */
.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fdf6f7;
}

.chatbot-messages::-webkit-scrollbar {
  width: 4px;
}

.chatbot-messages::-webkit-scrollbar-thumb {
  background: #dcc8d0;
  border-radius: 2px;
}

.chat-message {
  display: flex;
  max-width: 85%;
  animation: msgIn 0.3s ease;
}

.chat-message.bot {
  align-self: flex-start;
}

.chat-message.user {
  align-self: flex-end;
}

.message-bubble {
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 13px;
  line-height: 1.5;
  position: relative;
  word-wrap: break-word;
}

.chat-message.bot .message-bubble {
  background: #ffffff;
  color: #2c3e50;
  border: 1px solid #f0e0e6;
  border-bottom-left-radius: 4px;
}

.chat-message.user .message-bubble {
  background: linear-gradient(135deg, #b8456a, #7a1f3d);
  color: #ffffff;
  border-bottom-right-radius: 4px;
}

.message-time {
  font-size: 10px;
  color: #bbaab2;
  margin-top: 4px;
  text-align: right;
}

.chat-message.user .message-time {
  color: rgba(255, 255, 255, 0.7);
}

/* Order info in messages */
.message-order-info {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #f0e0e6;
}

.chat-message.user .message-order-info {
  border-top-color: rgba(255, 255, 255, 0.2);
}

.order-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: #fdf2f6;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  color: #b8456a;
  cursor: pointer;
  transition: all 0.2s;
}

.order-chip:hover {
  background: #f4c9d2;
}

.order-items-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
}

.item-chip {
  padding: 2px 8px;
  background: #fdf2f6;
  border-radius: 4px;
  font-size: 11px;
  color: #6b6b80;
}

.item-chip.more {
  background: transparent;
  color: #b8456a;
  font-weight: 600;
}

/* Typing indicator */
.typing-bubble {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 12px 16px;
}

.typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #dcc8d0;
  animation: typingDot 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typingDot {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
}

/* ─── Quick Actions ─── */
.chatbot-quick-actions {
  display: flex;
  gap: 8px;
  padding: 10px 16px;
  border-top: 1px solid #f0e0e6;
  background: #ffffff;
  flex-shrink: 0;
}

.quick-btn {
  flex: 1;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #f0e0e6;
  background: #ffffff;
  color: #7a1f3d;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.quick-btn:hover {
  background: #fdf2f6;
  border-color: #d0b8c4;
}

/* ─── Order Picker ─── */
.order-picker {
  border-top: 1px solid #f0e0e6;
  background: #ffffff;
  flex-shrink: 0;
  max-height: 200px;
  display: flex;
  flex-direction: column;
}

.picker-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-bottom: 1px solid #f0e0e6;
  font-size: 13px;
  font-weight: 600;
  color: #2c3e50;
}

.picker-back {
  background: none;
  border: none;
  color: #b8456a;
  cursor: pointer;
  padding: 2px 4px;
  font-size: 14px;
}

.picker-list {
  overflow-y: auto;
  flex: 1;
}

.picker-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background 0.15s;
  text-align: left;
  border-bottom: 1px solid #f8f0f2;
}

.picker-item:hover {
  background: #fdf2f6;
}

.picker-item-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.picker-item-number {
  font-size: 13px;
  font-weight: 600;
  color: #2c3e50;
}

.picker-item-status {
  font-size: 11px;
  font-weight: 500;
  padding: 1px 6px;
  border-radius: 4px;
  display: inline-block;
  width: fit-content;
}

.status-pending { background: rgba(255, 152, 0, 0.12); color: #e65100; }
.status-processing { background: rgba(33, 150, 243, 0.12); color: #1565c0; }
.status-shipped { background: rgba(102, 126, 234, 0.12); color: #667eea; }
.status-delivered,
.status-completed { background: rgba(76, 175, 80, 0.12); color: #2e7d32; }
.status-cancelled { background: rgba(244, 67, 54, 0.12); color: #c62828; }

.picker-item-date {
  font-size: 11px;
  color: #8a7a82;
}

/* ─── Input ─── */
.chatbot-input {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-top: 1px solid #f0e0e6;
  background: #ffffff;
  flex-shrink: 0;
}

.chatbot-input input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #f0e0e6;
  border-radius: 12px;
  font-size: 13px;
  color: #2c3e50;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s;
  background: #fdf6f7;
}

.chatbot-input input:focus {
  border-color: #b8456a;
  background: #ffffff;
}

.chatbot-input input::placeholder {
  color: #bbaab2;
}

.send-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #b8456a, #7a1f3d);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.08);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

/* ─── Animations ─── */
@keyframes msgIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.chat-slide-enter-active {
  animation: slideUp 0.3s ease;
}

.chat-slide-leave-active {
  animation: slideUp 0.3s ease reverse;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* ─── Responsive ─── */
@media (max-width: 480px) {
  .chatbot-panel {
    right: 12px;
    left: 12px;
    bottom: 80px;
    width: auto;
    height: calc(100vh - 140px);
    border-radius: 16px;
  }

  .chatbot-toggle {
    bottom: 16px;
    right: 16px;
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
}
</style>
