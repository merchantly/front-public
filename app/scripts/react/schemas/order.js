import { PropTypes } from 'prop-types';
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
  externalId: string,
  defaultUrl: string.isRequired, // vendor_order_path(order.external_id)
  invoceUrl: string,
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
    bgStyle: string,
    title: string,
    color: object.isRequired,
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
