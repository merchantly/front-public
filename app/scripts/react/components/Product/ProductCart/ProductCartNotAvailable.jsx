import React, { Component, PropTypes} from 'react';
import Modal from 'react-modal';
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

    const modalCustomStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        letterSpacing: 'normal',
        wordSpacing: 'normal'
      }
    };

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
          <Modal
            onRequestClose={this.hideModal}
            isOpen={this.state.modalVisible}
            style={modalCustomStyles}
          >
            <div dangerouslySetInnerHTML={{__html: notAvailableContent}}>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}