import React, { Component } from 'react';
import PropTypes from 'prop-types';
import provideTranslations from 'rc/HoC/provideTranslations';
import * as schemas from 'r/schemas';
import HiddenInput from '../common/HiddenInput';

class ClientRestorePassword extends Component {
  render() {
    const {
      t,
      vendorClientRestorePasswordPath,
      login,
    } = this.props;

    return (
      <div className="b-cart__content">
        <div className="b-form">
          <form
            acceptCharset="UTF-8"
            action={vendorClientRestorePasswordPath}
            method="post"
            noValidate
          >
            <h1 className="form-title">
              {t('vendor.client.restore_password')}
            </h1>
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <HiddenInput name="_method" value="put" />
                <input
                  id="client_login_form_login"
                  name="client_login_form[login]"
                  placeholder={t('vendor.client.placeholders.login')}
                  type="text"
                  defaultValue={login}
                />
              </div>
            </div>
            <div className="b-form__row__widget">
              <input
                className="b-btn"
                name="commit"
                type="submit"
                value={t('vendor.client.reset_password_submit')}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ClientRestorePassword.propTypes = {
  t: PropTypes.func.isRequired,
  vendorClientRestorePasswordPath: PropTypes.string.isRequired,
  login: PropTypes.string,
};

export default provideTranslations(ClientRestorePassword);
