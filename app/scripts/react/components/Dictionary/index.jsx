import React from 'react';
import { camelizeKeys } from 'humps';
import Dictionary from './Dictionary';

function DictionaryContainer(props) {
  return <Dictionary {...camelizeKeys(props)} />;
}

export default DictionaryContainer;
