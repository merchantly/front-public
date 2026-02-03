/**
 * Telegram WebApp Service
 *
 * Handles Telegram Mini App integration:
 * - Detecting if running inside Telegram
 * - Validating initData with backend
 * - Storing telegram_user_id for checkout
 * - Applying Telegram-specific UI adjustments
 */

const STORAGE_KEY = 'telegram_user_id';
const VALIDATE_ENDPOINT = '/telegram/miniapp/validate';

const THEME_PARAMS = [
  'bg_color', 'text_color', 'hint_color',
  'link_color', 'button_color', 'button_text_color',
];

const NOTIFICATION_TYPES = ['success', 'warning', 'error'];
const IMPACT_TYPES = ['light', 'medium', 'heavy'];

let memoryTelegramUserId = null;

const TelegramWebApp = {
  isInTelegram() {
    return typeof window !== 'undefined' &&
           window.Telegram &&
           window.Telegram.WebApp &&
           window.Telegram.WebApp.initData;
  },

  isTelegramWebappMode() {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('telegram_webapp') === '1';
  },

  getWebApp() {
    return this.isInTelegram() ? window.Telegram.WebApp : null;
  },

  getInitData() {
    const webApp = this.getWebApp();
    return webApp ? webApp.initData : null;
  },

  getUserData() {
    const webApp = this.getWebApp();
    return (webApp && webApp.initDataUnsafe && webApp.initDataUnsafe.user) || null;
  },

  storeTelegramUserId(userId) {
    // Validate userId before storing
    if (userId == null || typeof userId !== 'number' || isNaN(userId)) {
      console.warn('[TelegramWebApp] Invalid userId, not storing:', userId);
      return;
    }
    memoryTelegramUserId = userId;
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(STORAGE_KEY, String(userId));
      }
    } catch (e) {
      console.warn('[TelegramWebApp] sessionStorage unavailable:', e.message);
    }
  },

  getTelegramUserId() {
    if (memoryTelegramUserId) {
      return memoryTelegramUserId;
    }
    try {
      if (typeof sessionStorage !== 'undefined') {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = parseInt(stored, 10);
          // Validate parsed value is a valid number
          if (!isNaN(parsed)) {
            memoryTelegramUserId = parsed;
            return memoryTelegramUserId;
          }
        }
      }
    } catch (e) {
      console.warn('[TelegramWebApp] sessionStorage unavailable:', e.message);
    }
    return null;
  },

  clearTelegramUserId() {
    memoryTelegramUserId = null;
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn('[TelegramWebApp] Failed to clear sessionStorage:', e.message);
    }
  },

  async validateInitData() {
    const initData = this.getInitData();

    if (!initData) {
      return { valid: false, error: 'No initData available' };
    }

    try {
      const response = await fetch(VALIDATE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ init_data: initData }),
      });

      // Check Content-Type before parsing JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || contentType.indexOf('application/json') === -1) {
        console.error('[TelegramWebApp] Response is not JSON:', contentType);
        return { valid: false, error: 'Invalid response format' };
      }

      const data = await response.json();

      if (response.ok && data.valid) {
        this.storeTelegramUserId(data.telegram_user_id);
        return {
          valid: true,
          telegramUserId: data.telegram_user_id,
          telegramUser: data.telegram_user,
        };
      }

      console.warn('[TelegramWebApp] Validation failed:', data.error);
      return { valid: false, error: data.error };
    } catch (e) {
      console.error('[TelegramWebApp] Validation request failed:', e);
      return { valid: false, error: e.message };
    }
  },

  async initialize() {
    if (!this.isInTelegram() && !this.isTelegramWebappMode()) {
      return { initialized: false, reason: 'Not in Telegram' };
    }

    const webApp = this.getWebApp();

    if (webApp) {
      webApp.ready();
      webApp.expand();
      this.applyTheme();
    }

    if (this.isInTelegram()) {
      const result = await this.validateInitData();
      return {
        initialized: true,
        validated: result.valid,
        telegramUserId: result.telegramUserId,
        error: result.error
      };
    }

    return { initialized: true, validated: false, reason: 'No initData' };
  },

  applyTheme() {
    const webApp = this.getWebApp();
    if (!webApp || !webApp.themeParams) return;

    const { themeParams } = webApp;
    const root = document.documentElement;

    THEME_PARAMS.forEach(function(param) {
      if (themeParams[param]) {
        root.style.setProperty('--tg-theme-' + param.replace(/_/g, '-'), themeParams[param]);
      }
    });
  },

  close() {
    const webApp = this.getWebApp();
    if (webApp) {
      webApp.close();
    } else {
      window.close();
    }
  },

  showConfirm(message, callback) {
    const webApp = this.getWebApp();
    if (webApp && webApp.showConfirm) {
      webApp.showConfirm(message, callback);
    } else {
      const result = window.confirm(message);
      callback(result);
    }
  },

  showAlert(message, callback) {
    const webApp = this.getWebApp();
    if (webApp && webApp.showAlert) {
      webApp.showAlert(message, callback);
    } else {
      window.alert(message);
      if (callback) callback();
    }
  },

  setMainButton(text, onClick, options = {}) {
    const webApp = this.getWebApp();
    if (!webApp || !webApp.MainButton) return;

    const { MainButton } = webApp;

    MainButton.setText(text);
    MainButton.onClick(onClick);

    if (options.color) {
      MainButton.color = options.color;
    }
    if (options.textColor) {
      MainButton.textColor = options.textColor;
    }

    MainButton.show();
  },

  hideMainButton() {
    const webApp = this.getWebApp();
    if (webApp && webApp.MainButton) {
      webApp.MainButton.hide();
    }
  },

  hapticFeedback(type = 'light') {
    const webApp = this.getWebApp();
    if (!webApp || !webApp.HapticFeedback) return;

    if (NOTIFICATION_TYPES.indexOf(type) !== -1) {
      webApp.HapticFeedback.notificationOccurred(type);
    } else {
      webApp.HapticFeedback.impactOccurred(IMPACT_TYPES.indexOf(type) !== -1 ? type : 'light');
    }
  }
};

export default TelegramWebApp;
