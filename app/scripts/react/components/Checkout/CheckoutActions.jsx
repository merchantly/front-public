import React, { Component } from 'react'; import PropTypes from 'prop-types';
import Rodal from 'rodal';
import Spinner from 'react-spinjs';
import * as schemas from 'r/schemas';
import CheckoutPublicOffer from './CheckoutPublicOffer';

class CheckoutActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isProcessing: false,
      isRedirecting: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.startProcessing = this.startProcessing.bind(this);
  }
  startProcessing() {
    this.setState({ isProcessing: true });
  }
  handleClick(ev) {
    const { backUrl } = this.props;

    this.setState({ isRedirecting: true });
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
    const {
      isProcessing,
      isRedirecting,
    } = this.state;

    return (
      <div className="b-cart__action">
        <Rodal
          onClose={() => {}}
          showCloseButton={false}
          visible={isProcessing || isRedirecting}
        >
          <div className="b-modal__container">
            <div className="b-modal__spinner-container">
              <Spinner />
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
              onClick={this.handleClick}
            >
              {t('vendor.order.go_back')}
            </a>
          </div>
          <div className="b-cart__action__col-submit">
            <input
              className="b-btn b-cart__action__next element--active-opacity"
              data-disable-with={t('vendor.button.disable_with.waiting')}
              onClick={this.startProcessing}
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
