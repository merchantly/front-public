import React, { Component } from 'react'; import PropTypes from 'prop-types';
import { load } from '../../../actions/productCardActions';
import { ERROR_STATE, LOADING_STATE, READY_STATE } from './ProductCardContainer.constants';
import ProductCard from './ProductCard';

class ProductCardContainer extends Component {
  state = {
    currentState: this.isLoadingNeeded(this.props) ? LOADING_STATE : ERROR_STATE,
    productCard: null,
  }
  componentDidMount() {
    const {
      productId,
    } = this.props;

    if (this.isLoadingNeeded(this.props)) {
      load(productId)
        .then((productCard) => {
          this.setState({
            productCard,
            currentState: READY_STATE,
          });
        })
        .fail(() => {
          this.setState({
            currentState: ERROR_STATE,
          });
        });
    }
  }
  isLoadingNeeded(props) {
    return !!props.productId;
  }
  render() {
    const {
      currentState,
      productCard,
    } = this.state;

    switch(currentState) {
      case READY_STATE:
        return <ProductCard {...productCard} />;
      case LOADING_STATE:
        return <div className="mrch-ProductCard-loading">Loading...</div>;
      case ERROR_STATE:
        return <div>Loading error</div>;
      default:
        return null;
    }
  }
}

ProductCardContainer.propTypes = {
  productId: PropTypes.number,
};

export default ProductCardContainer;
