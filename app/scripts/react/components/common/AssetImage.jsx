import React from 'react';
import PropTypes from 'prop-types';
import { withConfig } from 'r/contexts/ConfigContext';

function AssetImage({ src, config, ...restProps }) {
  const assetHost = config ? config.assetHost : '';
  const imageSrc = assetHost ? `//${assetHost}/${src}` : `/${src}`;

  return (
    <img {...restProps} src={imageSrc} />
  );
}

AssetImage.propTypes = {
  src: PropTypes.string.isRequired,
  config: PropTypes.shape({
    assetHost: PropTypes.string,
  }),
};

export default withConfig(AssetImage);
