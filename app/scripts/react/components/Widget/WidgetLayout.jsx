import React, { Component, PropTypes } from 'react';
import NavBar, {
  externalPropTypes as navBarPropTypes,
} from 'rc/NavBar';
import MenuTop from 'rc/MenuTop';
import Userbar, {
  externalPropTypes as userbarPropTypes,
} from 'rc/Userbar';

class WidgetLayout extends Component {
  render() {
    const {
      children,
      navBarProps,
      menuTopProps,
      showClientBar,
      showMenuTop,
      t,
      userbarProps,
    } = this.props;

    return (
      <div className="b-page__content b-page--widget">
        <div className="b-page__content__inner b-page__content__inner_navbar">
          <NavBar {...navBarProps}
            showClientBar={showClientBar}
            t={t}
          />
          {showMenuTop && <MenuTop {...menuTopProps} />}
        </div>
        <div className="b-page__content__inner b-page__content__inner_content">
          {children}
        </div>
        <Userbar {...userbarProps} />
      </div>
    );
  }
}

WidgetLayout.propTypes = {
  children: PropTypes.element,
  menuTopProps: PropTypes.shape(...MenuTop.wrapped.propTypes),
  navBarProps: PropTypes.shape(navBarPropTypes).isRequired,
  showClientBar: PropTypes.bool,
  showMenuTop: PropTypes.bool,
  t: PropTypes.func,
  userbarProps: PropTypes.shape(userbarPropTypes).isRequired,
};

WidgetLayout.defaultProps = {

};

export default WidgetLayout;
