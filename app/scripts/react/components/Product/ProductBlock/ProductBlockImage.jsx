import React, { Component, PropTypes } from 'react';
import { RelativeImage } from '../../common/Image';

class ProductBlockImage extends Component {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = {
      isHover: false,
    };
  }
  getCurrentImage() {
    const {
      indexImage,
      secondImage,
    } = this.props.product;
    const { isHover } = this.state;

    return isHover && secondImage ? secondImage : indexImage;
  }
  handleMouseEnter() {
    this.setState({ isHover: true });
  }
  handleMouseLeave() {
    this.setState({ isHover: false });
  }
  render() {
    const {
      maxWidth,
      product: {
        secondImage,
        title,
      },
    } = this.props;

    return (
      <span
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <RelativeImage
          className="b-item__pic"
          image={this.getCurrentImage()}
          maxWidth={maxWidth}
          title={title}
        />
        {secondImage
          ? (
            <span style={{ display: 'none!important' }}>
              <RelativeImage
                className="b-item__pic"
                image={secondImage}
                maxWidth={maxWidth}
                title={title}
              />
            </span>
          )
          : null
        }
      </span>
    );
  }
}

ProductBlockImage.propTypes = {
  product: PropTypes.object.isRequired,
  maxWidth: PropTypes.number,
};

ProductBlockImage.defaultProps = {
  maxWidth: 458,
};

export default ProductBlockImage;
