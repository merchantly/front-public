import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LayoutMessages extends Component {
  render() {
    const {
      flash,
    } = this.props;

    return flash && flash.length > 0
      ? (
        <div>
          {flash.map(({ name, msg }, idx) => (
            <div className={`alert alert-${name}`} key={`flash-item-${idx}`}>
              <a className="close" data-dismiss="alert">
                {'\u00d7'}
              </a>
              <div id={`flash_${name}`} dangerouslySetInnerHTML={{__html: msg}} />
            </div>
          ))}
        </div>
      )
      : null;
  }
}

LayoutMessages.propTypes = {
  flash: PropTypes.arrayOf(PropTypes.shape({
    msg: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
};

export default LayoutMessages;
