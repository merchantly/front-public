import React, { Component, PropTypes } from 'react';
import MenuTop from 'rc/MenuTop';
import Userbar, {
  externalPropTypes as userbarPropTypes,
} from 'rc/Userbar';
import { Clientbar } from 'rc/Clientbar';
import provideTranslations from 'rc/HoC/provideTranslations';
import { connect } from 'react-redux';

class WidgetLayout extends Component {
  render() {
    const {
      children,
      i18n,
      clientBarProps,
      menuTopProps,
      showClientBar,
      showMenuTop,
      t,
      userbarProps,
    } = this.props;

    return (
      <div className="b-page__content b-page--widget">
        <div className="b-page__content__inner b-page__content__inner_navbar">
          {showClientBar && <Clientbar {...clientBarProps} t={t} />}
          {showMenuTop && <MenuTop {...menuTopProps} i18n={i18n} />}
        </div>
        <div className="b-page__content__inner b-page__content__inner_content">
          {children}
        </div>
        <Userbar {...userbarProps} i18n={i18n} />
      </div>
    );
  }
}

WidgetLayout.propTypes = {
  children: PropTypes.element,
  clientBarProps: PropTypes.shape(Clientbar.propTypes),
  i18n: PropTypes.object,
  menuTopProps: PropTypes.shape(...MenuTop.wrapped.propTypes),
  showClientBar: PropTypes.bool,
  showMenuTop: PropTypes.bool,
  t: PropTypes.func.isRequired,
  userbarProps: PropTypes.shape(userbarPropTypes).isRequired,
};

WidgetLayout.defaultProps = {
  clientBarProps: {
    cartUrl: '/cart',
    showFullBasketCount: false,
  },
  showClientBar: true,
};

export default provideTranslations(connect(
  (state, ownProps) => Object.assign({}, state.layout, ownProps)
)(WidgetLayout));
