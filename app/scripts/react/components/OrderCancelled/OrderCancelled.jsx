import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrderComments from 'rc/common/Order/OrderComments';
import OrderContents from 'rc/common/Order/OrderContents';
import * as schemas from 'r/schemas';

class OrderCancelled extends Component {
  componentDidMount() {
    this.refs.state.setAttribute('style', this.props.order.workflowState.bgStyle);
  }
  render() {
    const {
      isCurrentClientPresent,
      order,
      t,
      vendorRootPath,
    } = this.props;
    const {
      publicId,
      workflowState: {
        bgStyle,
        title,
      },
      adminComments,
    } = order;

    return (
      <section className="b-cart">
        <div className="b-cart__content">
          <h1 className="b-cart__title">
            {t('vendor.order.title', { number: publicId })}
            <span className="label label-success" ref="state">
              {title}
            </span>
          </h1>
          <div className="b-cart__message">
            <OrderComments comments={adminComments} />

            {!isCurrentClientPresent && (
              <p>
                <a className="b-btn" href={vendorRootPath}>
                  {t('vendor.order.continue_shopping')}
                </a>
              </p>
            )}
          </div>
        </div>
        <OrderContents order={order} t={t} />
      </section>
    );
  }
}

OrderCancelled.propTypes = {
  isCurrentClientPresent: PropTypes.bool.isRequired,
  order: schemas.order.isRequired,
  t: PropTypes.func.isRequired,
  vendorRootPath: PropTypes.string,
};

OrderCancelled.defaultProps = {
  isCurrentClientPresent: false,
};

export default OrderCancelled;
