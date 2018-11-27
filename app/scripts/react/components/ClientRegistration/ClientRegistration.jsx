import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormAuthenticity from 'rc/common/FormAuthenticity';
import provideTranslations from 'rc/HoC/provideTranslations';
import * as schemas from 'r/schemas';
import Select from '../common/Select';
import MaskedInput from 'react-maskedinput'

class ClientRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      occupationId: props.inputFields['occupation_id'].value,
    };
  }

  changeOccupation(occupationId) {
    this.setState({ occupationId: occupationId });
  }

  render() {
    const {
      formAuthenticity,
      t,
      timeout,
      vendorRegistrationPath,
      inputFields,
      occupations
    } = this.props;

    const {
      occupationId,
    } = this.state

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
                  id="client_registration_form_name"
                  name="client_registration_form[name]"
                  placeholder={t('vendor.client.placeholders.name')}
                  type="text"
                  defaultValue={inputFields['name'].value}
                />
                {inputFields['name'].errorMessage &&
                  <span className="help-block">{inputFields['name'].errorMessage}</span>
                }
              </div>
            </div>
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <MaskedInput
                  id="client_registration_form_phone"
                  name="client_registration_form[phone]"
                  type="text"
                  defaultValue={inputFields['phone'].value}
                  mask="+7(111)-111-11-11"
                />
                {inputFields['phone'].errorMessage &&
                  <span className="help-block">{inputFields['phone'].errorMessage}</span>
                }
              </div>
            </div>
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <input
                  id="client_registration_form_email"
                  name="client_registration_form[email]"
                  placeholder={t('vendor.client.placeholders.email')}
                  type="text"
                  defaultValue={inputFields['email'].value}
                />
                {inputFields['email'].errorMessage &&
                  <span className="help-block">{inputFields['email'].errorMessage}</span>
                }
              </div>
            </div>
            {inputFields['occupation_name'].presence &&
              <div className="b-form__row__widget">
                <div className="form-group-first">
                  {occupations.length ? (
                    <div className='b-item-full__form__option  b-item-full__form__option_full b-item-full__form__option_pln'>
                      <Select
                        name="client_registration_form[occupation_id]"
                        options={occupations.map((i) => ({ value: i.id, title: i.name, }))}
                        onChange={this.changeOccupation.bind(this)}
                        value={occupationId}
                      />
                      {inputFields['occupation_id'].errorMessage &&
                        <span className="help-block">{inputFields['occupation_id'].errorMessage}</span>
                      }
                    </div>
                  ) : (
                    <div>
                      <input
                        id="client_registration_form_occupation_name"
                        name="client_registration_form[occupation_name]"
                        placeholder={t('vendor.client.placeholders.occupation')}
                        type="text"
                        defaultValue={inputFields['occupation_name'].value}
                      />
                      {inputFields['occupation_name'].errorMessage &&
                        <span className="help-block">{inputFields['occupation_name'].errorMessage}</span>
                      }
                    </div>
                  )}
                </div>
              </div>
            }
            {inputFields['company_name'].presence &&
              <div className="b-form__row__widget">
                <div className="form-group-first">
                  <input
                    id="client_registration_form_company_name"
                    name="client_registration_form[company_name]"
                    placeholder={t('vendor.client.placeholders.company_name')}
                    type="text"
                    defaultValue={inputFields['company_name'].value}
                  />
                  {inputFields['company_name'].errorMessage &&
                    <span className="help-block">{inputFields['company_name'].errorMessage}</span>
                  }
                </div>
              </div>
            }
            <div className="b-form__row__widget">
              <input
                className="b-btn"
                name="commit"
                type="submit"
                value={t('vendor.client.registration_submit')}
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
  inputFields: PropTypes.object,
  occupations: PropTypes.arrayOf(PropTypes.object),
};

export default provideTranslations(ClientRegistration);
