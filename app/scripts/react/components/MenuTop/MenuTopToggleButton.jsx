import React, { Component } from 'react'; import PropTypes from 'prop-types';
import classNames from 'classnames';

class MenuTopToggleButton extends Component {
  render() {
    const {
      isActive,
    } = this.props;
    const aClasses = classNames({
      'mmenu-open': true,
      'element--active-opacity': true,
      'mmenu-open_active': isActive,
    });

    return (
      <a 
        className={aClasses}
        href="#nav"
        id="navopen"
      >
        <span className="mmenu-open__tick mmenu-open__tick_f" />
        <span className="mmenu-open__tick mmenu-open__tick_s" />
        <span className="mmenu-open__tick mmenu-open__tick_t" />
      </a>
    );
  }
}

MenuTopToggleButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default MenuTopToggleButton;
