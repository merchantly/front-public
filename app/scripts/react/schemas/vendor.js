import { PropTypes } from 'prop-types';
import vendorContact from './vendorContact';
import slide from './slide';

const {
  arrayOf,
  shape,
  string,
} = PropTypes;

export default shape({
  contacts: arrayOf(vendorContact),
  customAfterContentHtml: PropTypes.string,
  customAppendHtml: PropTypes.string,
  title: string,
  searchProductsPath: string,
  preProductsText: string,
  postProductsText: string,
  sliderImages: arrayOf(slide),
});
