import React, { Component, PropTypes} from 'react';

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
      notAvailableLinks
    } = this.props;

    return (
      <div className="b-item-full__form__row b-item-full__form__row_fixed">
        <div className="b-item-full__form__submit">
          <div className="b-btn b-btn_trans" onClick={this.showModal}>
            {this.props.t('vendor.product.not_available')}
          </div>
        </div>
        <ProductCartWishlist t={this.props.t} product={this.props.product} />
        {notAvailableLinks && (
          <Rodal
            onClose={this.hideModal}
            visible={this.state.modalVisible}
          >
            <div className="b-modal__container">
              <div className="b-modal__spinner-container">
                <ul className="b-not-available-links">
                  {notAvailableLinks.map(notAvailableLink => (
                    <li className="b-not-available-link">
                      <a href={notAvailableLink.url}> {notAvailableLink.title} </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Rodal>
        )}
      </div>
    );
  }
}