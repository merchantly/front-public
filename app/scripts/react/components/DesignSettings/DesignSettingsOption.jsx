import React, { Component } from 'react'; import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class DesignSettingsOption extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any.isRequired,
    inRow: PropTypes.bool,
    title: PropTypes.string,
  }
  render() {
    const { children, className, inRow, title } = this.props;
    const optionClasses = classNames(className, {
      'design-settings__option': true,
      'design-settings__option--row': inRow,
    });

    return (
      <div className={optionClasses}>
        {title &&
         <div className="design-settings__option-title">
           {title}
         </div>
        }
        <div className="design-settings__option-content">
          {children}
        </div>
      </div>
    );
  }
}