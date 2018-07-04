/*global gon */
import React from 'react';
import PropTypes from 'prop-types';

function AssetImage(props) {
  return (
    <img {...props}
      src={`//${gon.asset_host}/${props.src}`}
    />
  );
}

AssetImage.propTypes = {
  src: PropTypes.string.isRequired,
};

export default AssetImage;
