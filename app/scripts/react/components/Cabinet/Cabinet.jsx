import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CabinetOrder from './CabinetOrder';
import Pagination from 'rc/Pagination';
import ClientForm from './ClientForm';
import CompanyForm from './CompanyForm';
import * as schemas from 'r/schemas';

class Cabinet extends Component {
  render() {
    const {
      client: {
        name,
        phones,
        emails,
        logoutUrl,
        resetPasswordUrl,
      },
      orders: {
        pagination,
        items,
      },
      clientForm,
      companyForm,
      t,
    } = this.props;

    return (
      <div className="b-page__content__inner b-page__content__inner_content">
        <section className="b-cart">
          <div className="b-cabinet b-cart__content">
            <div className="b-cabinet__title">
              <div className='row'>
                <div className='col-md-4'>
                  <h2>{t('vendor.client.cabinet.title', { name: name })}</h2>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-2'>
                  <a className='btn btn-info' href={resetPasswordUrl}>
                    {t('vendor.client.reset_password')}
                  </a>
                </div>
                <div className='col-md-1'>
                  <a className='btn btn-warning' href={logoutUrl}>
                    {t('vendor.client.logout')}
                  </a>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-3'>
                  <h4>{t('vendor.client.cabinet.phones')}</h4>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <table className='table table-striped'>
                    <tbody>
                      {
                        phones.map((phone) => (
                          <tr>
                            <td>{phone.value}</td>
                            <td>{phone.isConfirmed ? t('vendor.client.confirmed') : t('vendor.client.no_confirmed')}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-3'>
                  <h4>{t('vendor.client.cabinet.emails')}</h4>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <table className='table table-striped'>
                    <tbody>
                      {
                        emails.map((email) => (
                          <tr>
                            <td>{email.value}</td>
                            <td>{email.isConfirmed ? t('vendor.client.confirmed') : t('vendor.client.no_confirmed')}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {items.length ? (
              <div>
                <div className="b-cabinet__orders_title">{t('vendor.client.cabinet.orders')}</div>
                <ul className="b-cart__list">
                  {items.map((order) => <CabinetOrder {...order} key={order.id} />)}
                </ul>
                <Pagination {...pagination} />
              </div>
            ) : (
              <div className="b-text b-text_center">
                <p>
                  {t('vendor.orders.empty')}
                </p>
              </div>
            )}
            <ClientForm {...clientForm} t={t} />
            {companyForm && <CompanyForm {...companyForm} t={t} />}
          </div>
          <div className="b-cart__action" />
        </section>
      </div>
    );
  }
}

Cabinet.propTypes = {
  client: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phones: PropTypes.arrayOf(PropTypes.object).isOptional,
    emails: PropTypes.arrayOf(PropTypes.object).isOptional,
    logoutUrl: PropTypes.string.isRequired,
    resetPasswordUrl: PropTypes.string.isRequired,
  }).isRequired,
  orders: PropTypes.shape({
    pagination: PropTypes.object.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(...CabinetOrder.propTypes)).isOptional,
  }),
  clientForm: PropTypes.shape(...ClientForm.propTypes).isRequired,
  companyForm: PropTypes.shape(...CompanyForm.propTypes),
  t: PropTypes.func.isRequired,
};

export default Cabinet;
