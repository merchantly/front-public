import $ from 'jquery';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DOM_CHANGE } from '../../constants/globalEventKeys';

const STICKY_DETACH = 'sticky_kit:detach';
const STICKY_RECALC = 'sticky_kit:recalc';

class TopBanner extends Component {
  constructor(props) {
    super(props);

    this.recalcSticky = this.recalcSticky.bind(this);
  }
  componentDidMount() {
    const { parent } = this.props;
    const $topBanner = $(findDOMNode(this.refs.banner));

    $topBanner.stick_in_parent({ parent });
    $(document).on(DOM_CHANGE, this.recalcSticky);
  }
  componentWillUnmount() {
    const $topBanner = $(findDOMNode(this.refs.banner));

    $topBanner.trigger(STICKY_DETACH);
    $(document).off(DOM_CHANGE, this.recalcSticky);
  }
  recalcSticky() {
    $(document.body).trigger(STICKY_RECALC);
  }
  render() {
    const { content, url } = this.props;

    return (
      <div className="top-banner" ref="banner">
        {url
          ? <a className="top-banner__link" href={url}>
              <div className="top-banner__content">
                {content}
              </div>
            </a>
          : <div className="top-banner__content">
              {content}
            </div>
        }
      </div>
    );
  }
}

TopBanner.propTypes = {
  content: PropTypes.string.isRequired,
  parent: PropTypes.string,
  url: PropTypes.string,
};
TopBanner.defaultProps = {
  parent: '.b-page__content',
};

export default TopBanner;
