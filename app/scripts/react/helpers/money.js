/*global Bugsnag */
import numeral from 'numeral';
import currencies from '../models/currencies';
import numeralFormats from "../../locales/numeralFormats";

function getCurrency(money) {
  const currencyID = getCurrencyID(money);
  return currencies[currencyID] || null;
}

function getCurrencyID(money) {
  try {
    const currencyID = (typeof money === 'string' ? money : money.currencyIsoCode)

    return currencyID.toLowerCase();
  } catch(e) {
    if (typeof Bugsnag === 'object' && typeof Bugsnag.warn === 'function') {
      Bugsnag.warn('Ошибка getCurrencyId', `money: ${money}, stacktrace: ${e.stack}`);
    }
    return '-';
  }
}

function numeralValue(value) {
  const language = gon.i18n.locale;

  if (numeral.currentLanguage !== language) {
    numeral.language(language, numeralFormats[language]);
    numeral.language(language);
  }

  return numeral(value).format('0,0[.]00');
}

export function getHTMLName(money) {
  const currency = getCurrency(money);

  if (currency && currency.alternate_symbols.length && !money.showCurrencySymbol) {
    return currency.alternate_symbols[0];
  } else {
    return currency.symbol || currency.html_entity;
  }
}

export function getUnit(money) {
  const currency = getCurrency(money);
  return money.cents / currency.subunit_to_unit;
}

export function isCurrencyExists(money) {
  return !!getCurrency(money);
}

export function isSymbolFirst(money) {
  const currency = getCurrency(money);
  return currency.symbol_first;
}

export function money(money) {
  if (!money) {
    return '-';
  }
  if (!isCurrencyExists(money)) {
    return unknownIsoCodeMessage(money);
  }

  return numeralValue(getUnit(money));
}

export function humanizedMoney(money) {
  if (!money) return '-';
  if (!isCurrencyExists(money)) return unknownIsoCodeMessage(money);


  return numeralValue(getUnit(money));
}

export function humanizedMoneyWithCurrency(money, nullValue = '-') {
  if (!money || money.cents === 0) {
    return nullValue;
  }

  if (!isCurrencyExists(money)) {
    return unknownIsoCodeMessage(money);
  }

  return isSymbolFirst(money)
    ? `${getHTMLName(money)} ${humanizedMoney(money)}`
    : `${humanizedMoney(money)} ${getHTMLName(money)}`;
}

export function unknownIsoCodeMessage(money) {
  return `unknown iso code ${getCurrencyID(money)}`;
}
