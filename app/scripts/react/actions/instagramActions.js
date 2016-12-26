import { instagram } from '../../routes/api';
// import reqwest from 'reqwest';

export function loadEntries(entriesLimit) {
  const reqwest = require('reqwest');

  return reqwest({
    url: instagram(),
    type: 'json',
    data: {
      limit: entriesLimit,
    },
  });
}
