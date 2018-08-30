import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function FaIcon({ name, addClass, ...opts }) {
  const extraClasses = name.split(' ').map((c) => `fa-${c}`);

  return <i className={classNames('fa', extraClasses, addClass)} {...opts} />;
}

FaIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FaIcon;
