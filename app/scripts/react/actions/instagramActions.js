import { instagram } from '../../routes/api';

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
