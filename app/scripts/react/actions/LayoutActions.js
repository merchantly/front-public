export const LAYOUT_REQUEST = 'LAYOUT_REQUEST';
export const LAYOUT_SUCCESS = 'LAYOUT_SUCCESS';
export const LAYOUT_FAILURE = 'LAYOUT_FAILURE';

export function initLayout(initProps) {
  return {
    type: LAYOUT_SUCCESS,
    response: initProps,
  };
}
