/*global Bugsnag */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as schemas from 'r/schemas';

const CONTACT_TYPE_TEXT = 'text';
const CONTACT_TYPE_EMAIL = 'email';
const CONTACT_TYPE_PHONE = 'phone';

class NavBarContacts extends Component {
  renderContact(contact, idx) {
    const {
      type,
      value,
      link,
    } = contact;

    if (type === CONTACT_TYPE_TEXT) {
      return (
        <li key={`navbar-contact-${idx}`} itemprop="address" itemScope itemtype="https://schema.org/PostalAddress">
          <meta itemprop="addressLocality" content={value} />
          {value}
        </li>
      );
    } else if (type === CONTACT_TYPE_EMAIL) {
      return (
        <li key={`navbar-contact-${idx}`}>
          <a
            className="tel-link"
            href={link}
            itemprop="email"
          >
            {value}
          </a>
        </li>
      );
    } else if (type === CONTACT_TYPE_PHONE) {
      return (
        <li key={`navbar-contact-${idx}`}>
          <a
            className="tel-link text-nowrap"
            href={link}
            itemprop="telephone"
          >
            {value}
          </a>
        </li>
      );
    } else {
      if (typeof Bugsnag === 'object' && typeof Bugsnag.warn === 'function') {
        Bugsnag.warn('Неизвестный тип контакта', `Содержимое объекта: ${JSON.stringify()}`);
      }
      return null;
    }
  }
  render() {
    const {
      vendorContacts,
      vendorTitle,
    } = this.props;

    return (
      <div className="b-site-description" itemScope itemtype="https://schema.org/Organization">
        <div dangerouslySetInnerHTML={{ __html: vendorTitle }} />
        {vendorContacts.length > 0 && (
          <ul>
            {vendorContacts.map(this.renderContact)}
          </ul>
        )}
      </div>
    );
  }
}

NavBarContacts.propTypes = {
  vendorContacts: PropTypes.arrayOf(schemas.vendorContact).isRequired,
  vendorTitle: PropTypes.string.isRequired,
};

NavBarContacts.defaultProps = {
  vendorContacts: [],
  vendorTitle: '',
};

export default NavBarContacts;
