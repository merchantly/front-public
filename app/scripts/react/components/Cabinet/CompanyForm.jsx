import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormAuthenticity from '../common/FormAuthenticity';
import HiddenInput from '../common/HiddenInput';
import * as schemas from 'r/schemas';

class ClientForm extends Component {
  render() {
    const {
      formAuthenticity,
      t,
      companyName,
      inn,
      kpp,
      ogrn,
      companyUpdatePath,
    } = this.props;    

    return (
      <div className="b-cart__content">
        <div className="b-form">
          <form
            acceptCharset="UTF-8"
            action={companyUpdatePath}
            method="post"
            noValidate
          >
            <FormAuthenticity {...formAuthenticity} />
            <HiddenInput name="_method" value="put" />
            <h2 className="form-title">
              {t('vendor.client.company_form.title')}
            </h2>
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <label className="string control-label" htmlFor={"client_company_name"}>
                  {t('vendor.client.titles.company_name')}
                </label>
                <input
                  id="client_city_title"
                  name="client[company_name]"
                  placeholder={t('vendor.client.placeholders.company_name')}
                  type="text"
                  defaultValue={companyName.value}
                />
                {companyName.errorMessage &&
                  <span className="help-block">{companyName.errorMessage}</span>
                }
              </div>
            </div>
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <label className="string control-label" htmlFor={"client_company_name"}>
                  {t('vendor.client.titles.inn')}
                </label>
                <input
                  id="client_city_title"
                  name="client[inn]"
                  placeholder={t('vendor.client.placeholders.inn')}
                  type="text"
                  defaultValue={inn.value}
                />
                {inn.errorMessage &&
                  <span className="help-block">{inn.errorMessage}</span>
                }
              </div>
            </div>
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <label className="string control-label" htmlFor={"client_company_name"}>
                  {t('vendor.client.titles.kpp')}
                </label>
                <input
                  id="client_city_title"
                  name="client[kpp]"
                  placeholder={t('vendor.client.placeholders.kpp')}
                  type="text"
                  defaultValue={kpp.value}
                />
                {kpp.errorMessage &&
                  <span className="help-block">{kpp.errorMessage}</span>
                }
              </div>
            </div>
            <div className="b-form__row__widget">
              <div className="form-group-first">
                <label className="string control-label" htmlFor={"client_company_name"}>
                  {t('vendor.client.titles.ogrn')}
                </label>
                <input
                  id="client_city_title"
                  name="client[ogrn]"
                  placeholder={t('vendor.client.placeholders.ogrn')}
                  type="text"
                  defaultValue={ogrn.value}
                />
                {ogrn.errorMessage &&
                  <span className="help-block">{ogrn.errorMessage}</span>
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
  companyName: PropTypes.shape({
    value: PropTypes.string,
    errorMessage: PropTypes.string,
  }),
  inn: PropTypes.shape({
    value: PropTypes.string,
    errorMessage: PropTypes.string,
  }),
  kpp: PropTypes.shape({
    value: PropTypes.string,
    errorMessage: PropTypes.string,
  }),
  ogrn: PropTypes.shape({
    value: PropTypes.string,
    errorMessage: PropTypes.string,
  }),
  formAuthenticity: schemas.formAuthenticity,
  companyUpdatePath: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default ClientForm;
