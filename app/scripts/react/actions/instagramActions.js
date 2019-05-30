import reqwest from 'reqwest';
import { instagram } from '../../routes/api';

export function loadEntries(entriesLimit) {
  return reqwest({
    url: instagram(),
    type: 'json',
    data: {
      limit: entriesLimit,
    },
  });
}
