import React, { Component, PropTypes } from 'react';
import OrderComments from 'rc/common/Order/OrderComments';
import OrderSelfDeliveryMessage from 'rc/common/Order/OrderSelfDeliveryMessage';
import { humanizedMoneyWithCurrency } from 'r/helpers/money';
import * as schemas from 'r/schemas';

class OrderCreated extends Component {
  render() {
    const {
      order,
      t,
      vendorRootPath,
    } = this.props;
    const {
      phone,
      externalId,
      defaultUrl, // vendor_order_path(order.external_id)
      adminComments,
      totalWithDeliveryPrice,
      freeDelivery,
      freeDeliveryThreshold,
      deliveryType,
    } = order;
    const message = t('vendor.order.created.desc_html', {
      phone,
      link: `<a href="${defaultUrl}">${externalId}</a>`,
      price: humanizedMoneyWithCurrency(totalWithDeliveryPrice),
    });
    const freeDeliveryMessage = freeDelivery
      ? t('vendor.order.free_delivery_text_html', {
        'free_delivery_threshold': humanizedMoneyWithCurrency(freeDeliveryThreshold),
      })
      : null;

    return (
      <section className="b-cart">
        <div className="b-cart__content">
          <h1 className="b-cart__title">
            {t('vendor.order.created.title')}
          </h1>
          <div className="b-cart__mesage">
            <OrderComments comments={adminComments} />
            <p>
              <a href={defaultUrl}>
                {t('vendor.order.title', { number: externalId })}
              </a>
            </p>
            <p dangerouslySetInnerHTML={{ __html: message }} />
            <p>
              <OrderSelfDeliveryMessage deliveryType={deliveryType} t={t} />
            </p>
            {freeDeliveryMessage && (
              <p dangerouslySetInnerHTML={{ __html: freeDeliveryMessage}} />
            )}
            <a className="b-btn" href={vendorRootPath}>
              {t('vendor.order.continue_shopping')}
            </a>
          </div>
        </div>
      </section>
    );
  }
}

OrderCreated.propTypes = {
  order: schemas.order.isRequired,
  t: PropTypes.func.isRequired,
  vendorRootPath: PropTypes.string.isRequired,
};

export default OrderCreated;
