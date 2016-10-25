import createReducer from '../utils/createReducer';

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

export default createReducer(initialState, {});
