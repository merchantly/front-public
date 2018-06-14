import React, { Component } from 'react'; import PropTypes from 'prop-types';
import CabinetOrder from './CabinetOrder';
import Pagination from 'rc/Pagination';

class Cabinet extends Component {
  render() {
    const {
      client: {
        name,
        phones,
        emails,
        logoutUrl,
      },
      orders: {
        currentPage,
        totalPages,
        items,
      },
      t,
    } = this.props;

    return (
      <div className="b-page__content__inner b-page__content__inner_content">
        <section className="b-cart">
          <div className="b-cabinet b-cart__content">
            <div className="b-cabinet__title">
              {t('vendor.client.cabinet.title')}
              {' '}
              {name}
              {' '}
              {phones.join('\n')}
              {' '}
              {emails.join('\n')}
              {' '}
              <a className="pull-right" href={logoutUrl}>
                {t('vendor.client.logout')}
              </a>
            </div>
            {items ? (
              <div>
                <div className="b-cabinet__orders_title">{t('vendor.client.cabinet.orders')}</div>
                <ul className="b-cart__list">
                  {items.map((order) => <CabinetOrder {...order} key={order.id} />)}
                </ul>
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              </div>
              ) : (
              <div className="b-text b-text_center">
                <p>
                  {t('vendor.orders.empty')}
                </p>
              </div>
            )}
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
    phones: PropTypes.arrayOf(PropTypes.string).isOptional,
    emails: PropTypes.arrayOf(PropTypes.string).isOptional,
    logoutUrl: PropTypes.string.isRequired,
  }).isRequired,
  orders: PropTypes.shape({
    currentPage: Pagination.propTypes.currentPage,
    totalPages: Pagination.propTypes.totalPages,
    items: PropTypes.arrayOf(PropTypes.shape(...CabinetOrder.propTypes)).isOptional,
  }),
  t: PropTypes.func.isRequired,
};

export default Cabinet;
