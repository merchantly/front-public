import React, { Component, PropTypes } from 'react';
import * as schemas from '../../../schemas';
import {
  getHTMLName, isCurrencyExists, isSymbolFirst, unknownIsoCodeMessage
} from '../../../helpers/money';
import HumanizedMoney from './HumanizedMoney';

class HumanizedMoneyWithCurrency extends Component {
  render() {
    const { money, noMoneyTitle } = this.props;

    if (!money || money.cents == null) {
      return <span>{noMoneyTitle}</span>;
    }

    if (!isCurrencyExists(money)) {
      return <span>{unknownIsoCodeMessage(money)}</span>;
    }

    const symbol = <span dangerouslySetInnerHTML={{ __html: getHTMLName(money) }} />;

    return isSymbolFirst(money)
      ? <span>{symbol} <HumanizedMoney money={money} /></span>
      : <span><HumanizedMoney money={money} /> {symbol}</span>
  }
}

HumanizedMoneyWithCurrency.propTypes = {
  money: schemas.money,
  noMoneyTitle: PropTypes.string,
};

HumanizedMoneyWithCurrency.defaultProps = {
  noMoneyTitle: '-'
};


export default HumanizedMoneyWithCurrency;
