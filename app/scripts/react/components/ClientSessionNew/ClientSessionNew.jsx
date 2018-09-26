import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PinAlert from './PinAlert';
import FormAuthenticity from 'rc/common/FormAuthenticity';
import * as schemas from 'r/schemas';

class ClientSessionNew extends Component {
  render() {
    const {
      formAuthenticity,
      t,
      timeout,
      vendorClientSessionsPath,
      phoneValue,
    } = this.props;

    return (
      <div className="b-cart__content">
        <div className="b-form">
          <form
            acceptCharset="UTF-8"
            action={vendorClientSessionsPath}
            method="post"
            noValidate
          >
            <FormAuthenticity {...formAuthenticity} />
            <h1 className="form-title">
              {t('vendor.client.auth')}
            </h1>
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <input
                  id="client_login_form_login"
                  name="client_login_form[login]"
                  placeholder={t('vendor.client.placeholders.phone')}
                  type="text"
                  defaultValue={phoneValue}
                  disabled={!!phoneValue}
                />
              </div>
              <PinAlert t={t} timeout={timeout} />
            </div>
            <input
              id="client_login_form_password"
              name="client_login_form[password]"
              placeholder={t('vendor.client.placeholders.pin')}
              type="password"
            />
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

ClientSessionNew.propTypes = {
  formAuthenticity: schemas.formAuthenticity.isRequired,
  t: PropTypes.func.isRequired,
  timeout: PropTypes.number,
  vendorClientSessionsPath: PropTypes.string.isRequired,
  phoneValue: PropTypes.string,
};

ClientSessionNew.defaultProps = {
  timeout: 0,
};

export default ClientSessionNew;
