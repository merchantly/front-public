import React, { Component, PropTypes } from 'react';

class LayoutMessages extends Component {
  render() {
    const {
      flash,
    } = this.props;

    return flash && flash.length > 0
      ? (
        <div>
          {flash.map(({ name, msg }) => (
            <div className={`alert alert-${name}`}>
              <a className="close" data-dismiss="alert">
                {'\u00d7'}
              </a>
              <div id={`flash_${name}`}>
                {msg}
              </div>
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
