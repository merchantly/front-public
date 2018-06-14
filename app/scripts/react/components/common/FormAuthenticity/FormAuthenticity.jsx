import React, { Component } from 'react'; import PropTypes from 'prop-types';
import HiddenInput from '../HiddenInput';
import CSRFToken from '../CSRFToken';

class FormAuthenticity extends Component {
  render() {
    const {
      field,
      token,
      method,
     } = this.props;

    return (
      <div style={{ display: 'none!important'}}>
        <HiddenInput name="utf8" value="✓" />
        {method && <HiddenInput name="_method" value={method} />}
        <CSRFToken field={field} token={token} />
      </div>
    );
  }
}

FormAuthenticity.propTypes = {
  token: PropTypes.string,
  field: PropTypes.string,
  method: PropTypes.string,
};
FormAuthenticity.defaultProps = {
  token: null,
  field: 'authenticity_token',
};

export default FormAuthenticity;
