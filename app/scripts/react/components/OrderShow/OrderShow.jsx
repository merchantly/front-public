import React, { Component } from 'react'; import PropTypes from 'prop-types';
import OrderContents from 'rc/common/Order/OrderContents';
import OrderState from 'rc/common/Order/OrderState';
import OrderComments from 'rc/common/Order/OrderComments';
import { humanizedMoneyWithCurrency } from 'r/helpers/money';
import * as schemas from 'r/schemas';

class OrderShow extends Component {
  render() {
    const {
      order,
      t,
    } = this.props;
    const {
      externalId,
      orderDelivery,
      deliveryType={},
      freeDelivery,
      freeDeliveryThreshold,
      mustBePaidOnline,
      paymentUrl,
      paymentType={},
      workflowState,
      adminComments,
      deliveryComment
    } = order;
    const {
      trackingId,
      trackingUrl,
    } = (orderDelivery || {});
    const freeDeliveryMessage = freeDelivery
      ? t('vendor.order.free_delivery_text_html', {
        'free_delivery_threshold': humanizedMoneyWithCurrency(freeDeliveryThreshold),
      })
      : null;

    return (
      <section className="b-cart">
        <div className="b-cart__content">
          <h1 className="b-cart__title">
            {t('vendor.order.title', { number: externalId })}
          </h1>
          <div className="b-cart__message">
            {deliveryComment && <div className="alert alert-warning">{deliveryComment}</div>}
            <OrderComments comments={adminComments} />
            <p>
              <OrderState state={workflowState} />
              <br />
              <br />
              {t('vendor.order.payment_type', { title: paymentType.title })}
              <br />
              {t('vendor.order.delivery_type', { title: deliveryType.title })}
              {freeDelivery && (
                <span>
                  <br />
                  <span dangerouslySetInnerHTML={{ __html: freeDeliveryMessage }} />
                </span>
              )}
              <br />
              {trackingId && t('vendor.order.delivery_tracking_id', {
                number: trackingId,
              })}
            </p>
            {trackingUrl && (
              <a
                className="b-btn"
                href={trackingUrl}
                target="_blank"
              >
                {t('vendor.order.check_state')}
              </a>
            )}
            {mustBePaidOnline && (
              <a
                className="b-btn"
                href={paymentUrl}
                target="_blank"
              >
                {t('vendor.order.pay')}
              </a>
            )}
          </div>
        </div>
        <OrderContents order={order} t={t} />
      </section>
    );
  }
}

OrderShow.propTypes = {
  order: schemas.order.isRequired,
  t: PropTypes.func.isRequired,
};

export default OrderShow;
