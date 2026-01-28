import React from 'react';
import TelegramWebApp from '../../services/TelegramWebApp';

/**
 * Hidden field component for Telegram user ID
 * Only renders if telegram_user_id is available
 */
const CheckoutTelegramField = () => {
  const telegramUserId = TelegramWebApp.getTelegramUserId();

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
};

export default CheckoutTelegramField;
