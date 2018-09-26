import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormAuthenticity from 'rc/common/FormAuthenticity';
import provideTranslations from 'rc/HoC/provideTranslations';
import * as schemas from 'r/schemas';

class ClientRegistration extends Component {
  render() {
    const {
      formAuthenticity,
      t,
      timeout,
      vendorRegistrationPath,
    } = this.props;

    return (
      <div className="b-cart__content">
        <div className="b-form">
          <form
            acceptCharset="UTF-8"
            action={vendorRegistrationPath}
            method="post"
            noValidate
          >
            <FormAuthenticity {...formAuthenticity} />
            <h1 className="form-title">
              {t('vendor.client.registration')}
            </h1>
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <input
                  id="client_registration_form_phone"
                  name="client_registration_form[phone]"
                  placeholder={t('vendor.client.placeholders.phone')}
                  type="text"
                />
              </div>
            </div>
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <input
                  id="client_registration_form_name"
                  name="client_registration_form[name]"
                  placeholder={t('vendor.client.placeholders.name')}
                  type="text"
                />
              </div>
            </div>
            <div className="b-form__row__widget">
              <input
                className="b-btn"
                name="commit"
                type="submit"
                value={t('vendor.client.submit')}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ClientRegistration.propTypes = {
  formAuthenticity: schemas.formAuthenticity.isRequired,
  t: PropTypes.func.isRequired,
  vendorRegistrationPath: PropTypes.string.isRequired,
};

export default provideTranslations(ClientRegistration);
