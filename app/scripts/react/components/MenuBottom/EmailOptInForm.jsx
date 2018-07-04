import $ from 'jquery';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { subscriptionEmails } from '../../../routes/api';
import { isEmpty } from 'lodash';

class EmailOptInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: null,
      success: false,
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.processResponse = this.processResponse.bind(this);
  }
  processResponse(res) {
    const {
      t,
    } = this.props;

    if (isEmpty(res.errors)) {
      if (res.id) {
        this.setState({ success: true });
      } else {
        this.setState({ error: t('vendor.subscription_email.unknown_error')});
      }
    } else {
      this.setState({ error: res.errors[Object.keys(res.errors)[0]][0]});
    }
  }
  handleChangeEmail(ev) {
    this.setState({ email: ev.target.value });
  }
  handleSubmitForm(ev) {
    const {
      email,
      success,
    } = this.state;
    ev.preventDefault();

    if (success) {
      return;
    }

    this.setState({ error: null });
    $.ajax({
      url: subscriptionEmails(),
      data: {
        email,
      },
      method: 'post',
    })
    .then(this.processResponse)
    .fail(this.processResponse);
  }
  render() {
    const {
      t,
    } = this.props;
    const {
      email,
      error,
      success,
    } = this.state;

    return (
      <div className="b-optin_container">
        <div className="b-optin_title">
          {t('vendor.subscription_email.title')}
        </div>
        <div className="b-optin_text">
          {t('vendor.subscription_email.text')}
        </div>
        {success && (
          <div className="b-optin_email-success">
            {t('vendor.subscription_email.success_text')}
          </div>
        )}
        {!success && (
          <form onSubmit={this.handleSubmitForm}>
            <input
              className="b-optin_email-input"
              onChange={this.handleChangeEmail}
              type="text"
              value={email}
            />
            <div className="b-optin_email-error">
              {error}
            </div>
            <button className="b-btn b-btn_sm b-optin_submit-button element--active-opacity">
              {t('vendor.subscription_email.submit_button_text')}
            </button>
          </form>
        )}
      </div>
    );
  }
}

EmailOptInForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default EmailOptInForm;
