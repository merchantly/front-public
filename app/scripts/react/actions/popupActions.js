import { POPUP_OPEN, POPUP_CLOSE } from '../constants/actionTypes';
import { some } from 'lodash';

export function openPopup(style, props) {
  return {
    style,
    props,
    type: POPUP_OPEN,
  };
}

export function closePopup(style) {
  return {
    style,
    type: POPUP_CLOSE,
  };
}

export function openDesignSettingsPopup() {
  return openPopup('DesignSettings');
}

export function closeDesignSettingsPopup() {
  return closePopup('DesignSettings');
}

export function isDesignOpened(popups) {
  return some(popups, (popup) => (    
    popup.style === 'DesignSettings'
  ));
}