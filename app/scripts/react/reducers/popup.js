import createReducer from '../utils/createReducer';
import * as actionTypes from '../constants/actionTypes';
import { addFirst, removeAt, updateIn } from 'timm';
import { findIndex } from 'lodash';

const initialState = {
  popups: [],
};

export default createReducer(initialState, {
  [actionTypes.POPUP_OPEN](state, { style, props }) {
    return updateIn(state, ['popups'], (ps) => {
      const idx = findIndex(ps, (p) => p.style === style);

      return (idx > -1)
        ? addFirst(removeAt(ps, idx), { style, props })
        : addFirst(ps, { style, props });
    });
  },
  [actionTypes.POPUP_CLOSE](state, { style }) {
    return updateIn(state, ['popups'], (ps) => {
      const idx = findIndex(ps, (p) => p.style === style);

      return (idx > -1)
        ? removeAt(ps, idx)
        : ps;
    });
  },
});
