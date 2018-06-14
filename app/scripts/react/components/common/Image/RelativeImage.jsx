import React, { Component } from 'react'; import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import * as schemas from '../../../schemas';
import Image from './Image';

class RelativeImage extends Component {
  state = {
    height: null,
    width: null,
  }
  componentDidMount() {
    this.setRelativeSize(this.props.maxHeight, this.props.maxWidth);
  }
  shouldImageBeFixed(image, height, width) {
    if (!image) {
      return false;
    }

    return Boolean((image.width && image.height) && (height || width));
  }
  getParentWithSize(elt) {
    let current = elt;

    while (current.parentNode) {
      current = current.parentNode;

      if (current.offsetHeight || current.offsetWidth) {
        return current;
      }
    }

    return null;
  }
  setRelativeSize(maxHeight, maxWidth) {
    const elt = findDOMNode(this);
    const parent = this.getParentWithSize(elt);

    this.setState({
      height: parent ? parent.offsetHeight : maxHeight,
      width: parent ? parent.offsetWidth : maxWidth,
    });
  }
  render() {
    const { height, width } = this.state;
    const { image } = this.props;

    if (height || width) {
      return (
        <Image
          {...this.props}
          hasFixedSize={this.shouldImageBeFixed(image, height, width)}
          maxHeight={height}
          maxWidth={width}
        />
      );
    }

    return <span />;
  }
}

RelativeImage.propTypes = {
  image: schemas.image,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
};

RelativeImage.defaultProps = {
  maxHeight: null,
  maxWidth: null,
};
// Для Firefox: Обертываем компонент в div
// по умолчанию <span> и <a> display: inline
// и тогда не правильно считается parent.offsetHeight, parent.offsetWidth
class RelativeImageWrapper extends Component {
  render() {
    return (
      <div>
        <RelativeImage {...this.props} />
      </div>
    )
  }
}

export default RelativeImageWrapper;