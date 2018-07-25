import React, { Component, PropTypes} from 'react';
import Rodal from 'rodal';
import ProductCartWishlist from './ProductCartWishlist';

export default class ProductCartNotAvailable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ modalVisible: true });
  }

  hideModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    const {
      notAvailableContent
    } = this.props;

    return (
      <div>
        <div className="b-item-full__form__row b-item-full__form__row_fixed">
          <div className="b-item-full__form__submit">
            <div className="b-btn b-btn_trans" onClick={this.showModal}>
              {this.props.t('vendor.product.not_available')}
            </div>
          </div>
          <ProductCartWishlist t={this.props.t} product={this.props.product} />
        </div>
        {notAvailableContent && (
          <Rodal
            onClose={this.hideModal}
            visible={this.state.modalVisible}
          >
            <div className="b-modal__container" style={{letterSpacing: 'normal', wordSpacing: 'normal'}} dangerouslySetInnerHTML={{__html: notAvailableContent}}>
            </div>
          </Rodal>
        )}
      </div>
    );
  }
}