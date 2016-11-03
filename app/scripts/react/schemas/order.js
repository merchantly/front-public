import { PropTypes } from 'react';
import comment from './comment';
import orderItem from './orderItem';
import money from './money';
import good from './good';

const {
  shape,
  arrayOf,
  string,
  bool,
  number,
  object,
} = PropTypes;

export default shape({
  externalId: number,
  defaultUrl: string.isRequired, // vendor_order_path(order.external_id)
  freeDelivery: bool,
  freeDeliveryThreshold: money,
  orderDelivery: shape({
    trackingId: string,
    trackingUrl: string,
  }),
  deliveryPrice: money,
  deliveryType: shape({
    title: string,
    selfdelivery: bool,
    pickupAddress: string,
  }),
  mustBePaidOnline: bool,
  paymentUrl: string,
  paymentType: shape({
    title: string,
    type: string.isRequired,
  }),
  workflowState: shape({
    bgStyle: object.isRequired,
    title: string,
    color: string,
  }),
  adminComments: arrayOf(comment),
  items: arrayOf(orderItem).isRequired,
  packageGood: good,
  packagePrice: money,
  totalWithDeliveryPrice: money.isRequired,
  phone: string,
  coupon: shape({
    discount: number,
    fixed: bool,
    fixedDiscount: money,
    freeDelivery: bool,
  }),
});
