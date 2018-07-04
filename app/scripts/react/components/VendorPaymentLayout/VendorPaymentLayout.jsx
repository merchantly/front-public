import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from 'rc/Logo';
import W1Widget from 'rc/common/W1Widget';
import LayoutMessages from 'rc/common/LayoutMessages';
import * as schemas from 'r/schemas';

class VendorPaymentLayout extends Component {
  render() {
    const {
      children,
      flash,
      logoProps,
      vendor,
      w1ptEnabled,
    } = this.props;

    return (
      <div>
        <div className="b-page__content__inner b-page__content__inner_navbar">
          <header className="b-header">
            <div className="b-header__container">
              <div className="b-header__content">
                <div className="b-header__desc">
                  {'\u00a0'}
                </div>
                <div className="b-header__logo">
                  <Logo {...logoProps} />
                </div>
              </div>
            </div>
          </header>
          <div className="b-page__content__inner b-page__content__inner_content">
            <LayoutMessages flash={flash} />
            {children}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: vendor.customAppendHtml }} />
        <W1Widget w1ptEnabled={w1ptEnabled} />
      </div>
    );
  }
}

VendorPaymentLayout.propTypes = {
  children: PropTypes.element,
  flash: LayoutMessages.propTypes.flash,
  i18n: PropTypes.object,
  logoProps: PropTypes.shape(Logo.propTypes).isRequired,
  vendor: schemas.vendor.isRequired,
  w1ptEnabled: PropTypes.string,
};

export default VendorPaymentLayout;
