import React, { Component } from 'react'; import PropTypes from 'prop-types';

class ProductSearchForm extends Component {
  render() {
    const {
      searchProductsPath,
      searchQuery,
      t,
    } = this.props;

    return (
      <div className="b-search">
        <form action={searchProductsPath}>
          <input
            className="b-search__field"
            defaultValue={searchQuery}
            name="query"
            placeholder={t('vendor.placeholders.search')}
            type="text"
          />
          <button className="b-search__submit" type="submit" />
        </form>
      </div>
    );
  }
}

ProductSearchForm.propTypes = {
  searchProductsPath: PropTypes.string.isRequired,
  searchQuery: PropTypes.string,
  t: PropTypes.func.isRequired,
};

ProductSearchForm.defaultProps = {
  searchQuery: '',
};

export default ProductSearchForm;
