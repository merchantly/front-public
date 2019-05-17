import store from 'store';
import diff from 'deep-diff';
import createReducer from '../utils/createReducer';
import createObjectUrl from '../utils/createObjectUrl';
import * as actionTypes from '../constants/actionTypes';
import * as storageKeys from '../constants/storageKeys';
import { merge, mergeIn, set, setIn, omit, getIn } from 'timm';

const current = {
  activeElementsColor: '#000000',
  mainPageProductsInRow: 2,
  mainPageRows: 5,
  mainPageInstagram: true,
  mainPageSlider: false,
  mainPageBanner: true,
  mainPageFilter: true,
  categoryPageProductsInRow: 2,
  categoryPageRows: 5,
  categoryPageFilter: true,
  productPagePhoto: 'aside',
  showSimilarProducts: true,
  // productPageSimilarProducts: 'off',
  logoUrl: null,
  pageBgUrl: null,
  pageBgColor: '#6c7a89',
  feedBgColor: '#000000',
  feedTransparency: .7,
  fontColor: '#000000',
  fontFamily: 'helvetica',
  fontSize: 'md',
};

const initialState = {
  current: current,
  currentSaved: current,
  unsavedFields: {},
  isSaving: false,
};

function getUnsavedFields(currentSaved, current) {
  return Object.keys(current).reduce((prev, key) => {
    if (currentSaved[key] !== current[key]) {
      return { ...prev, [key]: current[key] };
    }
    return prev;
  }, {});
}

export default createReducer(initialState, {
  [actionTypes.POPUP_CLOSE](state) {
    const currentSaved = state.currentSaved;

    return merge(state, {
      current: currentSaved,
      unsavedFields: {},
      isSaving: false,
    });
  },
  [actionTypes.DESIGN_INIT](state) {
    const currentSaved = state.current;
    const currentCached = store.get(storageKeys.DESIGN_CURRENT);

    if (currentCached && diff(currentSaved, currentCached)) {
      return merge(state, {
        current: currentCached,
        unsavedFields: getUnsavedFields(currentSaved, currentCached),
      });
    } else {
      return state;
    }
  },
  [actionTypes.DESIGN_CHANGE_OPTION](state, { name, value }) {
    let unsavedFields = state.unsavedFields;

    if (getIn(state, ['currentSaved', name]) !== value) {
      unsavedFields = set(unsavedFields, name, value);
    } else {
      unsavedFields = omit(unsavedFields, name);
    }

    return set(
      setIn(state, ['current', name], value),
      'unsavedFields',
      unsavedFields
    );
  },
  [actionTypes.DESIGN_CHANGE_ATTACHMENT_OPTION](state, { name, file }) {
    let unsavedFields = state.unsavedFields;

    if (getIn(state, ['currentSaved', name]) !== file) {
      unsavedFields = set(unsavedFields, name, file);
    } else {
      unsavedFields = omit(unsavedFields, name);
    }

    return set(
      mergeIn(state, ['current'], {
        [`${name}Url`]: file ? createObjectUrl(file) : file,
        [`${name}File`]: file,
      }),
      'unsavedFields',
      unsavedFields
    );
  },
  [actionTypes.DESIGN_SAVE](state) {
    return set(state, 'isSaving', true);
  },
  [actionTypes.DESIGN_SAVE_FAILURE](state) {
    return set(state, 'isSaving', false);
  },
  [actionTypes.DESIGN_SAVE_SUCCESS](state, { design }) {
    store.remove(storageKeys.DESIGN_CURRENT);

    return merge(state, {
      current: design,
      currentSaved: design,
      unsavedFields: {},
      isSaving: false,
    });
  },
});
