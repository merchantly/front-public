import React, { Component } from 'react'; import PropTypes from 'prop-types';
import { map } from 'lodash';

class GoodDetails extends Component {
  render() {
    const {
      details,
    } = this.props;

    return (
      <div>
        {map(details, (val, key) => (
          <div className="b-cart__item__option" key={`custom-attr-${key}`}>
            {`${key}: ${val}`}
          </div>
          ))
        }
      </div>
    );
  }
}

GoodDetails.propTypes = {
  details: PropTypes.object.isRequired,
};

GoodDetails.defaultProps = {
  details: {},
};

export default GoodDetails;
