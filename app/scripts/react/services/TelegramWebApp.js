/**
 * Telegram WebApp Service
 *
 * Handles Telegram Mini App integration:
 * - Detecting if running inside Telegram
 * - Validating initData with backend (stores telegram_user_id in server-side signed cookie)
 * - Applying Telegram-specific UI adjustments
 *
 * Security note: telegram_user_id is stored server-side in a signed cookie after
 * initData validation. It's NOT passed from frontend to avoid spoofing.
 */

const SESSION_ENDPOINT = '/telegram/miniapp/session';

const TelegramWebApp = {
  /**
   * Check if we're running inside Telegram WebApp
   */
  isInTelegram() {
    return typeof window !== 'undefined' &&
           window.Telegram &&
           window.Telegram.WebApp &&
           window.Telegram.WebApp.initData;
  },

  /**
   * Check if telegram_webapp=1 parameter is present
   */
  isTelegramWebappMode() {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('telegram_webapp') === '1';
  },

  /**
   * Get Telegram WebApp instance
   */
  getWebApp() {
    if (this.isInTelegram()) {
      return window.Telegram.WebApp;
    }
    return null;
  },

  /**
   * Get initData string from Telegram
   */
  getInitData() {
    const webApp = this.getWebApp();
    return webApp ? webApp.initData : null;
  },

  /**
   * Get user data from Telegram (parsed from initDataUnsafe)
   */
  getUserData() {
    const webApp = this.getWebApp();
    if (webApp && webApp.initDataUnsafe && webApp.initDataUnsafe.user) {
      return webApp.initDataUnsafe.user;
    }
    return null;
  },

  /**
   * Create session by validating initData with backend
   * Server stores telegram_user_id in signed cookie on success
   * @returns {Promise<{valid: boolean, telegramUserId?: number, error?: string}>}
   */
  async validateInitData() {
    const initData = this.getInitData();

    if (!initData) {
      return { valid: false, error: 'No initData available' };
    }

    try {
      const response = await fetch(SESSION_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Include cookies for signed cookie
        body: JSON.stringify({ init_data: initData }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // telegram_user_id is stored server-side in signed cookie
        return {
          valid: true,
          telegramUserId: data.user && data.user.telegram_user_id,
          telegramUser: data.user
        };
      } else {
        console.warn('[TelegramWebApp] Validation failed:', data.error);
        return { valid: false, error: data.error };
      }
    } catch (e) {
      console.error('[TelegramWebApp] Validation request failed:', e);
      return { valid: false, error: e.message };
    }
  },

  /**
   * Initialize Telegram WebApp
   * Should be called on page load
   */
  async initialize() {
    if (!this.isInTelegram() && !this.isTelegramWebappMode()) {
      return { initialized: false, reason: 'Not in Telegram' };
    }

    const webApp = this.getWebApp();

    if (webApp) {
      // Tell Telegram the app is ready
      webApp.ready();

      // Expand to full height
      webApp.expand();

      // Apply theme colors if available
      this.applyTheme();
    }

    // Validate initData if available
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

  /**
   * Apply Telegram theme colors to CSS variables
   */
  applyTheme() {
    const webApp = this.getWebApp();
    if (!webApp || !webApp.themeParams) return;

    const { themeParams } = webApp;
    const root = document.documentElement;

    if (themeParams.bg_color) {
      root.style.setProperty('--tg-theme-bg-color', themeParams.bg_color);
    }
    if (themeParams.text_color) {
      root.style.setProperty('--tg-theme-text-color', themeParams.text_color);
    }
    if (themeParams.hint_color) {
      root.style.setProperty('--tg-theme-hint-color', themeParams.hint_color);
    }
    if (themeParams.link_color) {
      root.style.setProperty('--tg-theme-link-color', themeParams.link_color);
    }
    if (themeParams.button_color) {
      root.style.setProperty('--tg-theme-button-color', themeParams.button_color);
    }
    if (themeParams.button_text_color) {
      root.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color);
    }
  },

  /**
   * Close Mini App (use instead of window.close)
   */
  close() {
    const webApp = this.getWebApp();
    if (webApp) {
      webApp.close();
    } else {
      window.close();
    }
  },

  /**
   * Show confirmation dialog
   * @param {string} message
   * @param {Function} callback
   */
  showConfirm(message, callback) {
    const webApp = this.getWebApp();
    if (webApp && webApp.showConfirm) {
      webApp.showConfirm(message, callback);
    } else {
      const result = window.confirm(message);
      callback(result);
    }
  },

  /**
   * Show alert
   * @param {string} message
   * @param {Function} callback
   */
  showAlert(message, callback) {
    const webApp = this.getWebApp();
    if (webApp && webApp.showAlert) {
      webApp.showAlert(message, callback);
    } else {
      window.alert(message);
      if (callback) callback();
    }
  },

  /**
   * Current MainButton click handler (for cleanup)
   * @private
   */
  _mainButtonHandler: null,

  /**
   * Set and show main button
   * @param {string} text - Button text
   * @param {Function} onClick - Click handler
   * @param {Object} options - Optional settings (color, textColor)
   */
  setMainButton(text, onClick, options = {}) {
    const webApp = this.getWebApp();
    if (!webApp || !webApp.MainButton) return;

    const { MainButton } = webApp;

    // Remove previous handler to prevent memory leak
    if (this._mainButtonHandler) {
      MainButton.offClick(this._mainButtonHandler);
    }
    this._mainButtonHandler = onClick;

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

  /**
   * Hide main button and cleanup handler
   */
  hideMainButton() {
    const webApp = this.getWebApp();
    if (webApp && webApp.MainButton) {
      // Cleanup handler to prevent stale callbacks
      if (this._mainButtonHandler) {
        webApp.MainButton.offClick(this._mainButtonHandler);
        this._mainButtonHandler = null;
      }
      webApp.MainButton.hide();
    }
  },

  /**
   * Enable haptic feedback
   * @param {'light'|'medium'|'heavy'|'success'|'warning'|'error'} type
   */
  hapticFeedback(type = 'light') {
    const webApp = this.getWebApp();
    if (webApp && webApp.HapticFeedback) {
      switch (type) {
        case 'light':
          webApp.HapticFeedback.impactOccurred('light');
          break;
        case 'medium':
          webApp.HapticFeedback.impactOccurred('medium');
          break;
        case 'heavy':
          webApp.HapticFeedback.impactOccurred('heavy');
          break;
        case 'success':
          webApp.HapticFeedback.notificationOccurred('success');
          break;
        case 'warning':
          webApp.HapticFeedback.notificationOccurred('warning');
          break;
        case 'error':
          webApp.HapticFeedback.notificationOccurred('error');
          break;
        default:
          webApp.HapticFeedback.impactOccurred('light');
      }
    }
  }
};

export default TelegramWebApp;
