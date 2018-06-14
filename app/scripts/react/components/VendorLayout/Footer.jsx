import React, { Component } from 'react'; import PropTypes from 'prop-types';
import { InstagramContainer } from 'rc/Instagram';
import MenuBottom from 'rc/MenuBottom';

class Footer extends Component {
  render() {
    const {
      customAfterContentHtml,
      i18n,
      menuBottomProps,
      showInstagramContainer,
    } = this.props;

    return (
      <div className="b-page__content__inner b-page__content__inner_footer">
        <div className="b-item-list">
          <InstagramContainer isVisible={showInstagramContainer} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: customAfterContentHtml }} />
        <footer className="b-footer">
          <div className="b-footer__container">
            <div className="b-footer__content">
              <MenuBottom {...menuBottomProps} i18n={i18n} />
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

Footer.propTypes = {
  customAfterContentHtml: PropTypes.string,
  i18n: PropTypes.object,
  menuBottomProps: PropTypes.shape(...MenuBottom.wrapped.propTypes).isRequired,
  showInstagramContainer: PropTypes.bool,
};

Footer.defaultProps = {
  showInstagramContainer: false,
};

export default Footer;
