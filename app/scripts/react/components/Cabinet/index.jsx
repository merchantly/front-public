import React, { PropTypes } from 'react';
import { camelizeKeys } from 'humps';
import Cabinet from './Cabinet';
import provideTranslations from 'rc/HoC/provideTranslations';

function CabinetContainer(props) {
  return <Cabinet {...camelizeKeys(props)} t={props.t} />;
}

CabinetContainer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default provideTranslations(CabinetContainer);
