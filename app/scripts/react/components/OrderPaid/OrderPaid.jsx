import React, { Component, PropTypes } from 'react';
import OrderContents from 'rc/common/Order/OrderContents';
import OrderComments from 'rc/common/Order/OrderComments';
import OrderState from 'rc/common/Order/OrderState';
import * as schemas from 'r/schemas';

class OrderPaid extends Component {
  render() {
    const {
      isCurrentClientPresent,
      order,
      t,
      vendorRootPath,
    } = this.props;
    const {
      externalId,
      adminComments,
      orderDelivery,
      workflowState,
    } = order;
    const {
      trackingUrl,
      trackingId,
    } = (orderDelivery || {});

    return (
      <section className="b-cart">
        <div className="b-cart__content">
          <h1 className="b-cart__title">
            {t('vendor.order.title', { number: externalId })}
            <OrderState state={workflowState} />
          </h1>
          <div className="b-cart__message">
            <OrderComments comments={adminComments} />
            <p>
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
            {!isCurrentClientPresent && (
              <a
                className="b-btn"
                href={vendorRootPath}
              >
                {t('vendor.order.continue_shopping')}
              </a>
            )}
          </div>
        </div>
        <OrderContents order={order} t={t} />
      </section>
    );
  }
}

OrderPaid.propTypes = {
  isCurrentClientPresent: PropTypes.bool.isRequired,
  order: schemas.order.isRequired,
  t: PropTypes.func.isRequired,
  vendorRootPath: PropTypes.string,
};

OrderPaid.defaultProps = {
  isCurrentClientPresent: false,
};

export default OrderPaid;
