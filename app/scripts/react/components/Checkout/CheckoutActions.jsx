import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rodal from 'rodal';
import ReactSpinner  from 'react16-spinjs';
import * as schemas from 'r/schemas';
import CheckoutPublicOffer from './CheckoutPublicOffer';

class CheckoutActions extends Component {
  render() {
    const {
      backUrl,
      publicOffer,
      t,
      startProcessing,
      handleClick,
      isProcessing,
      isRedirecting
    } = this.props;

    return (
      <div className="b-cart__action">
        <Rodal
          onClose={() => {}}
          showCloseButton={false}
          visible={isProcessing || isRedirecting}
        >
          <div className="b-modal__container">
            <div className="b-modal__spinner-container">
              <ReactSpinner />
            </div>
            {t(`vendor.order.${isProcessing ? 'processing' : 'wait'}`)}
          </div>
        </Rodal>
        {publicOffer && publicOffer.show
          ? <CheckoutPublicOffer {...publicOffer} t={t} />
          : null
        }
        <div className="b-cart__action__container">
          <div className="b-cart__action__col-back">
            <a
              className="b-btn b-btn_trans b-cart__action__clear"
              data-disable-with={t('vendor.button.disable_with.waiting')}
              href={backUrl || '#'}
              onClick={handleClick}
            >
              {t('vendor.order.go_back')}
            </a>
          </div>
          <div className="b-cart__action__col-submit b-cart__action__col-submit-continue">
            <input
              className="b-btn b-cart__action__next element--active-opacity"
              data-disable-with={t('vendor.button.disable_with.waiting')}
              onClick={startProcessing}
              type="submit"
              value={t('vendor.order.next')}
            />
          </div>
        </div>
      </div>
    );
  }
}

CheckoutActions.propTypes = {
  backUrl: PropTypes.string,
  publicOffer: schemas.checkoutPublicOffer,
  totalCount: PropTypes.number,
  totalPrice: PropTypes.object.isRequired,
  items: PropTypes.array,
  t: PropTypes.func.isRequired,
  isRedirecting: PropTypes.bool,
  isProcessing: PropTypes.bool,
  startProcessing: PropTypes.func,
  handleClick: PropTypes.func,
};

export default CheckoutActions;
