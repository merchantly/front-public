import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '../common/Select';
import * as schemas from 'r/schemas';
import FormAuthenticity from '../common/FormAuthenticity';

class ClientForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deliveryId: props.delivery.currentDeliveryId,
      paymentId: props.payment.currentPaymentId,
    };
  }

  changeDelivery(deliveryId) {
    this.setState({ deliveryId: deliveryId });
  }

  changePayment(paymentId) {
    this.setState({ paymentId: paymentId });
  }

  render() {
    const {
      formAuthenticity,
      t,
      delivery,
      payment,
      address,
      cityTitle,
      clientUpdatePath
    } = this.props;

    const {
      deliveryId,
      paymentId,
    } = this.state

    return (
      <div className="b-cart__content">
        <div className="b-form">
          <form
            acceptCharset="UTF-8"
            action={clientUpdatePath}
            method="post"
            noValidate
          >
            <h2 className="form-title">
              {t('vendor.client.clientForm.title')}
            </h2>
            <FormAuthenticity {...formAuthenticity} />
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <div className='b-item-full__form__option  b-item-full__form__option_full b-item-full__form__option_pln'>
                  <Select
                    name="client[vendor_delivery_id]"
                    options={delivery.list.map((i) => ({ value: i.id, title: i.title, }))}
                    onChange={this.changeDelivery.bind(this)}
                    value={deliveryId}
                  />
                  {delivery.errorMessage &&
                    <span className="help-block">{delivery.errorMessage }</span>
                  }
                </div>
              </div>
            </div>
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <div className='b-item-full__form__option  b-item-full__form__option_full b-item-full__form__option_pln'>
                  <Select
                    name="client[vendor_payment_id]"
                    options={payment.list.map((i) => ({ value: i.id, title: i.title, }))}
                    onChange={this.changePayment.bind(this)}
                    value={paymentId}
                  />
                  {payment.errorMessage &&
                    <span className="help-block">{payment.errorMessage}</span>
                  }
                </div>
              </div>
            </div>
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <input
                  id="clinet_city_title"
                  name="client[city_title]"
                  placeholder={t('vendor.client.placeholders.city_title')}
                  type="text"
                  defaultValue={cityTitle.value}
                />
                {cityTitle.errorMessage &&
                  <span className="help-block">{cityTitle.errorMessage}</span>
                }
              </div>
            </div> 
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <input
                  id="client_address"
                  name="client[address]"
                  placeholder={t('vendor.client.placeholders.address')}
                  type="text"
                  defaultValue={address.value}
                />
                {address.errorMessage &&
                  <span className="help-block">{address.errorMessage}</span>
                }
              </div>
            </div>
            <div className="b-form__row__widget">
              <input
                className="b-btn"
                name="commit"
                type="submit"
                value={t('vendor.client.save_submit')}
              />
            </div>    
          </form>
        </div>
      </div>
    )
  }
}

ClientForm.propTypes = {
  delivery: PropTypes.shape({
    currentDeliveryId: PropTypes.integer,
    errorMessage: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  payment: PropTypes.shape({
    currentPaymentId: PropTypes.integer,
    errorMessage: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  address: PropTypes.shape({
    value: PropTypes.string,
    errorMessage: PropTypes.string,
  }),
  cityTitle: PropTypes.shape({
    value: PropTypes.string,
    errorMessage: PropTypes.string,
  }),
  formAuthenticity: schemas.formAuthenticity,
  clientUpdatePath: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default ClientForm;
