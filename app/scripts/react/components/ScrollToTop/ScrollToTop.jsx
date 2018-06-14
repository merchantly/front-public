import React, { Component } from 'react'; import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getElt } from '../../helpers/dom';
import Icon from '../common/Icon';

class ScrollToTop extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.updateVisibility = this.updateVisibility.bind(this);

    this.state = {
      isVisible: false,
    };
  }
  componentDidMount() {
    const $container = this.getContainer();
    $container.on('scroll', this.updateVisibility);
  }
  componentWillUnmount() {
    const $container = this.getContainer();
    $container.off('scroll', this.updateVisibility);
  }
  getContainer() {
    return $(getElt(this.props.containerSelector));
  }
  getScrollableContainer() {
    const $container = this.getContainer();
    return $container.get(0).self = $container.get(0) ? $('html, body') : $container;
  }
  updateVisibility() {
    const { offset } = this.props;
    const $container = this.getContainer();

    this.setState({
      isVisible: $container.scrollTop() > offset
    });
  }
  handleClick() {
    const { duration } = this.props;
    const $container = this.getScrollableContainer();

    $container.animate({ scrollTop: 0 }, duration);
  }
  render() {
    const { isVisible } = this.state;
    const buttonClasses = classNames({
      'ScrollToTop': true,
      'is-visible': isVisible,
      'element--active-opacity': true,
    });

    return (
      <div className={buttonClasses} onClick={this.handleClick}>
        <div className="ScrollToTop-content">
          <Icon name="scroll-to-top" />
        </div>
      </div>
    );
  }
}

ScrollToTop.propTypes = {
  containerSelector: PropTypes.string,
  duration: PropTypes.number,
  offset: PropTypes.number,
};
ScrollToTop.defaultProps = {
  containerSelector: 'window',
  duration: 1000,
  offset: 300,
};

export default ScrollToTop;