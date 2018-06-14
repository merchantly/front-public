import React, { Component } from 'react'; import PropTypes from 'prop-types';

class CatalogFilterSelectedOptions extends Component {
  render() {
    const { selectedOptions } = this.props;

    return (
      <li className="b-full-filter__item">
        <div className="b-full-filter__item__title">
          Текущий выбор
        </div>
        <div className="b-full-filter__widget">
          {
            selectedOptions.map((item, i) => (
              <a
                className="b-full-filter__value"
                href={item.url}
                key={i}
                dangerouslySetInnerHTML={{__html: item.name}}
              >
              </a>
            ))
          }
        </div>
      </li>
    );
  }
}

CatalogFilterSelectedOptions.propTypes = {
  selectedOptions: PropTypes.array.isRequired
};

export default CatalogFilterSelectedOptions;