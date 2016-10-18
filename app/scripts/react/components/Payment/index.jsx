import React, { PropTypes } from 'react';
import { camelizeKeys } from 'humps';
import Payment from './Payment';
import provideTranslations from 'rc/HoC/provideTranslations';
export {
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
} from './Payment';

function PaymentContainer(props) {
  return <Payment {...camelizeKeys(props)} t={props.t} />;
}

PaymentContainer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default provideTranslations(PaymentContainer);
