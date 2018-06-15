import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CatalogFilterExpandButton extends Component {
  handleExpand(ev) {
    ev.preventDefault();

    if (this.props.onExpand) {
      this.props.onExpand();
    }
  }
  handleTurn(ev) {
    ev.preventDefault();

    if (this.props.onTurn) {
      this.props.onTurn();
    }
  }
  render() {
    const { t } = this.props;

    if (!this.props.expanded) {
      return (
        <span
          className="b-full-filter__item__expand"
          onClick={this.handleExpand.bind(this)}
        >
          {t('vendor.filter.expand_button.expand')}
        </span>
      );
    }else{
      return (
        <span
          className="b-full-filter__item__expand"
          onClick={this.handleTurn.bind(this)}
        >
          {t('vendor.filter.expand_button.turn')}
        </span>
      );
    }
  }
}

CatalogFilterExpandButton.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onExpand: PropTypes.func.isRequired,
  onTurn: PropTypes.func.isRequired
};

export default CatalogFilterExpandButton;
