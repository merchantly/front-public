import classNames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import uuid from 'uuid';

import AccordionItemBody from './AccordionItemBody';
import AccordionItemTitle from './AccordionItemTitle';

export default class AccordionItem extends Component {
  static propTypes = {
    bodyClassName: PropTypes.string,
    className: PropTypes.string,
    expanded: PropTypes.bool,
    onClick: PropTypes.func,
    title: PropTypes.string,
    titleClassName: PropTypes.string,
    titleColor: PropTypes.string,
    isShow: PropTypes.bool
  }
  defaultProps = {
    isShow: true
  }
  constructor(props) {
    super(props);

    this.state = {
      maxHeight: props.expanded ? 'none' : 0,
      overflow: props.expanded ? 'visible' : 'hidden',
    };
  }
  componentWillMount() {
    this.uuid = uuid.v4();
  }
  componentDidMount() {
    this.setMaxHeight();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.expanded !== this.props.expanded) {
      this.setMaxHeight();
    }
  }
  allowOverflow() {
    this.setState({ overflow: 'visible' });
  }
  setMaxHeight() {
    const { expanded, isShow } = this.props;
    if (isShow === false) {
      return;
    }

    const bodyNode = findDOMNode(this.refs.body);
    const images = bodyNode.querySelectorAll('img');

    if (images.length) {
      return this.preloadImages(bodyNode, images);
    }

    this.setState({
      maxHeight: expanded ? bodyNode.scrollHeight + 'px' : 0,
      overflow: 'hidden',
    });
  }
  preloadImages(node, images) {
    let imagesLoaded = 0;

    const imgLoaded = () => {
      imagesLoaded++;

      if (imagesLoaded === images.length) {
        this.setState({
          maxHeight: this.props.expanded ? node.scrollHeight + 'px' : 0,
          overflow: 'hidden',
        });
      }
    };

    for (let i = 0; i < images.length; i += 1) {
      const img = new Image();
      img.src = images[i].src;
      img.onload = img.onerror = imgLoaded;
    }
  }
  getProps() {
    const { className, expanded } = this.props;
    const props = {
      className: classNames('react-sanfona-item', className, {
        'react-sanfona-item-expanded': expanded
      }),
      role: 'tabpanel',
    };

    if (expanded) {
      props['aria-expanded'] = true;
    } else {
      props['aria-hidden'] = true;
    }

    return props;
  }
  render() {
    const {
      bodyClassName, children, onClick, title, titleColor, titleClassName, isShow
    } = this.props;
    const { maxHeight, overflow } = this.state;

    if (isShow === false) {
      return null;
    }

    return (
      <div {...this.getProps()} ref="item">
        <AccordionItemTitle
          onClick={onClick}
          title={title}
          titleClassName={titleClassName}
          titleColor={titleColor}
          uuid={this.uuid}
        />
        <AccordionItemBody maxHeight={maxHeight}
          bodyClassName={bodyClassName}
          overflow={overflow}
          ref="body"
          uuid={this.uuid}
        >
          {children}
        </AccordionItemBody>
      </div>
    );
  }
}
