import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class DesignSettingsSaveButton extends Component {
  static propTypes = {
    isSaving: PropTypes.bool.isRequired,
    unsavedFields: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
  }
  hasChanges() {
    return !!Object.keys(this.props.unsavedFields).length;
  }
  getTitle() {
    if (this.props.isSaving) {
      return 'Сохраняем...';
    } else {
      return this.hasChanges() ? 'Сохранить' : 'Изменений нет';
    }
  }
  handleClick() {
    if (this.hasChanges()) {
      this.props.onClick();
    }
  }
  render() {
    const buttonClasses = classNames('design-settings__save-button', {
      '__disabled': !this.hasChanges(),
    });
    return (
      <button
        className={buttonClasses}
        onClick={this.handleClick.bind(this)}
      >
        {this.getTitle()}
      </button>
    );
  }
}
