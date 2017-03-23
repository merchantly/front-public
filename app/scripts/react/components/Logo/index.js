import React, { Component, PropTypes } from 'react';

class Logo extends Component {
  static propTypes = {
    linkUrl: PropTypes.string.isRequired,
    logoText: PropTypes.string.isRequired,
    logoUrl: PropTypes.string,
    imageAlt: PropTypes.string,
    isLogoLink: PropTypes.bool
  }
  static defaultProps = {
    isLogoLink: true
  }
  render() {
    const { isLogoLink } = this.props;
    if (!isLogoLink) {
      return this.renderContent(this.props.logoUrl, this.props.logoText, this.props.imageAlt);
    }
    return (
      <a href={this.props.linkUrl} className="b-logo">
        {this.renderContent(this.props.logoUrl, this.props.logoText, this.props.imageAlt)}
      </a>
    );
  }
  renderContent(logoUrl, logoText, imageAlt) {
    return logoUrl
      ? <img src={logoUrl} alt={imageAlt} />
      : <span className="b-logo__text">{logoText}</span>;
  }
}

export default Logo;
