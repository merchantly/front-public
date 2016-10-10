import React, { Component, PropTypes } from 'react';
import OrderState from 'rc/common/Order/OrderState';
import provideTranslations from 'rc/HoC/provideTranslations';

import { 
  OrderPaymentIcon, 
  OrderDeliveryIcon, 
  OrderReserveStateIcon,
  OrderPaymentStateIcon
} from '../common/Order/OrderIcons'

class CabinetOrder extends Component {
  render() {
    const {
      localId,
      workflowState,
      createdDate,
      title,
      clientOrderUrl,
      totalWithDeliveryPrice,
      cityTitle,
      deliveryName,
      itemsCount,
      payment,
      paymentType,
      paymentState,
      reservation,
      delivery,
      deliveryState,
      t
    } = this.props;

    return (
      <li className='b-cart__item'>
        <div className='b-cart__item__col-quantity'>
          {localId}

          <OrderState state={workflowState}/> 
          
          <div className='text-small.text-muted.m-t-sm'>
            {createdDate}
          </div>
        </div>

        <div className='b-cart__item__col-content'>
          <h2 className='b-cart__item__title'>
            <a href={clientOrderUrl}>
              {title}
            </a>
          </h2>
          {itemsCount > 0 &&
            (<small className='text-muted'>
              {t('vendor.cabinet_order.items_count', {itemsCount: itemsCount})}
            </small>)
          }
        </div>

        <div className='b-cart__item__col-price'>
          <div className='b-cart__item__price'>
            <a href={clientOrderUrl}>
              {totalWithDeliveryPrice}
            </a>
          </div>
          <OrderPaymentIcon orderPaymentType={paymentType} {...payment}/>
          <OrderPaymentStateIcon orderPaymentType={paymentType} orderPaymentState={paymentState} {...payment} />
        </div>

        <div className='b-cart__item__col-quantity'>
          <div className='b-cart__item__quantity__text'>
            {cityTitle}
            {deliveryName}
          </div>
         <OrderReserveStateIcon {...reservation} />
         <OrderDeliveryIcon {...delivery} />
        </div>
      </li>
    );
  }
}

CabinetOrder.propTypes = {
  id: PropTypes.number.isRequired,
  localId: PropTypes.string.isRequired,
  workflowState: OrderState.propTypes.state,
  createdDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  clientOrderUrl: PropTypes.string.isRequired,
  totalWithDeliveryPrice: PropTypes.number.isRequired,
  cityTitle: PropTypes.string.isRequired,
  deliveryName: PropTypes.string.isRequired,
  itemsCount: PropTypes.number.isRequired,
  payment: {
    type: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  },
  paymentType: PropTypes.string.isRequired,
  paymentState: PropTypes.string.isRequired,
  reservation: {
    type: PropTypes.string.isRequired,
    reservedAt: PropTypes.string.isRequired,
  },
  delivery: {
    state: PropTypes.string.isRequired,
  },
  deliveryState: PropTypes.string.isRequired,
};

export default provideTranslations(CabinetOrder);
