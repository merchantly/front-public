import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormAuthenticity from 'rc/common/FormAuthenticity';
import provideTranslations from 'rc/HoC/provideTranslations';
import * as schemas from 'r/schemas';
import HiddenInput from '../common/HiddenInput';

class ClientResetPassword extends Component {
  render() {
    const {
      formAuthenticity,
      t,
      vendorClientResetPasswordPath,
      password,
    } = this.props;

    return (
      <div className="b-cart__content">
        <div className="b-form">
          <form
            acceptCharset="UTF-8"
            action={vendorClientResetPasswordPath}
            method="post"
            noValidate
          >
            <FormAuthenticity {...formAuthenticity} />
            <h1 className="form-title">
              {t('vendor.client.reset_password')}
            </h1>
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <HiddenInput name="_method" value="put" />
                <input
                  id="client_form_password"
                  name="client_form[password]"
                  placeholder={t('vendor.client.placeholders.new_password')}
                  type="password"
                  defaultValue={password.value}
                />
                {password.errorMessage &&
                  <span className="help-block">{password.errorMessage}</span>
                }
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

ClientResetPassword.propTypes = {
  formAuthenticity: schemas.formAuthenticity.isRequired,
  t: PropTypes.func.isRequired,
  vendorClientResetPasswordPath: PropTypes.string.isRequired,
  password: PropTypes.object,
};

export default provideTranslations(ClientResetPassword);
