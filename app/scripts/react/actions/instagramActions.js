import { instagram } from '../../routes/api';
import reqwest from 'reqwest';

export function loadEntries(entriesLimit) {
  return reqwest({
    url: instagram(),
    type: 'json',
    data: {
      limit: entriesLimit,
    },
  });
}
