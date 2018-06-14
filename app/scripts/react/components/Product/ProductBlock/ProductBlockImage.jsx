import React, { Component } from 'react'; import PropTypes from 'prop-types';
import { RelativeImage } from '../../common/Image';

class ProductBlockImage extends Component {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = {
      showSecond: false
    };
  }
  getCurrentImage() {
    const { containerIsHover } = this.props;
    const {
      indexImage,
      secondImage,
    } = this.props.product;
    const {
      showSecond
    } = this.state;

    if (!secondImage) {
      return indexImage;
    }
    return (showSecond) ? secondImage : indexImage;
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.containerIsHover) {
      this.setState({ showSecond: false });
    }
  }
  changeHover(value) {
    if (value) {
      this.setState({ showSecond: true });
    }
  }
  handleMouseEnter() {
    this.changeHover(true);
  }
  handleMouseLeave() {
    this.changeHover(false);
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
  containerIsHover: PropTypes.bool,
};

ProductBlockImage.defaultProps = {
  maxWidth: 458,
  containerIsHover: false
};

export default ProductBlockImage;
