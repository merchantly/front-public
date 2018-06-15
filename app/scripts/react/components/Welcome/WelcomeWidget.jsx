import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WelcomeContainer from './index';
import WidgetLayout from 'rc/Widget/WidgetLayout';
import CatalogFilterContainer from 'rc/CatalogFilter';
import * as schemas from 'r/schemas';
import props from 'test/fixtures/widget/main.json';

class WelcomeWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isFetching: true,
    };
  }
  componentWillMount() {
    this.setState({ data: props, isFetching: false });
  }
  render() {
    const {
      catalogFilterProps,
      i18n,
      isFilterDirty,
      products,
      showCartButton,
      showCatalogFilter,
      showPaginationOnWelcome,
      showQuantity,
      showWelcomeSlider,
      vendor,
    } = this.state.data;

    return (
      <WidgetLayout>
        {this.state.isFetching
          ? (
            'Загружается...'
          )
          : (
            <WelcomeContainer
              catalogFilterProps={catalogFilterProps}
              i18n={i18n}
              isFilterDirty={isFilterDirty}
              products={products}
              showCartButton={showCartButton}
              showCatalogFilter={showCatalogFilter}
              showPaginationOnWelcome={showPaginationOnWelcome}
              showQuantity={showQuantity}
              showWelcomeSlider={showWelcomeSlider}
              vendor={vendor}
            />
          )
        }
      </WidgetLayout>
    );
  }
}

WelcomeWidget.propTypes = {
  catalogFilterProps: PropTypes.shape(...CatalogFilterContainer.propTypes),
  i18n: PropTypes.object,
  isFilterDirty: PropTypes.bool.isRequired,
  products: schemas.productList.isRequired,
  showCartButton: PropTypes.bool.isRequired,
  showCatalogFilter: PropTypes.bool.isRequired,
  showPaginationOnWelcome: PropTypes.bool.isRequired,
  showQuantity: PropTypes.bool.isRequired,
  showWelcomeSlider: PropTypes.bool.isRequired,
  vendor: schemas.vendor.isRequired,
};

export default WelcomeWidget;
