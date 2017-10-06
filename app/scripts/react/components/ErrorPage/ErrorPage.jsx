import React, { Component, PropTypes } from 'react';

class ErrorPage extends Component {
  render() {
    const {
      subject,
      content,
      phone,
      email,
    } = this.props;

    return (
      <div className="b-page__content__inner b-page__content__inner_content">
        <div className="b-text b-text_center">
          <div className="lead-icon">
            <i className="icon-tools"></i>
          </div>
          <h1 className="b-page__title b-page-error__title" dangerouslySetInnerHTML={{__html: subject}} />
          <p>
            { content }
            <br />
            <br />
            <a href='tel:{ phone }'>{ phone }</a>
            <span className="middot">&sdot;</span>
            <a href='mailto: { email }'>{ email }</a>
          </p>
        </div>
      </div>
    );
  }
}

ErrorPage.propTypes = {
  subject: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

ErrorPage.defaultProps = {
  phone: '8(800)77-55-661',
  email: 'support@kiiiosk.ru'
};

export default ErrorPage;
