import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'rc/common/Image';
import * as schemas from 'r/schemas';

class ProductListContainerBottom extends Component {
  render() {
    const {
      container,
    } = this.props;

    return (        
      <div>
        {(container && container.bottomText) && (
          <div className="b-item-list__description">
            <div
              className="b-page__content__inner_content"
              dangerouslySetInnerHTML={{ __html: container.bottomText }}
            />
          </div>
        )}
      </div>
    );
  }
}

ProductListContainerBottom.propTypes = {
  container: schemas.container.isRequired, 
};

export default ProductListContainerBottom;