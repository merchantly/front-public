import { PropTypes } from 'react';
import vendorContact from './vendorContact';
import slide from './slide';

const {
  arrayOf,
  shape,
  string,
} = PropTypes;

export default shape({
  contacts: arrayOf(vendorContact),
  custom_after_content_html: PropTypes.string,
  custom_append_html: PropTypes.string,
  title: string,
  search_products_path: string,
  pre_products_text: string,
  post_products_text: string,
  slider_images: arrayOf(slide),
});
