import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      publicId,
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
            {t('vendor.order.title', { number: publicId })}
            <span className="b-cart__state">
              <OrderState state={workflowState} />
            </span>
          </h1>
          <div className="b-cart__message">
            <OrderComments comments={adminComments} />
            <p>
              {trackingId && t('vendor.order.delivery_tracking_id', {
                number: trackingId,
              })}
            </p>
            <ul className="b-cart__actions">
            {trackingUrl && (
              <li className="b-cart__actions__element">
                <a
                  className="b-btn"
                  href={trackingUrl}
                  target="_blank"
                >
                  {t('vendor.order.check_state')}
                </a>
              </li>
            )}
            {!isCurrentClientPresent && (
              <li className="b-cart__actions__element">
                <a
                  className="b-btn"
                  href={vendorRootPath}
                >
                  {t('vendor.order.continue_shopping')}
                </a>
              </li>
              )}
            </ul>
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
