import React from 'react';
import TelegramWebApp from '../../services/TelegramWebApp';

const POLL_INTERVAL_MS = 500;
const MAX_POLL_ATTEMPTS = 20; // 10 seconds max

/**
 * Hidden field component for Telegram user ID
 * Polls for telegram_user_id availability to handle async validation
 */
class CheckoutTelegramField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      telegramUserId: TelegramWebApp.getTelegramUserId()
    };
    this.pollAttempts = 0;
    this.pollInterval = null;
  }

  componentDidMount() {
    // Start polling if no telegram_user_id yet and we're in Telegram context
    if (!this.state.telegramUserId && (TelegramWebApp.isInTelegram() || TelegramWebApp.isTelegramWebappMode())) {
      this.startPolling();
    }
  }

  componentWillUnmount() {
    this.stopPolling();
  }

  startPolling() {
    this.pollInterval = setInterval(() => {
      const telegramUserId = TelegramWebApp.getTelegramUserId();
      this.pollAttempts += 1;

      if (telegramUserId) {
        this.setState({ telegramUserId: telegramUserId });
        this.stopPolling();
      } else if (this.pollAttempts >= MAX_POLL_ATTEMPTS) {
        // Stop polling after max attempts
        this.stopPolling();
      }
    }, POLL_INTERVAL_MS);
  }

  stopPolling() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  render() {
    const { telegramUserId } = this.state;

    if (!telegramUserId) {
      return null;
    }

    return (
      <input
        type="hidden"
        name="telegram_user_id"
        value={telegramUserId}
      />
    );
  }
}

export default CheckoutTelegramField;
