import React, { Component } from 'react'; import PropTypes from 'prop-types';
import ProductList from 'rc/ProductList/ProductList';

class DictionaryEntitiesShow extends Component {
  render() {
    const {
      entity,
      nextButton,
      products,
      showNextButton,
      t,
      title,
      vendorRootPath,
    } = this.props;

    return products.items.length
      ? (
        <ProductList
          container={entity}
          nextButton={nextButton}
          products={products}
          showNextButton={showNextButton}
          showPagination
          title={title}
        />
      )
      : (
        <div className="b-text b-text_center">
          <p>
            {t('vendor.dictionary_entity.empty')}
          </p>
          <a className="b-btn" href={vendorRootPath}>
            {t('vendor.dictionary_entity.continue_shopping')}
          </a>
        </div>
      );
  }
}

DictionaryEntitiesShow.propTypes = {
  entity: PropTypes.object.isRequired,
  nextButton: PropTypes.object,
  products: PropTypes.object.isRequired,
  showNextButton: PropTypes.bool,
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
  vendorRootPath: PropTypes.string,
};

export default DictionaryEntitiesShow;
