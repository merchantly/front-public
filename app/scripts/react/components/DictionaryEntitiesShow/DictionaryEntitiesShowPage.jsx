import React, { Component, PropTypes } from 'react';
import VendorLayoutContainer from 'rc/VendorLayout';
import DictionaryEntitiesShowContainer from './index';
import ProductList from 'rc/ProductList';

class DictionaryEntitiesShowPage extends Component {
  render() {
    const {
      entity,
      i18n,
      layoutProps,
      products,
      title,
      vendorRootPath,
      showNextButton,
      nextButton
    } = this.props;

    return (
      <VendorLayoutContainer {...layoutProps} i18n={i18n}>
        <DictionaryEntitiesShowContainer
          showNextButton={showNextButton}
          nextButton={nextButton}
          entity={entity}
          i18n={i18n}
          products={products}
          title={title}
          vendorRootPath={vendorRootPath}
        />
      </VendorLayoutContainer>
    );
  }
}

DictionaryEntitiesShowPage.propTypes = {
  entity: ProductList.wrapped.propTypes.container,
  i18n: PropTypes.object,
  layoutProps: PropTypes.shape(...VendorLayoutContainer.propTypes).isRequired,
  products: ProductList.wrapped.propTypes.products,
  title: PropTypes.string,
  vendorRootPath: PropTypes.string,
};

DictionaryEntitiesShowPage.defaultProps = {

};

export default DictionaryEntitiesShowPage;
