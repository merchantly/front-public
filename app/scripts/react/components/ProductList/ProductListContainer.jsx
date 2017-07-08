import React, { Component, PropTypes } from 'react';
import { Image } from 'rc/common/Image';
import * as schemas from 'r/schemas';

class ProductListContainer extends Component {
  render() {
    const {
      container,
    } = this.props;

    return (        
      <div>
        {container && container.image && (
          <div className="b-slider b-slider_promo">
            <div className="b-slider__item">
              <Image
                className="b-container-image"
                image={container.image}
                maxWidth={1000}
              />
            </div>
          </div>
        )}
        {container && container.description && (
          <div className="b-item-list__description">
            <div
              className="b-page__content__inner_content"
              dangerouslySetInnerHTML={{ __html: container.description }}
            />
          </div>
        )}
      </div>
    );
  }
}

ProductListContainer.propTypes = {
  container: schemas.container.isRequired,  
};

export default ProductListContainer;