import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '../common/Select';
import * as schemas from 'r/schemas';
import FormAuthenticity from '../common/FormAuthenticity';
import HiddenInput from '../common/HiddenInput';
import { find } from 'lodash-es';


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

  deliveryById(deliveryId) {
    return find(this.props.delivery.list, (d) => d.id == deliveryId)
  }

  renderName() {
    const {
      deliveryId,
    } = this.state;

    const {
      firstName,
      secondName,
      patronymic,
      name,
      t
    } = this.props;

    const delivery = this.deliveryById(deliveryId);

    return (
      <div>
        {(delivery && delivery.isSeparateName)
          ? ( <div>
                <div className="b-form__row__widget">
                  <div className="form-group-first">
                    <label className="string control-label" htmlFor={"client_first_name"}>
                      {t('vendor.client.titles.first_name')}
                    </label>
                    <input
                      id="client_first_name"
                      name="client[first_name]"
                      placeholder={t('vendor.client.placeholders.first_name')}
                      type="text"
                      defaultValue={firstName.value}
                    />
                    {firstName.errorMessage &&
                      <span className="help-block">{firstName.errorMessage}</span>
                    }
                  </div>
                </div>
                <div className="b-form__row__widget">
                  <div className="form-group-first">
                    <label className="string control-label" htmlFor={"client_second_name"}>
                      {t('vendor.client.titles.second_name')}
                    </label>
                    <input
                      id="client_second_name"
                      name="client[second_name]"
                      placeholder={t('vendor.client.placeholders.second_name')}
                      type="text"
                      defaultValue={secondName.value}
                    />
                    {secondName.errorMessage &&
                      <span className="help-block">{secondName.errorMessage}</span>
                    }
                  </div>
                </div>
                <div className="b-form__row__widget">
                  <div className="form-group-first">
                    <label className="string control-label" htmlFor={"client_patronymic"}>
                      {t('vendor.client.titles.patronymic')}
                    </label>
                    <input
                      id="client_patronymic"
                      name="client[patronymic]"
                      placeholder={t('vendor.client.placeholders.patronymic')}
                      type="text"
                      defaultValue={patronymic.value}
                    />
                    {patronymic.errorMessage &&
                      <span className="help-block">{patronymic.errorMessage}</span>
                    }
                  </div>
                </div>
              </div>
          ) : (
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <label className="string control-label" htmlFor={"client_name"}>
                  {t('vendor.client.titles.name')}
                </label>
                <input
                  id="client_name"
                  name="client[name]"
                  placeholder={t('vendor.client.placeholders.name')}
                  type="text"
                  defaultValue={name.value}
                />
                {name.errorMessage &&
                  <span className="help-block">{name.errorMessage}</span>
                }
              </div>
            </div>
          )
        }
      </div>
    )
  }

  renderAddress() {
    const {
      deliveryId,
    } = this.state;

    const delivery = this.deliveryById(deliveryId);

    const {
      address,
      region,
      house,
      room,
      slash,
      street,
      postalCode,
      t
    } = this.props;

    return (
      <div>
        {(delivery && delivery.isSeparateAddress)
          ? ( <div>
                <div className="b-form__row__widget">
                  <div className="form-group-first">
                    <label className="string control-label" htmlFor={"client_region"}>
                      {t('vendor.client.titles.region')}
                    </label>
                    <input
                      id="client_region"
                      name="client[region]"
                      placeholder={t('vendor.client.placeholders.region')}
                      type="text"
                      defaultValue={region.value}
                    />
                    {region.errorMessage &&
                      <span className="help-block">{region.errorMessage}</span>
                    }
                  </div>
                </div>
                <div className="b-form__row__widget">
                  <div className="form-group-first">
                    <label className="string control-label" htmlFor={"client_street"}>
                      {t('vendor.client.titles.street')}
                    </label>
                    <input
                      id="client_street"
                      name="client[street]"
                      placeholder={t('vendor.client.placeholders.street')}
                      type="text"
                      defaultValue={street.value}
                    />
                    {street.errorMessage &&
                      <span className="help-block">{street.errorMessage}</span>
                    }
                  </div>
                </div>
                <div className="b-form__row__widget">
                  <div className="form-group-first">
                    <label className="string control-label" htmlFor={"client_house"}>
                      {t('vendor.client.titles.house')}
                    </label>
                    <input
                      id="client_house"
                      name="client[house]"
                      placeholder={t('vendor.client.placeholders.house')}
                      type="text"
                      defaultValue={house.value}
                    />
                    {house.errorMessage &&
                      <span className="help-block">{house.errorMessage}</span>
                    }
                  </div>
                </div>
                <div className="b-form__row__widget">
                  <div className="form-group-first">
                    <label className="string control-label" htmlFor={"client_room"}>
                      {t('vendor.client.titles.room')}
                    </label>
                    <input
                      id="client_room"
                      name="client[room]"
                      placeholder={t('vendor.client.placeholders.room')}
                      type="text"
                      defaultValue={room.value}
                    />
                    {room.errorMessage &&
                      <span className="help-block">{room.errorMessage}</span>
                    }
                  </div>
                </div>
                <div className="b-form__row__widget">
                  <div className="form-group-first">
                    <label className="string control-label" htmlFor={"client_slash"}>
                      {t('vendor.client.titles.slash')}
                    </label>
                    <input
                      id="client_slash"
                      name="client[slash]"
                      placeholder={t('vendor.client.placeholders.slash')}
                      type="text"
                      defaultValue={slash.value}
                    />
                    {slash.errorMessage &&
                      <span className="help-block">{slash.errorMessage}</span>
                    }
                  </div>
                </div>
                <div className="b-form__row__widget">
                  <div className="form-group-first">
                    <label className="string control-label" htmlFor={"client_postalCode"}>
                      {t('vendor.client.titles.postalCode')}
                    </label>
                    <input
                      id="client_postalCode"
                      name="client[postal_code]"
                      placeholder={t('vendor.client.placeholders.postalCode')}
                      type="text"
                      defaultValue={postalCode.value}
                    />
                    {postalCode.errorMessage &&
                      <span className="help-block">{postalCode.errorMessage}</span>
                    }
                  </div>
                </div>
              </div>
          ) : (
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <label className="string control-label" htmlFor={"client_address"}>
                  {t('vendor.client.titles.address')}
                </label>
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
          )
        }
      </div>
    )
  }

  render() {
    const {
      formAuthenticity,
      t,
      delivery,
      payment,
      cityTitle,
      clientUpdatePath,
    } = this.props;

    const {
      deliveryId,
      paymentId,
    } = this.state;

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
              {t('vendor.client.client_form.title')}
            </h2>
            <FormAuthenticity {...formAuthenticity} />
            <HiddenInput name="_method" value="put" />
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <label className="string control-label" htmlFor={"client_delivery"}>
                  {t('vendor.client.titles.delivery')}
                </label>
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
                <label className="string control-label" htmlFor={"client_payment"}>
                  {t('vendor.client.titles.payment')}
                </label>
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
            {this.renderName()}
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <label className="string control-label" htmlFor={"client_city_title"}>
                  {t('vendor.client.titles.city_title')}
                </label>
                <input
                  id="client_city_title"
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
            {this.renderAddress()}
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
  region: PropTypes.shape({
    value: PropTypes.string,
    errorMessage: PropTypes.string,
  }),
  street: PropTypes.shape({
    value: PropTypes.integer,
    errorMessage: PropTypes.string,
  }),
  house: PropTypes.shape({
    value: PropTypes.integer,
    errorMessage: PropTypes.string,
  }),
  room: PropTypes.shape({
    value: PropTypes.integer,
    errorMessage: PropTypes.string,
  }),
  slash: PropTypes.shape({
    value: PropTypes.string,
    errorMessage: PropTypes.string,
  }),
  postalCode: PropTypes.shape({
    value: PropTypes.integer,
    errorMessage: PropTypes.string,
  }),
  firstName: PropTypes.shape({
    value: PropTypes.string,
    errorMessage: PropTypes.string,
  }),
  secondName: PropTypes.shape({
    value: PropTypes.string,
    errorMessage: PropTypes.string,
  }),
  patronymic: PropTypes.shape({
    value: PropTypes.string,
    errorMessage: PropTypes.string,
  }),
  name: PropTypes.shape({
    value: PropTypes.string,
    errorMessage: PropTypes.string,
  }),
  formAuthenticity: schemas.formAuthenticity,
  clientUpdatePath: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default ClientForm;
