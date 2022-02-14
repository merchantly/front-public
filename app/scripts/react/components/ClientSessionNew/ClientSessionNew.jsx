import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormAuthenticity from 'rc/common/FormAuthenticity';
import * as schemas from 'r/schemas';

class ClientSessionNew extends Component {
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('loginSubmit').click();
    }
  }

  render() {
    const {
      formAuthenticity,
      t,
      vendorClientSessionsPath,
      vendorClientRegistrationPath,
      vendorClientRestorePasswordPath,
      phoneValue,
      clientRegistrationButtonText,
    } = this.props;

    return (
      <div className="b-cart__content">
        <div className="b-form b-registration_form">
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
              <div className="form-group-first client-form-login-field">
                <input
                  id="client_login_form_login"
                  name="client_login_form[login]"
                  placeholder={t('vendor.client.placeholders.login')}
                  type="text"
                  defaultValue={phoneValue}
                  onKeyPress={this.handleKeyPress}
                />
              </div>
            </div>
            <input
              id="client_login_form_password"
              name="client_login_form[password]"
              placeholder={t('vendor.client.placeholders.password')}
              type="password"
              onKeyPress={this.handleKeyPress}
            />
            <div className="b-form__row__widget">
              <button
                className="b-btn"
                name="commit"
                type="submit"
                id="loginSubmit"
              >
                {t('vendor.client.submit')}
              </button>
            </div>
          </form>
        </div>
        <div className="b-registration_button_block">
          {clientRegistrationButtonText
            && (
              <div className='b-registration_button_text' dangerouslySetInnerHTML={{ __html: clientRegistrationButtonText }} />
            )
          }
          <a className='b-registration_button' href={vendorClientRegistrationPath}>
            {t('vendor.client.registration')}
          </a>
        </div>
        <div className="client-restore-password-block">
          <a className='b-registration_button' href={vendorClientRestorePasswordPath}>
            {t('vendor.client.restore_password')}
          </a>
        </div>
      </div>
    );
  }
}

ClientSessionNew.propTypes = {
  formAuthenticity: schemas.formAuthenticity.isRequired,
  t: PropTypes.func.isRequired,
  vendorClientSessionsPath: PropTypes.string.isRequired,
  vendorClientRegistrationPath: PropTypes.string.isRequired,
  phoneValue: PropTypes.string,
  clientRegistrationButtonText: PropTypes.string,
  vendorClientRestorePasswordPath: PropTypes.string.isRequired,
};

export default ClientSessionNew;
