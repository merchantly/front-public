import React, { Component, PropTypes } from 'react';

import * as schemas from 'r/schemas';
import CheckoutPublicOffer from './CheckoutPublicOffer';

class CheckoutActions extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(ev) {
    const { backUrl } = this.props;

    if (!backUrl) {
      ev.preventDefault();
      window.history.back();
    }
  }
  render() {
    const {
      backUrl,
      publicOffer,
      t,
    } = this.props;

    return (
      <div className="b-cart__action">
        {publicOffer && publicOffer.show
          ? <CheckoutPublicOffer {...publicOffer} t={t} />
          : null
        }
        <div className="b-cart__action__container">
          <div className="b-cart__action__col-back">
            <a
              className="b-btn b-btn_trans b-cart__action__clear"
              href={backUrl || '#'}
              onClick={this.handleClick}
            >
              {t('vendor.order.go_back')}
            </a>
          </div>
          <div className="b-cart__action__col-submit">
            <input
              className="b-btn b-cart__action__next"
              data-disable-with={t('vendor.button.disable_with.waiting')}
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
  t: PropTypes.func.isRequired,
};

export default CheckoutActions;
