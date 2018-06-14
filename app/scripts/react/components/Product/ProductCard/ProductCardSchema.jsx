import React, { Component } from 'react'; import PropTypes from 'prop-types';
import { schemaOrgMarkup } from '../../../helpers/product';

export default class ProductCardSchema extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
  }
  render() {
    return schemaOrgMarkup(this.props.product);
  }
}